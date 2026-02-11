import express from 'express';
import SignController from '../controllers/sign.controller.js';
import { HmacSignatureService } from '../helper/sign.js';
import type { Request, Response } from 'express';
import { ApiError } from '../errors/apiError.js';
const router = express.Router();

if (!process.env.SECRET) {
  throw new Error('SECRET must be set');
}

const signController = new SignController(
  new HmacSignatureService(process.env.SECRET),
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
 *       204:
 *         description: Verification result
 *       400:
 *         description: Invalid data
 */
router.post('/verify', (req: Request, res: Response) => {
  if (!req.body || typeof req.body !== 'object') {
    throw ApiError.badRequest('Body must be an object');
  }

  const { data, signature } = req.body as Record<string, unknown>;
  if (typeof signature !== 'string') {
    throw ApiError.badRequest(
      'The field: signature is required (string)',
    );
  }

  if (data === null || data === undefined || typeof data !== 'object') {
    throw ApiError.badRequest(
      'The field: data is required (object)',
    );
  }

  const result = signController.verify(data as Record<string, unknown>, signature);
  if (result) {
    res.status(204).send(); //No body on 204
  } else {
    throw ApiError.custom(400, 'Invalid signature');
  }
});

export default router;
