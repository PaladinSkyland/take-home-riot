import type { Request, Response } from 'express';
import type { SignatureService } from '../helper/sign.js';

export class SignController {
  private readonly signer: SignatureService;

  constructor(signer: SignatureService) {
    this.signer = signer;
  }

  sign(data: Record<string, unknown>) {
    const signature = this.signer.sign(data);
    return signature
  }

  verify(data: Record<string, unknown>, signature: string) {
    const isValid = this.signer.verify(data, signature);
    return isValid
  }
}

export default SignController;
