import crypto from 'crypto';
import { ApiError } from '../errors/apiError.js';

export interface SignatureService {
  sign(data: unknown): string;
  verify(data: unknown, signature: string): boolean;
}

function sign_data(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sign_data);
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sign_data((value as any)[key]);
        return acc;
      }, {});
  }

  return value;
}

export class HmacSignatureService implements SignatureService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(data: unknown): string {
    try {
      const signedData = sign_data(data);
      const payload = JSON.stringify(signedData);

      return crypto
        .createHmac('sha256', this.secret)
        .update(payload)
        .digest('hex');
    } catch (error) {
      throw ApiError.badRequest('Invalid data to sign');
    }
  }

  verify(data: unknown, signature: string): boolean {
    if (!signature) {
      throw ApiError.badRequest(
        'The field: signature is required (string)',
      );
    }
    if (!data) {
      throw ApiError.badRequest(
        'The field: data is required (object)',
      );
    }
    try {
      const expected = this.sign(data);
      return crypto.timingSafeEqual(
        Buffer.from(expected),
        Buffer.from(signature),
      );
    } catch (error) {
      throw ApiError.badRequest('Invalid data to verify');
    }
  }
}
