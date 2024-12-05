import { sql } from '../connection';

export const initTraceabilityTables = async () => {
  console.log('Creating product_batches table...');
  await sql`
    CREATE TABLE IF NOT EXISTS product_batches (
      id SERIAL PRIMARY KEY,
      batch_number VARCHAR(100) UNIQUE,
      start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      end_time TIMESTAMP,
      status VARCHAR(50),
      batch_token_id VARCHAR(100) UNIQUE,
      quality_score FLOAT,
      ai_insights JSONB
    )
  `;

  console.log('Creating traceability_events table...');
  await sql`
    CREATE TABLE IF NOT EXISTS traceability_events (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      event_type VARCHAR(50),
      entity_type VARCHAR(50),
      entity_id VARCHAR(100),
      data JSONB,
      batch_id INTEGER REFERENCES product_batches(id),
      machine_id INTEGER REFERENCES machines(id)
    )
  `;

  console.log('Creating ai_insights table...');
  await sql`
    CREATE TABLE IF NOT EXISTS ai_insights (
      id SERIAL PRIMARY KEY,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      insight_type VARCHAR(50),
      target_entity_type VARCHAR(50),
      target_entity_id VARCHAR(100),
      confidence_score FLOAT,
      insight_data JSONB,
      action_taken BOOLEAN DEFAULT FALSE,
      action_result JSONB
    )
  `;
};