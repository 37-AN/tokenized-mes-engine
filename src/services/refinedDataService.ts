import { supabase } from "@/integrations/supabase/client";
import { RefinedIndustrialData, MesMetric, AiInsight } from "@/integrations/supabase/types/refined-data";

// Sample data for development/testing
const sampleRefinedData: RefinedIndustrialData[] = Array.from({ length: 24 }, (_, i) => ({
  id: `sample-${i}`,
  device_id: 'dev-1',
  data_type: 'temperature',
  value: 75 + Math.sin(i / 3) * 15,
  quality_score: 85 + Math.cos(i / 4) * 10,
  timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
  metadata: { temperature: 78, vibration: 0.4 }
}));

const sampleMesMetrics: MesMetric[] = Array.from({ length: 24 }, (_, i) => ({
  id: `mes-${i}`,
  device_id: 'dev-1',
  metric_type: 'production_rate',
  value: 92 + Math.sin(i / 4) * 5,
  unit: '%',
  timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
  metadata: { line_speed: 100, batch_size: 1000 }
}));

const sampleAiInsights: AiInsight[] = [
  {
    id: 'insight-1',
    device_id: 'dev-1',
    insight_type: 'anomaly',
    message: 'Production efficiency has decreased by 5% in the last hour. Consider checking machine calibration.',
    confidence: 0.89,
    metadata: null,
    created_at: new Date().toISOString(),
    severity: 'warning'
  }
];

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
      // Return sample data if no real data exists
      return data?.length ? data : sampleRefinedData;
    } catch (error) {
      console.error('Error in getRefinedData:', error);
      return sampleRefinedData; // Fallback to sample data on error
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
      // Return sample data if no real data exists
      return data?.length ? data : sampleMesMetrics;
    } catch (error) {
      console.error('Error in getMesMetrics:', error);
      return sampleMesMetrics; // Fallback to sample data on error
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
      // Return sample data if no real data exists
      return data?.length ? data : sampleAiInsights;
    } catch (error) {
      console.error('Error in getAiInsights:', error);
      return sampleAiInsights; // Fallback to sample data on error
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