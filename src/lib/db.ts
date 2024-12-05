import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('VITE_DATABASE_URL is not defined in environment variables');
}

console.log('Attempting to connect to database...');

export const sql = neon(DATABASE_URL);

export const initDatabase = async () => {
  try {
    console.log('Testing database connection...');
    await sql`SELECT 1`; 
    console.log('Database connection successful');

    // Base tables
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

    // New tables for enhanced traceability and AI insights
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

    // Insert sample data if tables are empty
    const existingMetrics = await sql`SELECT COUNT(*) FROM production_metrics`;
    if (existingMetrics[0].count === '0') {
      console.log('Inserting sample production metrics...');
      await sql`
        INSERT INTO production_metrics (production_count, efficiency, defects, waste, ai_quality_score)
        VALUES 
          (150, 85.5, 12, 2.3, 0.89),
          (165, 88.2, 8, 1.8, 0.92),
          (142, 82.7, 15, 3.1, 0.85)
      `;
    }

    console.log('All database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    throw error;
  }
};