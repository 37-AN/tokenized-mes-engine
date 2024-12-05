import { sql } from '../connection';

export const initBaseTables = async () => {
  console.log('Creating machines table...');
  await sql`
    CREATE TABLE IF NOT EXISTS machines (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      status VARCHAR(50) DEFAULT 'Inactive',
      maintenance_status VARCHAR(50) DEFAULT 'Up to date',
      token VARCHAR(255),
      asset_token_id VARCHAR(100) UNIQUE,
      ai_health_score FLOAT,
      last_ai_analysis TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  console.log('Creating production_metrics table...');
  await sql`
    CREATE TABLE IF NOT EXISTS production_metrics (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      production_count INTEGER,
      efficiency FLOAT,
      defects INTEGER,
      waste FLOAT,
      batch_token_id VARCHAR(100),
      ai_quality_score FLOAT
    )
  `;
};