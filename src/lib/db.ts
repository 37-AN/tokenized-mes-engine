import { neon } from '@neondatabase/serverless';

// In Vite, environment variables are accessed through import.meta.env
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('VITE_DATABASE_URL is not defined in environment variables');
}

console.log('Attempting to connect to database...');

export const sql = neon(DATABASE_URL);

// Initialize database tables
export const initDatabase = async () => {
  try {
    console.log('Testing database connection...');
    await sql`SELECT 1`; // Test connection
    console.log('Database connection successful');

    console.log('Creating production_metrics table...');
    await sql`
      CREATE TABLE IF NOT EXISTS production_metrics (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        production_count INTEGER,
        efficiency FLOAT,
        defects INTEGER,
        waste FLOAT
      )
    `;

    // Insert sample production metrics if none exist
    const existingMetrics = await sql`SELECT COUNT(*) FROM production_metrics`;
    if (existingMetrics[0].count === '0') {
      console.log('Inserting sample production metrics...');
      await sql`
        INSERT INTO production_metrics (production_count, efficiency, defects, waste)
        VALUES 
          (150, 85.5, 12, 2.3),
          (165, 88.2, 8, 1.8),
          (142, 82.7, 15, 3.1)
      `;
    }

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
        status VARCHAR(50)
      )
    `;

    // Insert sample machine status if none exist
    const existingStatus = await sql`SELECT COUNT(*) FROM machine_status`;
    if (existingStatus[0].count === '0') {
      console.log('Inserting sample machine status...');
      await sql`
        INSERT INTO machine_status (machine_id, performance, temperature, vibration, power_usage, pressure, status)
        VALUES 
          ('MACH001', 92.5, 65.3, 0.15, 4.2, 2.1, 'OPERATIONAL'),
          ('MACH002', 88.7, 68.9, 0.18, 4.5, 2.3, 'OPERATIONAL'),
          ('MACH003', 78.4, 72.1, 0.25, 4.8, 2.4, 'MAINTENANCE')
      `;
    }

    console.log('Creating maintenance_records table...');
    await sql`
      CREATE TABLE IF NOT EXISTS maintenance_records (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(50),
        duration VARCHAR(20),
        technician VARCHAR(100),
        status VARCHAR(50)
      )
    `;

    // Insert sample maintenance records if none exist
    const existingRecords = await sql`SELECT COUNT(*) FROM maintenance_records`;
    if (existingRecords[0].count === '0') {
      console.log('Inserting sample maintenance records...');
      await sql`
        INSERT INTO maintenance_records (date, type, duration, technician, status)
        VALUES 
          (CURRENT_TIMESTAMP - INTERVAL '2 days', 'Preventive', '2 hours', 'John Smith', 'COMPLETED'),
          (CURRENT_TIMESTAMP - INTERVAL '5 days', 'Repair', '4 hours', 'Sarah Johnson', 'COMPLETED'),
          (CURRENT_TIMESTAMP - INTERVAL '1 day', 'Inspection', '1 hour', 'Mike Brown', 'PENDING')
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