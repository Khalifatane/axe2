import React, { useEffect, useRef, useState } from "react";

// ---------- helpers ----------
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ---------- Dot Grid (interactive background) ----------
type Dot = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Shock = { x: number; y: number; time: number };

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  resistance?: number;
  returnDuration?: number;
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 5,
  gap = 15,
  baseColor = "#E5E7EB",
  activeColor = "#4A90E2",
  proximity = 120,
  shockRadius = 220,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const shocksRef = useRef<Shock[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const baseRgb = hexToRgb(baseColor);
  const activeRgb = hexToRgb(activeColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const spacing = dotSize + gap;
    const returnForce = 1 / (returnDuration * 60);

    const buildDots = (W: number, H: number) => {
      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;
      const dots: Dot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          dots.push({ baseX: bx, baseY: by, x: bx, y: by, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
      sizeRef.current = { w: W, h: H };
    };

    const resizeCanvas = (W: number, H: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots(W, H);
    };

    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      resizeCanvas(rect.width || window.innerWidth, rect.height || window.innerHeight);
    }

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        resizeCanvas(width, height);
      }
    });
    if (parent) ro.observe(parent);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      shocksRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: performance.now(),
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    const animate = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);

      const now = performance.now();
      // keep shocks for 1.6s
      shocksRef.current = shocksRef.current.filter((s) => now - s.time < 1600);

      const pointer = pointerRef.current;
      const shocks = shocksRef.current;

      for (let i = 0; i < dotsRef.current.length; i++) {
        const d = dotsRef.current[i];
        const dx = d.baseX - d.x;
        const dy = d.baseY - d.y;
        // resistance factor from original: 1 - min(0.9, 750 / max(750, resistance+1))
        const resist = 1 - Math.min(0.9, 750 / Math.max(750, resistance + 1));
        d.vx += dx * returnForce;
        d.vy += dy * returnForce;

        let proximityInfluence = 0;

        if (pointer.active) {
          const px = pointer.x - d.x;
          const py = pointer.y - d.y;
          const dist = Math.hypot(px, py);
          if (dist < proximity && dist > 0.001) {
            proximityInfluence = 1 - dist / proximity;
            const force = proximityInfluence * 0.55;
            d.vx -= (px / dist) * force * 1.6;
            d.vy -= (py / dist) * force * 1.6;
          }
        }

        let shockInfluence = 0;
        for (let j = 0; j < shocks.length; j++) {
          const s = shocks[j];
          const waveRadius = (now - s.time) / 1000 * 700;
          const bx = d.baseX - s.x;
          const by = d.baseY - s.y;
          const distToShockOrigin = Math.hypot(bx, by);
          if (distToShockOrigin > shockRadius + 80) continue;
          const delta = Math.abs(distToShockOrigin - waveRadius);
          if (delta < 80) {
            const k = 1 - delta / 80;
            const force = k * shockStrength;
            const ang = Math.atan2(by, bx);
            d.vx += Math.cos(ang) * force * 0.45;
            d.vy += Math.sin(ang) * force * 0.45;
            shockInfluence = Math.max(shockInfluence, k);
          }
        }

        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.88;
        d.vy *= 0.88;
        d.vx *= resist ? 1 : 1; // keep structure, resist already applied via returnForce scaling? original multiplied by Gm separately
        // Actually original did: Gm = 1 - min(0.9, 750 / max(750, i+1)); vx += yr*y ; but y already returnForce
        // We keep simple damping above

        const influence = Math.max(proximityInfluence, shockInfluence);
        const r = Math.round(lerp(baseRgb.r, activeRgb.r, influence));
        const g = Math.round(lerp(baseRgb.g, activeRgb.g, influence));
        const b = Math.round(lerp(baseRgb.b, activeRgb.b, influence));
        const size = dotSize + influence * 2.6;

        ctx.beginPath();
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.arc(d.x, d.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ background: "#FFFFFF" }}
    />
  );
};

