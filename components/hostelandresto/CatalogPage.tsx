'use client';

import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import { Suspense, useEffect } from 'react';
import { homePageBookSumState, homePageQueryState } from 'atoms';
import { FilteredChips } from 'components/v2/Chips/FilteredChips';
import { PAGE_SIZE } from 'const';

const BookList = dynamic(
  () => import('components/v2/Cards/ShoppingItemCardList'),
  { ssr: false },
);

function CatalogContent({
  category,
  title,
}: {
  category: '' | 'hostel' | 'Restaurant';
  title: string;
}) {
  const [query, setQuery] = useRecoilState(homePageQueryState);
  const [total] = useRecoilState(homePageBookSumState);

  useEffect(() => {
    setQuery({ page: 1, type: category, sort: '', size: PAGE_SIZE });
  }, [category, setQuery]);

  if (
    query.type !== category ||
    query.page !== 1 ||
    query.sort !== '' ||
    query.size !== PAGE_SIZE
  ) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="py-12 text-center">Loading offers…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="sr-only">{title}</h1>
      {query.sort && <FilteredChips data={query} onChange={setQuery} />}
      <Suspense fallback={<div className="py-12 text-center">Loading…</div>}>
        <BookList page={query.page || 1} pageSize={PAGE_SIZE} />
      </Suspense>
      {total === 0 && <p className="sr-only">Browse {title.toLowerCase()} offers.</p>}
    </main>
  );
}

export default function CatalogPage({
  category,
  title,
}: {
  category: '' | 'hostel' | 'Restaurant';
  title: string;
}) {
  return (
    <CatalogContent category={category} title={title} />
  );
}
