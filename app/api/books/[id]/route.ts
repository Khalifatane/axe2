import { NextResponse } from 'next/server';
import { mockBooks } from '../../../../lib/hostelandresto/mock-data';

function findBook(id: string) {
  return mockBooks.find((item) => item.id === id);
}

export function GET(_: Request, { params }: { params: { id: string } }) {
  const book = findBook(params.id);
  return book
    ? NextResponse.json(book)
    : NextResponse.json({ message: 'Book not found.' }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const book = findBook(params.id);
  if (!book) return NextResponse.json({ message: 'Book not found.' }, { status: 404 });

  const { stock } = await request.json();
  if (!Number.isInteger(stock) || stock < 0) {
    return NextResponse.json({ message: 'Stock must be a non-negative integer.' }, { status: 400 });
  }

  book.stock = stock;
  return NextResponse.json({ message: 'success', data: book });
}
