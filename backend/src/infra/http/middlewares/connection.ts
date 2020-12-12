import { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg';

export default (pool: Pool) => (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  pool
    .connect()
    .then((client) => {
      request.client = client;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};