// ---------- Districts data ----------
type District = { d: string; name: string };

const DISTRICTS: District[] = [
  { d: "M 1040 19 L 874 77 L 848 212 L 836 358 L 822 403 L 932 355 L 966 321 Z", name: "District 1" },
  { d: "M 775 34 L 740 42 L 640 118 L 578 129 L 573 161 L 602 164 L 785 107 L 788 80 Z", name: "District 2" },
  { d: "M 787 114 L 604 170 L 608 187 L 626 186 L 639 223 L 621 240 L 582 241 L 589 273 L 566 270 L 557 168 L 535 167 L 565 474 L 648 467 L 658 484 L 667 388 L 830 351 L 834 278 L 774 275 L 803 198 Z", name: "District 3" },
  { d: "M 84 279 L 78 395 L 103 398 L 123 375 L 116 281 Z", name: "District 4" },
  { d: "M 828 359 L 672 394 L 664 492 L 798 460 Z", name: "District 5" },
  { d: "M 78 401 L 75 479 L 96 479 L 102 404 Z", name: "District 6" },
  { d: "M 554 407 L 507 413 L 499 419 L 492 419 L 489 407 L 479 404 L 452 436 L 426 484 L 432 484 L 461 506 L 464 496 L 501 473 L 507 454 L 528 447 L 547 423 L 552 424 L 550 454 L 558 465 Z", name: "District 7" },
  { d: "M 122 419 L 118 484 L 151 485 L 155 422 Z", name: "District 8" },
  { d: "M 267 470 L 282 478 L 313 483 L 324 492 L 327 500 L 368 489 L 337 452 L 308 426 L 296 428 Z", name: "District 9" },
  { d: "M 796 467 L 663 499 L 653 606 L 721 604 L 752 588 Z", name: "District 10" },
  { d: "M 284 485 L 267 480 L 261 475 L 217 483 L 213 486 L 189 528 L 241 548 Z", name: "District 11" },
  { d: "M 74 485 L 72 532 L 93 532 L 94 505 L 95 504 L 95 490 L 96 489 L 96 486 L 92 486 L 91 485 Z", name: "District 12" },
  { d: "M 290 492 L 297 519 L 300 543 L 391 534 L 393 531 L 390 511 L 384 502 L 375 495 L 323 508 L 319 498 L 311 490 Z", name: "District 13" },
  { d: "M 118 490 L 114 539 L 147 540 L 150 492 L 146 491 L 119 491 Z", name: "District 14" },
  { d: "M 431 494 L 420 506 L 413 505 L 407 516 L 404 519 L 399 520 L 399 523 L 405 525 L 408 540 L 410 543 L 443 550 L 444 539 L 438 531 L 438 525 L 443 517 L 448 517 L 452 526 L 459 526 L 459 514 L 433 494 Z", name: "District 15" },
  { d: "M 284 498 L 248 551 L 270 557 L 293 544 L 291 524 Z", name: "District 16" },
  { d: "M 187 535 L 187 577 L 174 593 L 216 614 L 263 631 L 279 596 L 267 564 L 239 556 Z", name: "District 17" },
  { d: "M 72 538 L 72 555 L 71 556 L 71 565 L 90 565 L 90 563 L 91 562 L 91 549 L 92 548 L 92 538 Z", name: "District 18" },
  { d: "M 371 542 L 299 549 L 275 562 L 286 592 L 286 598 L 280 612 L 341 609 L 348 550 Z", name: "District 19" },
  { d: "M 114 545 L 107 643 L 140 645 L 146 546 Z", name: "District 20" },
  { d: "M 90 571 L 71 572 L 59 807 L 80 802 L 89 723 L 86 640 Z", name: "District 21" },
  { d: "M 172 600 L 173 601 L 177 635 L 187 649 L 187 653 L 183 658 L 184 660 L 186 660 L 203 649 L 202 633 L 203 627 L 207 618 Z", name: "District 22" },
  { d: "M 340 615 L 277 618 L 271 633 L 340 632 Z", name: "District 23" },
  { d: "M 259 638 L 222 623 L 213 621 L 208 637 L 210 653 L 191 665 L 204 678 L 224 669 L 236 661 Z", name: "District 24" },
  { d: "M 270 639 L 290 693 L 290 702 L 307 756 L 323 754 L 325 656 L 335 639 Z", name: "District 25" },
  { d: "M 264 644 L 248 661 L 230 674 L 212 682 L 237 698 L 252 711 L 283 695 Z", name: "District 26" },
  { d: "M 182 667 L 186 683 L 196 683 L 201 689 L 194 876 L 204 901 L 196 916 L 194 940 L 208 950 L 222 950 L 212 887 L 210 776 L 214 758 L 226 747 L 217 735 L 217 722 L 228 702 Z", name: "District 27" },
  { d: "M 258 717 L 281 740 L 296 758 L 300 757 L 295 742 L 295 739 L 288 720 L 288 717 L 283 704 Z", name: "District 28" },
  { d: "M 234 707 L 223 726 L 232 742 L 232 752 L 221 761 L 217 771 L 218 843 L 233 826 L 238 827 L 247 854 L 260 832 L 305 843 L 292 765 L 270 739 Z", name: "District 29" },
  { d: "M 323 760 L 299 765 L 310 823 L 314 875 L 311 912 L 319 914 L 336 902 L 338 893 L 339 837 Z", name: "District 30" },
  { d: "M 264 839 L 250 864 L 254 893 L 308 882 L 305 850 Z", name: "District 31" },
  { d: "M 307 889 L 253 900 L 240 927 L 229 970 L 239 985 L 256 984 L 270 962 L 280 952 L 294 943 L 291 921 L 298 911 L 304 911 Z", name: "District 32" },
];

