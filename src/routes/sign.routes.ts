import express from 'express';
import SignController from '../controllers/sign.controller.js';
import { HmacSignatureService } from '../helper/sign.js';
const router = express.Router();

// if (!process.env.SECRET) {
//   throw new Error('SECRET not provided in environment variables');
// }
const signController = new SignController(
  new HmacSignatureService(process.env.SECRET || ''),
);

/**
 * @swager
*
 */
router.post('/sign', signController.sign.bind(signController));

router.post('/verify', signController.verify.bind(signController));

export default router;
