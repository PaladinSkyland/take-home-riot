import crypto from 'crypto';

export interface SignatureService {
  sign(data: unknown): string;
  verify(data: unknown, signature: string): boolean;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = canonicalize((value as any)[key]);
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
    const canonicalData = canonicalize(data);
    const payload = JSON.stringify(canonicalData);

    return crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');
  }

  verify(data: unknown, signature: string): boolean {
    const expected = this.sign(data);
    return crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(signature),
    );
  }
}