// ---------- Main Component ----------
interface SaintLouisMapProps {
  className?: string;
  onSelectDistrict?: (district: District | null) => void;
}

export const SaintLouisMap: React.FC<SaintLouisMapProps> = ({ className, onSelectDistrict }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const selectDistrict = (index: number) => {
    const nextSelected = selected === index ? null : index;
    setSelected(nextSelected);
    onSelectDistrict?.(nextSelected === null ? null : DISTRICTS[nextSelected]);
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#FFFFFF] overflow-hidden ${className ?? ""}`}>
      {/* Dot background layer */}
      <div className="absolute inset-0 z-0" style={{ background: "#FFFFFF" }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#E5E7EB"
          activeColor="#4A90E2"
          proximity={120}
          shockRadius={220}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Map layer */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative flex h-full w-full items-center justify-center border-0 bg-transparent pointer-events-auto"
          style={{ background: "transparent" }}
        >
          <svg
            id="mainSvg"
            viewBox="0 0 1046 1014"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{
              display: "block",
              background: "transparent",
              width: "min(760px, 92vw)",
              height: "auto",
              maxHeight: "calc(100% - 2rem)",
            }}
            className="overflow-visible"
          >
            {DISTRICTS.map((district, idx) => (
              <path
                key={idx}
                d={district.d}
                data-id={idx}
                data-name={district.name}
                className={`district-outline ${selected === idx ? "active" : ""}`}
                onClick={() => selectDistrict(idx)}
              >
                <title>{district.name}</title>
              </path>
            ))}
          </svg>
        </div>
      </div>

      <style>{`
        .district-outline {
          fill: transparent;
          stroke: #111;
          stroke-width: 1.8;
          stroke-linejoin: round;
          stroke-linecap: round;
          cursor: pointer;
          transition: stroke 0.15s ease, stroke-width 0.15s ease;
          vector-effect: non-scaling-stroke;
        }
        .district-outline:hover {
          stroke: #4A90E2;
          stroke-width: 2.8;
        }
        .district-outline.active {
          stroke: #ff3b30;
          stroke-width: 3;
        }
        #mainSvg {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default SaintLouisMap;
