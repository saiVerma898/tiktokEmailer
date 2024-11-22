// src/lib/auth/utils.ts
import { randomBytes } from 'crypto';

export function generateStateToken() {
  return randomBytes(32).toString('hex');
}