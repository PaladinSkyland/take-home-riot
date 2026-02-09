import express from 'express';
import type { Request, Response } from 'express';
import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';

import encryptionRouter from './routes/encryption.routes.js';
import signRouter from './routes/sign.routes.js';

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST',
    // allowedHeaders: "X-Requested-With,Content-Type,Authorization",
  }),
);

app.use(json());
app.use(express.urlencoded({ extended: true }));

// app.use((error, request, response, next) => {
//     if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
//         console.error("Invalid JSON:", error.message);
//         response.status(400).json({ error: "invalid JSON" });
//     } else if (error instanceof Error) {
//         console.error("Unknown error:", error.message);
//         response.status(500).json({ error: "unknown error" });
//     } else {
//         next();
//     }
// });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (request: Request, response: Response) => {
  response.status(200).send('Hello World');
});

app.use('/', encryptionRouter, signRouter);
export default app;
