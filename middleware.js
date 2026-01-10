import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse(
    'This service is currently disabled.',
    { status: 403 }
  );
}
