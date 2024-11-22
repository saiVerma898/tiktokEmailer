// src/lib/auth/tiktok-service.ts
import { TikTokTokenResponse, TikTokUserInfo } from "@/types";

export class TikTokService {
  private static readonly TOKEN_URL = 'https://open.tiktok.com/v2/oauth/token/';
  private static readonly USER_INFO_URL = 'https://open.tiktok.com/v2/user/info/';

  static async exchangeCodeForToken(code: string): Promise<TikTokTokenResponse> {
    const params = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
    });

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to exchange code for token');
    }

    return response.json();
  }

  static async getUserInfo(accessToken: string, openId: string): Promise<TikTokUserInfo> {
    const response = await fetch(`${this.USER_INFO_URL}?access_token=${accessToken}&open_id=${openId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to fetch user info');
    }

    return response.json();
  }

  static async refreshToken(refreshToken: string): Promise<TikTokTokenResponse> {
    const params = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const response = await fetch(this.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to refresh token');
    }

    return response.json();
  }
}