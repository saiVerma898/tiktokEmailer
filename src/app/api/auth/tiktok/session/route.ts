// src/app/api/auth/tiktok/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'TikTok route working!' });
}