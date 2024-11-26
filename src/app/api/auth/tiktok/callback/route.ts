import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { TikTokService } from '../../../../lib/auth/tiktok-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    // Await the cookies() promise and access the 'csrfState'
    const cookieStore = await cookies();
    const storedState = cookieStore.get('csrfState')?.value;

    if (error) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/error?error=${error}&description=${error_description}`
      );
    }

    if (!state || state !== storedState) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/error?error=invalid_state`
      );
    }

    if (!code) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/error?error=no_code`
      );
    }

    // Exchange code for token
    const tokenData = await TikTokService.exchangeCodeForToken(code);
    
    // Get user info
    const userInfo = await TikTokService.getUserInfo(
      tokenData.access_token,
      tokenData.open_id
    );

    // Set session cookie
    await cookieStore.set('tiktok_session', JSON.stringify({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      open_id: tokenData.open_id,
      expires_at: Date.now() + tokenData.expires_in * 1000,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
    });

    // Store user info in a separate cookie
    await cookieStore.set('tiktok_user', JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenData.expires_in,
    });

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/error?error=server_error`
    );
  } finally {
    // Clean up the state cookie
    const cookieStore = await cookies();
    await cookieStore.delete('csrfState');
  }
}