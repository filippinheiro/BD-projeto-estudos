import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import AppError from 'errors/AppError';
import routes from './routes';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`server's up on ${PORT}`);
});
