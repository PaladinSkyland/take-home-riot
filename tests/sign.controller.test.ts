import { SignController } from '../src/controllers/sign.controller.js';
import { HmacSignatureService } from '../src/helper/sign.js';

describe('HmacSignatureService', () => {
  const secret = 'test-secret';
  const signer = new HmacSignatureService(secret);

  it('Important Note: The signature must be computed based on the value of the JSON payload, not its string representation. This means the order of properties should not affect the signature.', () => {
    const a = {
      message: 'Hello World',
      timestamp: 1616161616,
    };
    const b = {
      timestamp: 1616161616,
      message: 'Hello World',
    };

    const sigA = signer.sign(a);
    const sigB = signer.sign(b);

    expect(sigA).toBe(sigB);
    expect(typeof sigA).toBe('string');
    //console.log(sigA);
    expect(sigA.length).toBeGreaterThan(0);
  });

  it('verifies a valid signature even when the data object property order changes', () => {
    const data1 = {
      message: 'Hello World',
      timestamp: 1616161616,
    };
    const signature = signer.sign(data1);

    const data2 = {
      timestamp: 1616161616,
      message: 'Hello World',
    };

    expect(signer.verify(data2, signature)).toBe(true);
  });

  it('returns false when the data in input is different from the data in signature', () => {
    const original = {
      message: 'Hello World',
      timestamp: 1616161616,
    };
    const signature = signer.sign(original);

    const tampered = {
      message: 'World',
      timestamp: 1616161616,
    };

    expect(signer.verify(tampered, signature)).toBe(false);
  });
});

describe('SignController', () => {
  const secret = 'test-secret';
  const signer = new HmacSignatureService(secret);
  const controller = new SignController(signer);

  describe('sign', () => {
    it('Returns JSON with a signature property', () => {
      const data = {
        message: 'Hello World',
        timestamp: 1616161616,
      };

      const signature = controller.sign(data);

      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
    });
  });

  describe('verify', () => {
    it('returns JSON with valid=true or (204 statut) for a correct signature', () => {
      const data = {
        message: 'Hello World',
        timestamp: 1616161616,
      };
      const signature = signer.sign(data);

      const isValid = controller.verify(
        {
          timestamp: 1616161616,
          message: 'Hello World',
        },
        signature,
      );

      expect(isValid).toBe(true);
    });

    it('returns JSON with valid=false (400) for a tampered payload', () => {
      const signature = signer.sign({
        message: 'Hello World',
        timestamp: 1616161616,
      });

      const isValid = controller.verify(
        {
          message: 'Goodbye World',
          timestamp: 1616161616,
        },
        signature,
      );

      expect(isValid).toBe(false);
    });
  });
});

