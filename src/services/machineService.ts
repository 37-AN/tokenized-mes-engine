import { sql } from '@/lib/db';
import { generateMachineToken } from '@/utils/tokenization';

export interface Machine {
  id: number;
  name: string;
  status: string;
  maintenance_status: string;
  token: string;
  created_at?: string;
}

export const machineService = {
  async addMachine(name: string): Promise<Machine> {
    console.log('Adding new machine:', name);
    const token = generateMachineToken(Date.now().toString(), Date.now());
    
    const result = await sql`
      INSERT INTO machines (name, status, maintenance_status, token)
      VALUES (${name}, 'Active', 'Up to date', ${token})
      RETURNING *
    `;
    
    if (!result || result.length === 0) {
      throw new Error('Failed to add machine');
    }

    console.log('Machine added successfully:', result[0]);
    return result[0] as Machine;
  },

  async getAllMachines(): Promise<Machine[]> {
    console.log('Fetching all machines');
    const machines = await sql`
      SELECT * FROM machines 
      ORDER BY created_at DESC
    `;
    console.log('Machines fetched:', machines);
    return machines as Machine[];
  }
};