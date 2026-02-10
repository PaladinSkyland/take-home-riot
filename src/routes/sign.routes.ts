import express from 'express';
import SignController from '../controllers/sign.controller.js';
import { HmacSignatureService } from '../helper/sign.js';
import type { Request, Response } from 'express';
const router = express.Router();

const signController = new SignController(
  new HmacSignatureService(process.env.SECRET || ''),
);

/**
 * @swagger
 * /sign:
 *   post:
 *     summary: Sign a object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Signed object
 */
router.post('/sign', (req: Request, res: Response) => {
  const result = signController.sign(req.body);
  res.json({ signature: result });
});

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify a object and a signature
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *               signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification result
 */
router.post('/verify', (req: Request, res: Response) => {
  const result = signController.verify(req.body.data, req.body.signature);
  res.json({ valid: result });
});

export default router;
