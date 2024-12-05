import { sql } from '@/lib/db';

export interface ProductionMetric {
  timestamp: Date;
  production_count: number;
  efficiency: number;
  defects: number;
  waste: number;
}

export interface MachineStatus {
  timestamp: Date;
  machine_id: string;
  performance: number;
  temperature: number;
  vibration: number;
  power_usage: number;
  pressure: number;
  status: string;
}

export interface MaintenanceRecord {
  date: Date;
  type: string;
  duration: string;
  technician: string;
  status: string;
}

export const metricsService = {
  // Production Metrics
  async getProductionMetrics(): Promise<ProductionMetric[]> {
    const result = await sql<ProductionMetric[]>`
      SELECT * FROM production_metrics 
      ORDER BY timestamp DESC 
      LIMIT 100
    `;
    console.log('Retrieved production metrics:', result);
    return result;
  },

  async addProductionMetric(metric: Omit<ProductionMetric, 'timestamp'>): Promise<void> {
    await sql`
      INSERT INTO production_metrics (
        production_count, 
        efficiency, 
        defects, 
        waste
      ) VALUES (
        ${metric.production_count}, 
        ${metric.efficiency}, 
        ${metric.defects}, 
        ${metric.waste}
      )
    `;
    console.log('Added new production metric:', metric);
  },

  // Machine Status
  async getMachineStatus(): Promise<MachineStatus[]> {
    const result = await sql<MachineStatus[]>`
      SELECT * FROM machine_status 
      ORDER BY timestamp DESC 
      LIMIT 100
    `;
    console.log('Retrieved machine status:', result);
    return result;
  },

  async updateMachineStatus(status: Omit<MachineStatus, 'timestamp'>): Promise<void> {
    await sql`
      INSERT INTO machine_status (
        machine_id,
        performance,
        temperature,
        vibration,
        power_usage,
        pressure,
        status
      ) VALUES (
        ${status.machine_id},
        ${status.performance},
        ${status.temperature},
        ${status.vibration},
        ${status.power_usage},
        ${status.pressure},
        ${status.status}
      )
    `;
    console.log('Updated machine status:', status);
  },

  // Maintenance Records
  async getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
    const result = await sql<MaintenanceRecord[]>`
      SELECT * FROM maintenance_records 
      ORDER BY date DESC
    `;
    console.log('Retrieved maintenance records:', result);
    return result;
  },

  async addMaintenanceRecord(record: MaintenanceRecord): Promise<void> {
    await sql`
      INSERT INTO maintenance_records (
        date,
        type,
        duration,
        technician,
        status
      ) VALUES (
        ${record.date},
        ${record.type},
        ${record.duration},
        ${record.technician},
        ${record.status}
      )
    `;
    console.log('Added new maintenance record:', record);
  }
};