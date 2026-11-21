'use client';

import { useState } from 'react';
import SaintLouisMap from '../../Nouveau/Saint-Louis-Map';

type District = { name: string };

export default function NouveauPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  return (
    <main className="grid min-h-screen grid-cols-1 bg-[#f3f5f1] text-[#202820] lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="relative z-20 flex flex-col border-b border-[#d9ded6] px-7 py-7 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-9 lg:py-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center border border-[#56664e] text-xs font-semibold tracking-[0.08em] text-[#56664e]">
            SL
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#667261]">Field atlas</p>
            <p className="mt-0.5 text-sm text-[#303a30]">Senegal · West Africa</p>
          </div>
        </div>

        <div className="mt-10 lg:mt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#788371]">Urban district map</p>
          <h1 className="mt-3 font-serif text-5xl font-medium leading-none tracking-[-0.03em] text-[#273328]">Saint-Louis</h1>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#647061]">
            Explore the city one district at a time. Select an outlined area on the map to focus it.
          </p>
        </div>

        <div className="mt-9 border-y border-[#d9ded6] py-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#647061]">Mapped districts</span>
            <span className="font-serif text-3xl text-[#273328]">32</span>
          </div>
        </div>

        <section aria-live="polite" className="mt-8 min-h-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#788371]">Selection</p>
          <p className="mt-3 font-serif text-2xl text-[#273328]">
            {selectedDistrict?.name ?? 'No district selected'}
          </p>
          <p className="mt-2 text-sm leading-5 text-[#647061]">
            {selectedDistrict
              ? 'Selected on the map. Click it again to clear.'
              : 'Choose any district outline to see it highlighted.'}
          </p>
        </section>

        <div className="mt-10 flex items-center gap-2 text-xs text-[#647061] lg:mt-auto lg:pt-12">
          <span className="h-2 w-2 rounded-full bg-[#56664e]" aria-hidden="true" />
          Interactive map · 32 districts
        </div>
      </aside>

      <section aria-label="Interactive district map" className="relative min-h-[68vh] overflow-hidden lg:min-h-screen">
        <div className="absolute left-5 top-5 z-20 border border-[#e2e6df] bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#667261] backdrop-blur-sm">
          Saint-Louis region
        </div>
        <SaintLouisMap
          className="min-h-[68vh] lg:min-h-screen"
          onSelectDistrict={setSelectedDistrict}
        />
        <div className="pointer-events-none absolute bottom-5 right-5 z-20 border border-[#e2e6df] bg-white/90 px-3 py-2 text-xs text-[#667261] backdrop-blur-sm">
          Click a district to select
        </div>
      </section>
    </main>
  );
}