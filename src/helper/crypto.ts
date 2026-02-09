// helpers/encryption/EncryptionService.ts
export interface EncryptionService {
  encrypt(value: unknown): string;
  decrypt(value: string): unknown;
  isEncrypted(value: unknown): boolean;
}

export class Base64Encryption implements EncryptionService {
  encrypt(value: unknown): string {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  }

  decrypt(value: string): unknown {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
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
