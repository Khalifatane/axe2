'use client';

import { useEffect, useState, type ReactNode } from 'react';

const slides = [
  { id: 1, title: 'G4 Doorbell 2 High', src: '/images/photo-1616486701797-0f33f61038ec.png' },
  { id: 2, title: 'Outdoor Patio - Minimal', src: '/images/photo-1600585152220-90363fe7e115.png' },
  { id: 3, title: 'Entryway - Storage Bench', src: '/images/photo-1696846913141-634e2b1652e3.png' },
  { id: 4, title: 'Kitchen Island - Scandinavian', src: '/images/photo-1516455207990-7a41ce80f7ee.png' },
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {children}
    </svg>
  );
}

function Stat({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-y-1">
      <span className="text-[13px] text-gray-500 dark:text-neutral-400">{label}</span>
      <div className="flex items-center gap-x-1.5 text-gray-800 dark:text-neutral-200">
        {children}
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}

function LeaderboardCard() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3 dark:border-neutral-700">
        <h2 className="text-sm font-medium text-gray-800 dark:text-neutral-200">Top authors</h2>
        <button type="button" className="text-[13px] text-gray-500 underline-offset-2 hover:underline dark:text-neutral-400">
          Next: Niki Kray
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <img className="size-14 rounded-full object-cover" src="/photo-1492562080023-ab3db95bfbce.png" alt="Brian Williams" />
        <p className="text-lg font-medium text-gray-800 dark:text-neutral-200">Brian Williams</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Stat label="Published posts:" value="48"><Icon><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5" /></Icon></Stat>
        <Stat label="Avg. post views:" value="285"><Icon><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon></Stat>
        <Stat label="Total comments:" value="18"><Icon><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Icon></Stat>
        <Stat label="Posts referred:" value="62"><Icon><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9M15 3h6v6" /></Icon></Stat>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5 dark:border-neutral-700">
        <span className="text-[13px] text-gray-500 dark:text-neutral-400">Total views</span>
        <p className="mt-1 text-xl text-gray-800 dark:text-neutral-200">1,420</p>
        <div className="mt-4 h-16">
          <svg viewBox="0 0 220 80" className="h-full w-full" preserveAspectRatio="none" aria-label="Total views trend">
            <path d="M0 55 25 56 50 48 75 51 100 38 125 43 150 30 175 35 220 20V80H0Z" className="fill-gray-200 dark:fill-neutral-800" />
            <path d="M0 55 25 56 50 48 75 51 100 38 125 43 150 30 175 35 220 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700 dark:text-neutral-300" />
          </svg>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-5 dark:border-neutral-700">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full border-4 border-gray-700 text-sm font-medium text-gray-800 dark:border-neutral-300 dark:text-neutral-200">76%</div>
          <div><span className="block text-[13px] text-gray-500 dark:text-neutral-400">Content quality score</span><span className="text-sm text-green-600">+3.4%</span></div>
        </div>
        <ul className="mt-5 flex flex-col gap-4 text-sm">
          <li className="flex justify-between"><span>Title/subject length</span><strong>Good</strong></li>
          <li className="flex justify-between"><span>Body word count</span><strong>Good</strong></li>
          <li className="flex justify-between"><span>Tags/keywords</span><strong>Good</strong></li>
          <li className="flex justify-between"><span>Broken links</span><strong className="text-orange-500">Poor</strong></li>
          <li className="flex justify-between"><span>Spelling &amp; grammar</span><strong>Good</strong></li>
        </ul>
      </div>
    </div>
  );
}

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative h-[280px] w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-[360px] lg:h-[460px]">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${current * (100 / slides.length)}%)` }}
          aria-live="polite"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="h-full shrink-0 p-2" style={{ width: `${100 / slides.length}%` }}>
              <div className="h-full overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-2 backdrop-blur-xl">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <img src={slide.src} alt={slide.title} className="size-full object-cover object-center" />
                  <div className="absolute inset-x-0 bottom-0 m-3 flex items-center justify-between gap-2">
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-xl"><span className="size-1.5 animate-pulse rounded-full bg-red-500" />Live</span>
                    <span className="max-w-[65%] truncate rounded-full bg-white/70 px-3 py-1.5 text-xs text-black backdrop-blur-xl sm:text-sm">{slide.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous image" className="absolute left-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 hover:bg-white/90">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" onClick={() => goTo(current + 1)} aria-label="Next image" className="absolute right-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 hover:bg-white/90">
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m9 18 6-6 6" /></svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button key={slide.id} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={current === index ? 'true' : undefined} onClick={() => goTo(index)} className={`h-1.5 rounded-full transition-all duration-300 ${current === index ? 'w-6 bg-gray-800 dark:bg-white' : 'w-1.5 bg-gray-300 dark:bg-neutral-600'}`} />
        ))}
      </div>
    </div>
  );
}

export default function DashboardCard() {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-6 text-gray-800 dark:bg-neutral-950 dark:text-neutral-200 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside><LeaderboardCard /></aside>
          <section><ImageSlider /></section>
        </div>
      </div>
    </main>
  );
}
