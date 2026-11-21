'use client';

import { useEffect } from 'react';
import SaintLouisMap from '../../Nouveau/Saint-Louis-Map';

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
                <div className="relative h-[560px] overflow-hidden md:h-[calc(100vh-106px)]">
                  <SaintLouisMap className="h-full min-h-[560px] md:min-h-0" />
                </div>
              </div>
              {/* End Item */}
            </div>
          </div>
        </div>
      </div>
      {/* End Slider */}
    </>
  );
}
