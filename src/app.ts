import express from 'express';
import type { Request, Response } from 'express';
import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';

import encryptionRouter from './routes/encryption.routes.js';
import signRouter from './routes/sign.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Dotenv configuration
dotenv.config();
const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST',
    // allowedHeaders: "X-Requested-With,Content-Type,Authorization",
  }),
);

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (request: Request, response: Response) => {
  response.status(200).send('Hello World');
});

app.use('/', encryptionRouter, signRouter);

app.use(errorHandler);

export default app;
