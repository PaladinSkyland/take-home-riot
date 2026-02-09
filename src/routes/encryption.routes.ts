import express from 'express';
import type { Request, Response } from 'express';
import { EncryptController } from '../controllers/encryption.controller.js';
import { Base64Encryption } from '../helper/crypto.js';
const router = express.Router();

const encryptionService = new Base64Encryption();
const controller = new EncryptController(encryptionService);

/**
 * @swager
 *
 */
router.post('/encrypt', (req: Request, res: Response) => {
  const result = controller.encrypt(req.body);
  res.json(result);
});

router.post('/decrypt', (req: Request, res: Response) => {
  const result = controller.decrypt(req.body);
  res.json(result);
});

export default router;
