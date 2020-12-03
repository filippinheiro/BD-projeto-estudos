/* eslint-disable import/prefer-default-export */
import { PoolClient, Pool, QueryResult } from 'pg';

const pool = new Pool();

interface QueryParams {
  name?: string;
  text: string;
  values?: Array<any>;
}

export async function query({
  text,
  values = [],
  name = undefined,
}: QueryParams): Promise<QueryResult> {
  try {
    const res = await pool.query({
      text,
      values,
      name,
    });

    return res;
  } finally {
    pool.end();
  }
}

export async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}
