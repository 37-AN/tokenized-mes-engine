import { sql } from './db/connection';
import { initBaseTables } from './db/schemas/baseTables';
import { initMonitoringTables } from './db/schemas/monitoringTables';
import { initTraceabilityTables } from './db/schemas/traceabilityTables';
import { initSampleData } from './db/sampleData';

export { sql };

export const initDatabase = async () => {
  try {
    console.log('Testing database connection...');
    await sql`SELECT 1`; 
    console.log('Database connection successful');

    // Initialize all tables
    await initBaseTables();
    await initMonitoringTables();
    await initTraceabilityTables();

    // Initialize sample data
    await initSampleData();

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