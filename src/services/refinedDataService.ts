import { supabase } from "@/integrations/supabase/client";
import { RefinedIndustrialData, MesMetric, AiInsight } from "@/integrations/supabase/types/refined-data";

export interface ProcessedMetric {
  device_id: string;
  metric_type: string;
  value: number;
  unit?: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export const refinedDataService = {
  async getRefinedData(deviceId?: string, limit: number = 100) {
    console.log('Fetching refined industrial data...', { deviceId, limit });
    try {
      let query = supabase
        .from('refined_industrial_data')
        .select('*')
        .order('timestamp', { ascending: true });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query.limit(limit);

      if (error) {
        console.error('Error fetching refined data:', error);
        throw error;
      }

      console.log('Retrieved refined data:', data);
      return data;
    } catch (error) {
      console.error('Error in getRefinedData:', error);
      throw error;
    }
  },

  async getMesMetrics(deviceId?: string, limit: number = 100) {
    console.log('Fetching MES metrics...', { deviceId, limit });
    try {
      let query = supabase
        .from('refined_mes_data')
        .select('*')
        .order('timestamp', { ascending: true });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query.limit(limit);

      if (error) {
        console.error('Error fetching MES metrics:', error);
        throw error;
      }

      console.log('Retrieved MES metrics:', data);
      return data;
    } catch (error) {
      console.error('Error in getMesMetrics:', error);
      throw error;
    }
  },

  async getAiInsights(deviceId?: string, limit: number = 10) {
    console.log('Fetching AI insights...', { deviceId, limit });
    try {
      let query = supabase
        .from('ai_insights')
        .select('*')
        .order('created_at', { ascending: false });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query.limit(limit);

      if (error) {
        console.error('Error fetching insights:', error);
        throw error;
      }

      console.log('Retrieved insights:', data);
      return data;
    } catch (error) {
      console.error('Error in getAiInsights:', error);
      throw error;
    }
  },

  async getLatestMetrics() {
    console.log('Fetching latest metrics from all sources...');
    try {
      const [refinedData, mesMetrics, aiInsights] = await Promise.all([
        this.getRefinedData(undefined, 1),
        this.getMesMetrics(undefined, 1),
        this.getAiInsights(undefined, 1)
      ]);

      return {
        refinedData: refinedData?.[0],
        mesMetrics: mesMetrics?.[0],
        aiInsights: aiInsights?.[0]
      };
    } catch (error) {
      console.error('Error fetching latest metrics:', error);
      throw error;
    }
  }
};