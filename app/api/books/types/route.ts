import { NextResponse } from 'next/server';
import { mockBookTypes } from '../../../../lib/hostelandresto/mock-data';

export function GET() {
  return NextResponse.json(mockBookTypes);
}
