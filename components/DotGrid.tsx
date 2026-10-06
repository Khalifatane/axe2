'use client';

import { CSSProperties, useEffect, useRef } from 'react';

type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockStrength?: number;
  returnDuration?: number;
  className?: string;
  style?: CSSProperties;
};

type Dot = {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

type Shock = { x: number; y: number; time: number };

const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

export default function DotGrid({
  dotSize = 5,
  gap = 15,
  baseColor = '#2F293A',
  activeColor = '#5227FF',
  proximity = 120,
  shockStrength = 5,
  returnDuration = 1.5,
  className = '',
  style,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const shocksRef = useRef<Shock[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const base = hexToRgb(baseColor);
    const active = hexToRgb(activeColor);
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = dotSize + gap;
      dots = [];
      for (let y = dotSize / 2; y < height; y += spacing) {
        for (let x = dotSize / 2; x < width; x += spacing) {
          dots.push({ x, y, offsetX: 0, offsetY: 0, velocityX: 0, velocityY: 0 });
        }
      }
    };

    const pointFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMove = (event: PointerEvent) => { mouseRef.current = pointFromEvent(event); };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onDown = (event: PointerEvent) => {
      const point = pointFromEvent(event);
      shocksRef.current.push({ ...point, time: performance.now() });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      for (const dot of dots) {
        const dx = dot.x + dot.offsetX - mouse.x;
        const dy = dot.y + dot.offsetY - mouse.y;
        const distance = Math.hypot(dx, dy);
        const influence = distance < proximity ? 1 - distance / proximity : 0;

        if (influence > 0) {
          const angle = Math.atan2(dy, dx);
          dot.offsetX += Math.cos(angle) * influence * 1.8;
          dot.offsetY += Math.sin(angle) * influence * 1.8;
        }

        for (const shock of shocksRef.current) {
          const sx = dot.x - shock.x;
          const sy = dot.y - shock.y;
          const shockDistance = Math.hypot(sx, sy);
          const elapsed = (time - shock.time) / 1000;
          const wavePosition = elapsed * 700;
          const waveWidth = 80;
          if (Math.abs(shockDistance - wavePosition) < waveWidth && elapsed < 1.5) {
            const force = (1 - Math.abs(shockDistance - wavePosition) / waveWidth) * shockStrength;
            const angle = Math.atan2(sy, sx);
            dot.velocityX += Math.cos(angle) * force;
            dot.velocityY += Math.sin(angle) * force;
          }
        }

        dot.velocityX *= 0.88;
        dot.velocityY *= 0.88;
        dot.offsetX += dot.velocityX;
        dot.offsetY += dot.velocityY;
        const returnForce = 1 / (returnDuration * 60);
        dot.offsetX -= dot.offsetX * returnForce;
        dot.offsetY -= dot.offsetY * returnForce;

        const r = Math.round(base.r + (active.r - base.r) * influence);
        const g = Math.round(base.g + (active.g - base.g) * influence);
        const b = Math.round(base.b + (active.b - base.b) * influence);
        context.beginPath();
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.arc(dot.x + dot.offsetX, dot.y + dot.offsetY, (dotSize + influence * 2.5) / 2, 0, Math.PI * 2);
        context.fill();
      }

      shocksRef.current = shocksRef.current.filter((shock) => time - shock.time < 1600);
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, [activeColor, baseColor, dotSize, gap, proximity, returnDuration, shockStrength]);

  return <canvas ref={canvasRef} className={`absolute inset-0 block h-full w-full ${className}`} style={style} />;
}
