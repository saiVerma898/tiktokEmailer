// app/api/tiktok/user/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('tiktok_user');
  
  if (!userCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json(JSON.parse(userCookie.value));
}