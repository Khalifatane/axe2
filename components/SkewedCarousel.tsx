'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface SkewedCarouselItem {
  id: string | number;
  image: string;
  title: string;
  subtitle?: string;
}

interface SkewedCarouselProps {
  items: SkewedCarouselItem[];
  initialIndex?: number;
  className?: string;
}

export default function SkewedCarousel({ items, initialIndex = 0, className = '' }: SkewedCarouselProps) {
  const [active, setActive] = useState(() => Math.max(0, Math.min(items.length - 1, initialIndex)));
  const carouselRef = useRef<HTMLDivElement>(null);
  const total = items.length;
  const cardWidth = 300;
  const cardHeight = 400;
  const gap = 16;

  const goTo = useCallback((index: number) => {
    setActive((index + total) % total);
  }, [total]);

  const previous = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    };

    element.addEventListener('keydown', onKeyDown);
    return () => element.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  if (!total) return null;

  return (
    <div
      ref={carouselRef}
      aria-label="Featured work carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      className={`relative h-full w-full select-none overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div className="flex h-full items-center overflow-hidden px-2 py-12 md:px-12">
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(50% - ${cardWidth / 2}px - ${active * (cardWidth + gap)}px))`,
            transition: 'transform 420ms cubic-bezier(.2,.75,.2,1)',
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, index) => {
            const offset = index - active;
            const isActive = offset === 0;
            const rotation = Math.max(-180, Math.min(180, -offset * 60));

            return (
              <div key={item.id} className="relative shrink-0" style={{ width: cardWidth, height: cardHeight, zIndex: total - Math.abs(offset) }}>
                <div
                  className="h-full w-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-zinc-900"
                  style={{
                    transform: isActive ? 'none' : `scale(.85) rotateY(${rotation}deg)`,
                    transition: 'transform 420ms cubic-bezier(.2,.75,.2,1)',
                  }}
                >
                  <button type="button" onClick={() => goTo(index)} aria-current={isActive} aria-label={`Show ${item.title}`} className="relative h-full w-full overflow-hidden text-left focus:outline-none">
                    <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" style={{ opacity: isActive ? 1 : 0, transition: 'opacity 420ms ease' }} />
                    <span className="pointer-events-none absolute inset-0 bg-black/40" style={{ opacity: isActive ? 0 : 1, transition: 'opacity 420ms ease' }} />
                    <span className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: isActive ? 'none' : 'translateY(10px)', opacity: isActive ? 1 : 0, filter: isActive ? 'blur(0)' : 'blur(2px)', transition: 'all 420ms cubic-bezier(.2,.75,.2,1)' }}>
                      <span className="block text-base font-semibold leading-tight text-white">{item.title}</span>
                      {item.subtitle && <span className="mt-1 block text-[13px] text-white/60">{item.subtitle}</span>}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {total > 1 && <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center">
        <div className="flex h-10 items-center gap-3 rounded-full border border-white/10 bg-[#101926]/95 px-1.5 shadow-[0_8px_24px_rgba(0,0,0,.35)] backdrop-blur">
          <button type="button" aria-label="Previous featured item" onClick={previous} className="grid size-7 place-items-center rounded-full bg-[#25364a] text-white transition hover:bg-[#344b65] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m10 12-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex items-center gap-2" aria-label="Featured item navigation">
            {items.map((item, index) => <button key={item.id} type="button" aria-label={`Show ${item.title}`} aria-current={index === active} onClick={() => goTo(index)} className="grid size-3 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
              <span className={`size-1.5 rounded-full transition-all ${index === active ? 'bg-white' : 'bg-[#415269] hover:bg-[#718097]'}`} />
            </button>)}
          </div>
          <button type="button" aria-label="Next featured item" onClick={next} className="grid size-7 place-items-center rounded-full bg-[#25364a] text-white transition hover:bg-[#344b65] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m6 4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>}
    </div>
  );
}
