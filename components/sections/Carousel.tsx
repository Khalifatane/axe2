'use client';

import { useEffect } from 'react';
import DotGrid from '../DotGrid';
import SkewedCarousel from '../SkewedCarousel';

const featuredWork = [
  { id: 1, image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&q=80', title: 'Mountain Vista', subtitle: 'Alpine collection' },
  { id: 2, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', title: 'Urban Geometry', subtitle: 'Modern architecture' },
  { id: 3, image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', title: 'Minimal Interior', subtitle: 'Design study' },
  { id: 4, image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80', title: 'Concrete Form', subtitle: 'Brutalist series' },
  { id: 5, image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80', title: 'Light & Shadow', subtitle: 'Atmospheric' },
];

export default function Carousel() {
  useEffect(() => {
    const prelineWindow = window as Window & {
      HSStaticMethods?: { autoInit: () => void };
    };

    prelineWindow.HSStaticMethods?.autoInit();
  }, []);

  return (
    <>
      {/* Slider */}
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <div data-hs-carousel='{"loadingClasses": "opacity-0"}' className="relative">
          <div className="hs-carousel relative overflow-hidden w-full h-120 md:h-[calc(100vh-106px)] bg-gray-100 dark:bg-neutral-700 rounded-2xl">
            <div className="hs-carousel-body absolute top-0 bottom-0 inset-s-0 flex flex-nowrap transition-transform duration-700 opacity-0">
              {/* Item */}
              <div className="hs-carousel-slide">
                <div className="relative h-120 md:h-[calc(100vh-106px)] overflow-hidden bg-white">
                  <DotGrid baseColor="#D1D5DB" activeColor="#2563EB" className="z-0" />
                  <div className="pointer-events-none relative z-10 flex h-full flex-col">
                    <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10"><span className="block text-gray-700">Nike React</span><span className="block text-gray-950 text-xl md:text-3xl">Rewriting sport&apos;s playbook for billions of athletes</span><div className="mt-5"><a className="pointer-events-auto py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-plain text-gray-800 dark:text-neutral-950 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="#">Read Case Studies</a></div></div>
                  </div>
                </div>
              </div>
              {/* End Item */}
              {/* Item */}
              <div className="hs-carousel-slide">
                <div className="h-120 md:h-[calc(100vh-106px)]">
                  <SkewedCarousel items={featuredWork} initialIndex={2} />
                </div>
              </div>
              {/* End Item */}
              {/* Item */}
              <div className="hs-carousel-slide">
                <div className="h-120 md:h-[calc(100vh-106px)] flex flex-col bg-[url('https://images.unsplash.com/photo-1629666451094-8908989cae90?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
                  <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10"><span className="block text-white">Grumpy</span><span className="block text-white text-xl md:text-3xl">Bringing Art to everything</span><div className="mt-5"><a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-plain text-gray-800 dark:text-neutral-950 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="#">Read Case Studies</a></div></div>
                </div>
              </div>
              {/* End Item */}
            </div>
          </div>
          {/* Arrows */}
          <button type="button" aria-label="Previous hero slide" className="hs-carousel-prev hs-carousel-disabled:opacity-40 disabled:pointer-events-none absolute left-4 top-1/2 z-50 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 12-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <button type="button" aria-label="Next hero slide" className="hs-carousel-next hs-carousel-disabled:opacity-40 disabled:pointer-events-none absolute right-4 top-1/2 z-50 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          {/* End Arrows */}
        </div>
      </div>
      {/* End Slider */}
    </>
  );
}
