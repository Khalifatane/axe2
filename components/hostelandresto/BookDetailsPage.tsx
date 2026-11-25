'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bookDetailsIdState } from 'atoms';

const BookInfoSection = dynamic(
  () => import('components/v2/BookDetails/BookInfoSection'),
  { ssr: false },
);

const BookReviewsSection = dynamic(
  () => import('components/v2/BookDetails/BookReviewsSection'),
  { ssr: false },
);

export default function BookDetailsPage({ id }: { id: string }) {
  const currentBookId = useRecoilValue(bookDetailsIdState);
  const setBookId = useSetRecoilState(bookDetailsIdState);

  useEffect(() => {
    setBookId(id);
  }, [id, setBookId]);

  if (currentBookId !== id) {
    return <div className="py-16 text-center">Loading offer…</div>;
  }

  return (
    <main className="details-page">
      <BookInfoSection />
      <div className="details-reviews"><BookReviewsSection /></div>
    </main>
  );
}
