import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import pool from '../database';
import connection from './middlewares/connection';

import AppError from '../../errors/AppError';
import routes from './routes/index.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(connection(pool));

app.use('/api', routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `internal server error ${err}`,
  });
});

process.on('SIGINT', async () => {
  await pool.end(() => {
    console.log('\nPool closed');
  });
  console.log('\nServer closed');
});
export default app;
