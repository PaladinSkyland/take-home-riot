import express from 'express';
import SignController from '../controllers/sign.controller.js';
import { HmacSignatureService } from '../helper/sign.js';
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
router.post('/sign', signController.sign.bind(signController));

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
router.post('/verify', signController.verify.bind(signController));

export default router;
