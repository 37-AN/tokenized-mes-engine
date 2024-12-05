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
    try {
      const result = await sql`
        SELECT * FROM production_metrics 
        ORDER BY timestamp DESC 
        LIMIT 100
      `;
      console.log('Retrieved production metrics:', result);
      return result.map(row => ({
        timestamp: new Date(row.timestamp),
        production_count: Number(row.production_count),
        efficiency: Number(row.efficiency),
        defects: Number(row.defects),
        waste: Number(row.waste)
      }));
    } catch (error) {
      console.error('Error fetching production metrics:', error);
      return [];
    }
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
    try {
      const result = await sql`
        SELECT * FROM machine_status 
        ORDER BY timestamp DESC 
        LIMIT 100
      `;
      console.log('Retrieved machine status:', result);
      return result.map(row => ({
        timestamp: new Date(row.timestamp),
        machine_id: String(row.machine_id),
        performance: Number(row.performance),
        temperature: Number(row.temperature),
        vibration: Number(row.vibration),
        power_usage: Number(row.power_usage),
        pressure: Number(row.pressure),
        status: String(row.status)
      }));
    } catch (error) {
      console.error('Error fetching machine status:', error);
      return [];
    }
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
    try {
      const result = await sql`
        SELECT * FROM maintenance_records 
        ORDER BY date DESC
      `;
      console.log('Retrieved maintenance records:', result);
      return result.map(row => ({
        date: new Date(row.date),
        type: String(row.type),
        duration: String(row.duration),
        technician: String(row.technician),
        status: String(row.status)
      }));
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      return [];
    }
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