import { sql } from '../connection';

export const initMonitoringTables = async () => {
  console.log('Creating machine_status table...');
  await sql`
    CREATE TABLE IF NOT EXISTS machine_status (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      machine_id VARCHAR(50),
      performance FLOAT,
      temperature FLOAT,
      vibration FLOAT,
      power_usage FLOAT,
      pressure FLOAT,
      status VARCHAR(50),
      anomaly_score FLOAT,
      prediction_data JSONB
    )
  `;

  console.log('Creating maintenance_records table...');
  await sql`
    CREATE TABLE IF NOT EXISTS maintenance_records (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      type VARCHAR(50),
      duration VARCHAR(20),
      technician VARCHAR(100),
      status VARCHAR(50),
      machine_id INTEGER REFERENCES machines(id),
      maintenance_token_id VARCHAR(100) UNIQUE,
      ai_recommendations JSONB
    )
  `;
};