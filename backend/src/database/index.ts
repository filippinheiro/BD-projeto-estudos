/* eslint-disable import/prefer-default-export */
import { Pool } from 'pg';

const pool = new Pool();

pool.on('connect', () => {
  console.log('Client connected');
});

pool.on('acquire', () => {
  console.log('Client checked out');
});

pool.on('remove', () => {
  console.log('Connection removed');
});
export default pool;
