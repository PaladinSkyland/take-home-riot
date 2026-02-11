import type { ErrorRequestHandler } from 'express';
import { ApiError } from '../errors/apiError.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({
      message: 'Invalid JSON',
    });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    console.error('Unhandled error:', err.message);
    res.status(500).json({
      message: 'Internal server error',
    });
    return;
  }

  next();
};
