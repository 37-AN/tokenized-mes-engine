import { sql } from './connection';

export const initSampleData = async () => {
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
};