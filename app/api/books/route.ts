import { NextResponse } from 'next/server';
import { mockBooks } from '../../../lib/hostelandresto/mock-data';

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = params.get('type') || '';
  const sort = params.get('sort') || '';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const size = Math.max(1, Math.min(100, Number(params.get('size')) || 6));
  const lodgingTypes = ['Hôtel', 'Appartement', "Chambre d'hôte"];
  let content = mockBooks.filter((item) => !type || (type === 'hostel' ? lodgingTypes.includes(item.type) : item.type === type));

  if (sort === 'price' || sort === 'price_asc') content = [...content].sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === 'price_desc') content = [...content].sort((a, b) => Number(b.price) - Number(a.price));
  if (sort === 'rating_desc') content = [...content].sort((a, b) => b.averageRating - a.averageRating);
  if (sort === 'reviews_desc') content = [...content].sort((a, b) => b.ratings - a.ratings);
  if (sort === 'newest') content = [...content].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

  return NextResponse.json({ content: content.slice((page - 1) * size, page * size), total: content.length });
}
