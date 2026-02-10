import { EncryptController } from '../src/controllers/encryption.controller.js';
import { Base64Encryption } from '../src/helper/crypto.js';

const decodeBase64Json = (value: string) =>
  JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));

describe('EncryptController', () => {
  const encryptionService = new Base64Encryption();
  const controller = new EncryptController(encryptionService);

  describe('encrypt', () => {
    it('encrypts all properties at depth 1 using Base64(JSON.stringify(value))', () => {
      const input = {
        name: 'John Doe',
        age: 30,
        contact: {
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      };

      const result = controller.encrypt(input);

      expect(Object.keys(result)).toEqual(['name', 'age', 'contact']);
      expect(typeof result.name).toBe('string');
      expect(typeof result.age).toBe('string');
      expect(typeof result.contact).toBe('string');

      expect(decodeBase64Json(result.name)).toBe('John Doe');
      expect(decodeBase64Json(result.age)).toBe(30);
      expect(decodeBase64Json(result.contact)).toEqual({
        email: 'john@example.com',
        phone: '123-456-7890',
      });
    });
  });

  describe('decrypt', () => {
    it('decrypts encrypted values back to their original types (round-trip from encrypt output)', () => {
      const original = {
        name: 'John Doe',
        age: 30,
        contact: {
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      };

      const encrypted = controller.encrypt(original);
      const decrypted = controller.decrypt(encrypted);

      expect(decrypted).toEqual(original);
    });

    it('leaves unencrypted properties unchanged', () => {
      const encryptedData= controller.encrypt({
        name: 'John Doe',
        age: 30,
        contact: {
          email: 'john@example.com',
          phone: '123-456-7890',
        },
      });

      const input = {
        ...encryptedData,
        birth_date: '1998-11-19',
      };

      const result = controller.decrypt(input);

      expect(result).toEqual({
        name: 'John Doe',
        age: 30,
        contact: {
          email: 'john@example.com',
          phone: '123-456-7890',
        },
        birth_date: '1998-11-19',
      });
    });
  });
});
