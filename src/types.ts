// src/types/tiktok.ts
export interface TikTokTokenResponse {
    access_token: string;
    refresh_token: string;
    open_id: string;
    expires_in: number;
    refresh_expires_in: number;
    scope: string;
  }

  
  
  export interface TikTokUserInfo {
    open_id: string;
    union_id: string;
    avatar_url: string;
    avatar_url_100: string;
    avatar_large_url: string;
    display_name: string;
    bio_description: string;
    profile_deep_link: string;
    is_verified: boolean;
    follower_count: number;
    following_count: number;
    likes_count: number;
    video_count: number;
  }
  
  export interface TikTokError {
    error: string;
    error_description: string;
  }

  export interface TikTokSession {
    access_token: string
    refresh_token: string
    open_id: string
    expires_at: number
  }