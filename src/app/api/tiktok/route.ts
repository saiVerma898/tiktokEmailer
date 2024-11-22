import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { generateStateToken } from '../../lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    const stateToken = generateStateToken();
    
    (await cookies()).set('csrfState', stateToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600,
    });

    const params = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      response_type: 'code',
      scope: 'user.info.basic',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
      state: stateToken,
    });

    return Response.redirect(
      `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`
    );
  } catch (error) {
    console.error('OAuth redirect error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
