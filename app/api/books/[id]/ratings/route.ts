import { NextResponse } from 'next/server';
import { mockBooks, mockRatings } from '../../../../../lib/hostelandresto/mock-data';

function hasBook(id: string) {
  return mockBooks.some((item) => item.id === id);
}

export function GET(_: Request, { params }: { params: { id: string } }) {
  if (!hasBook(params.id)) return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
  const content = mockRatings.filter((rating) => rating.bookId === params.id);
  return NextResponse.json({ content, total: content.length });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  if (!hasBook(params.id)) return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
  const { score } = await request.json();
  if (!Number.isFinite(score) || score < 0.5 || score > 5) {
    return NextResponse.json({ message: 'Rating must be between 0.5 and 5.' }, { status: 400 });
  }

  const userId = '3';
  const rating = { bookId: params.id, userId, score, ratedAt: new Date().toISOString(), user: { id: userId, nickname: 'Guest Reader' } };
  const existing = mockRatings.findIndex((item) => item.bookId === params.id && item.userId === userId);
  if (existing >= 0) mockRatings[existing] = rating;
  else mockRatings.push(rating);
  return NextResponse.json({ message: 'success', data: rating });
}

export function DELETE(request: Request, { params }: { params: { id: string } }) {
  const userId = new URL(request.url).searchParams.get('userId') || '';
  const index = mockRatings.findIndex((item) => item.bookId === params.id && item.userId === userId);
  if (index < 0) return NextResponse.json({ message: 'Rating not found.' }, { status: 404 });
  mockRatings.splice(index, 1);
  return NextResponse.json({ message: 'success' });
}
