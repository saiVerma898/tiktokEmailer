import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { generateStateToken } from '../../lib/auth/utils';

export async function GET(request: NextRequest) {
  try {
    // Generate a CSRF state token
    const stateToken = generateStateToken();

    // Get the cookie store (for reading cookies, not for setting)
    const cookieStore = cookies();

    // Set the 'csrfState' cookie by constructing the response
    const response = new Response(null, {
      status: 302,  // HTTP status for redirect
      headers: {
        'Set-Cookie': `csrfState=${stateToken}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=600`,
        'Location': `https://www.tiktok.com/v2/auth/authorize/?${new URLSearchParams({
          client_key: process.env.TIKTOK_CLIENT_KEY!,
          response_type: 'code',
          scope: 'user.info.basic',
          redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
          state: stateToken,
        }).toString()}`,
      },
    });

    // Return the redirect response with the set cookie
    return response;
  } catch (error) {
    // Log the error for debugging
    console.error('OAuth redirect error:', error);
    
    // Return a generic error response
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}