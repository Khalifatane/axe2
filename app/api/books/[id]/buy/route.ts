import { NextResponse } from 'next/server';
import { mockBooks } from '../../../../../lib/hostelandresto/mock-data';

export function POST(request: Request, { params }: { params: { id: string } }) {
  const book = mockBooks.find((item) => item.id === params.id);
  const quantity = Number(new URL(request.url).searchParams.get('quality'));

  if (!book) return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
  if (!Number.isInteger(quantity) || quantity < 1) {
    return NextResponse.json({ message: 'Quantity must be positive.' }, { status: 400 });
  }
  if (book.stock < quantity) {
    return NextResponse.json({ message: 'Not enough stock.' }, { status: 400 });
  }

  book.stock -= quantity;
  return NextResponse.json({ message: `Purchase complete: ${quantity} × ${book.title}.` });
}
