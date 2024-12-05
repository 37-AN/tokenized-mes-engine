import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('VITE_DATABASE_URL is not defined in environment variables');
}

console.log('Attempting to connect to database...');

export const sql = neon(DATABASE_URL);