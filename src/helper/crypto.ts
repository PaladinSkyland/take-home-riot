import { ApiError } from '../errors/apiError.js';

export interface EncryptionService {
  encrypt(value: unknown): string;
  decrypt(value: string): unknown;
  isEncrypted(value: unknown): boolean;
}

export class Base64Encryption implements EncryptionService {
  encrypt(value: unknown): string {
    try {
      return Buffer.from(JSON.stringify(value)).toString('base64');
    } catch (error) {
      throw ApiError.badRequest('Invalid value to encrypt');
    }
  }

  decrypt(value: string): unknown {
    try {
      return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
    } catch (error) {
      throw ApiError.badRequest('Invalid base64 string');
    }
  }

  isEncrypted(value: unknown): boolean {
    if (typeof value !== 'string') return false;
    try {
      JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
      return true;
    } catch {
      return false;
    }
  }
}
