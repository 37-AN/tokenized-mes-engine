export interface RefinedIndustrialData {
  id: string;
  device_id: string;
  data_type: string;
  value: number;
  quality_score: number | null;
  timestamp: string;
  metadata: Record<string, any> | null;
}

export interface MesMetric {
  id: string;
  device_id: string;
  metric_type: string;
  value: number;
  unit: string | null;
  timestamp: string;
  metadata: Record<string, any> | null;
}

export interface AiInsight {
  id: string;
  device_id: string;
  insight_type: string;
  message: string;
  confidence: number | null;
  metadata: Record<string, any> | null;
  created_at: string;
  severity: string | null;
}