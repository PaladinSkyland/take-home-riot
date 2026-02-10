import type { EncryptionService } from '../helper/crypto.js';

export class EncryptController {
  private encryption: EncryptionService;

  constructor(encryption: EncryptionService) {
    this.encryption = encryption;
  }

  encrypt(payload: Record<string, unknown>) {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(payload)) {
      result[key] = this.encryption.encrypt(value);
    }

    return result;
  }

  decrypt(payload: Record<string, string>) {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(payload)) {
      if (this.encryption.isEncrypted(value)) {
        result[key] = this.encryption.decrypt(value);
        continue;
      } else {
        result[key] = value;
      }
    }

    return result;
  }
}
