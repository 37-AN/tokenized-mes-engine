import { neon } from '@neondatabase/serverless';

// In Vite, environment variables are accessed through import.meta.env
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  console.error('VITE_DATABASE_URL is not defined in environment variables');
}

export const sql = neon(DATABASE_URL!);

// Initialize database tables
export const initDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS production_metrics (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        production_count INTEGER,
        efficiency FLOAT,
        defects INTEGER,
        waste FLOAT
      );

      CREATE TABLE IF NOT EXISTS machine_status (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        machine_id VARCHAR(50),
        performance FLOAT,
        temperature FLOAT,
        vibration FLOAT,
        power_usage FLOAT,
        pressure FLOAT,
        status VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS maintenance_records (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP,
        type VARCHAR(50),
        duration VARCHAR(20),
        technician VARCHAR(100),
        status VARCHAR(50)
      );
    `;
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};