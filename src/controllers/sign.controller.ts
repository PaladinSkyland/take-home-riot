import type { Request, Response } from 'express';
import type { SignatureService } from '../helper/sign.js';

export class SignController {
  private readonly signer: SignatureService;

  constructor(signer: SignatureService) {
    this.signer = signer;
  }

  sign(req: Request, res: Response) {
    const data = req.body;
    const signature = this.signer.sign(data);
    res.json({ signature });
  }

  verify(req: Request, res: Response) {
    const { data, signature } = req.body;
    const isValid = this.signer.verify(data, signature);
    res.json({ valid: isValid });
  }
}

export default SignController;
