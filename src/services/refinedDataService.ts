import { supabase } from "@/integrations/supabase/client";

export interface RefinedData {
  device_id: string;
  data_type: string;
  value: number;
  quality_score?: number;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export interface ProcessedMetric {
  device_id: string;
  metric_type: string;
  value: number;
  unit?: string;
  timestamp?: string;
  metadata?: Record<string, any>;
}

export const refinedDataService = {
  async processRefinedData(data: RefinedData[]) {
    try {
      const { data: response, error } = await supabase.functions.invoke('process-refined-data', {
        body: { refinedData: data }
      });

      if (error) {
        console.error('Error processing refined data:', error);
        throw error;
      }

      console.log('Refined data processed successfully:', response);
      return response;
    } catch (error) {
      console.error('Error in processRefinedData:', error);
      throw error;
    }
  },

  async getRefinedData(deviceId?: string) {
    try {
      let query = supabase
        .from('refined_industrial_data')
        .select('*')
        .order('timestamp', { ascending: false });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query;

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

  async getMetrics(deviceId?: string) {
    try {
      let query = supabase
        .from('mes_metrics')
        .select('*')
        .order('timestamp', { ascending: false });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching metrics:', error);
        throw error;
      }

      console.log('Retrieved metrics:', data);
      return data;
    } catch (error) {
      console.error('Error in getMetrics:', error);
      throw error;
    }
  },

  async getInsights(deviceId?: string) {
    try {
      let query = supabase
        .from('ai_insights')
        .select('*')
        .order('created_at', { ascending: false });

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching insights:', error);
        throw error;
      }

      console.log('Retrieved insights:', data);
      return data;
    } catch (error) {
      console.error('Error in getInsights:', error);
      throw error;
    }
  }
};