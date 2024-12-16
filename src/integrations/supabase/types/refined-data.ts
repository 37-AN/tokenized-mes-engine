import { Json } from './database.types';

export interface RefinedDataMetadata {
  temperature?: number;
  vibration?: number;
  [key: string]: any;
}

export interface RefinedIndustrialData {
  id: string;
  device_id: string;
  data_type: string;
  value: number;
  quality_score: number | null;
  timestamp: string;
  metadata: RefinedDataMetadata | null;
}

export interface MesMetric {
  id: string;
  device_id: string;
  metric_type: string;
  value: number;
  unit: string | null;
  timestamp: string;
  metadata: Json | null;
  quality_score?: number | null; // Added this property
}

export interface AiInsight {
  id: string;
  device_id: string;
  insight_type: string;
  message: string;
  confidence: number | null;
  metadata: Json | null;
  created_at: string;
  severity: string | null;
}