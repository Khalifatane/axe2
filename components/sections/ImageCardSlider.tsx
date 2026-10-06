'use client';

import { useState } from 'react';

const cards = [
  { id: 1, title: 'G4 Doorbell 2 High', src: '/images/photo-1616486701797-0f33f61038ec.png' },
  { id: 2, title: 'G4 Doorbell 2 High', src: '/images/photo-1600585152220-90363fe7e115.png' },
  { id: 3, title: 'G4 Doorbell 2 High', src: '/images/photo-1696846913141-634e2b1652e3.png' },
  { id: 4, title: 'G4 Doorbell 2 High', src: '/images/photo-1516455207990-7a41ce80f7ee.png' },
];

export default function ImageCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((current) => (current === 0 ? cards.length - 1 : current - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((current) => (current === cards.length - 1 ? 0 : current + 1));
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#c1b4a8]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/photo-1616486701797-0f33f61038ec.png')" }}
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex w-full items-center justify-center py-8">
        <div className="relative w-full overflow-hidden">
          <div className="mx-auto max-h-[676px] w-[calc(100%-10px)] max-w-[1467px] overflow-hidden md:w-[calc(100%-32px)]">
            <div
              className="flex h-[676px] transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="relative h-[676px] w-full shrink-0 overflow-hidden border border-white/20 bg-black/10 shadow-[0_18px_28px_rgba(0,0,0,0.18)]"
                >
                  <button type="button" className="block h-full w-full cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-white/70">
                    <img src={card.src} alt={card.title} className="block h-full w-full object-cover" />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-[#1b2d3b]/80 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Live
                      </span>

                      <span className="inline-flex min-w-0 max-w-[250px] truncate rounded-full bg-[#e9edf2]/80 px-3 py-1 text-xs font-medium text-[#2b3a45] shadow-sm backdrop-blur-sm">
                        {card.title}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous"
            onClick={previousSlide}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/80 text-gray-800 shadow-xl backdrop-blur-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/80 text-gray-800 shadow-xl backdrop-blur-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
