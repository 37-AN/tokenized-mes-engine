import { pipeline } from "@huggingface/transformers";

interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number;
  details: string;
}

interface MaintenancePrediction {
  nextMaintenanceDate: Date;
  urgency: 'low' | 'medium' | 'high';
  confidence: number;
  recommendations: string[];
}

export const aiService = {
  async detectAnomalies(metrics: any): Promise<AnomalyDetectionResult> {
    console.log('Analyzing machine metrics for anomalies:', metrics);
    try {
      const classifier = await pipeline(
        "text-classification",
        "onnx-community/distilbert-base-uncased-finetuned-sst-2-english",
        { device: "webgpu" }
      );
      
      // Convert metrics to text for analysis
      const metricsText = `Performance: ${metrics.performance}%, 
                          Temperature: ${metrics.temperature}°C, 
                          Vibration: ${metrics.vibration}, 
                          Power Usage: ${metrics.power_usage}kW`;
      
      const result = await classifier(metricsText);
      console.log('Anomaly detection result:', result);
      
      // Interpret classification results
      const isAnomaly = result[0].label === 'NEGATIVE';
      return {
        isAnomaly,
        confidence: result[0].score,
        details: isAnomaly ? 'Potential anomaly detected in machine behavior' : 'Machine operating within normal parameters'
      };
    } catch (error) {
      console.error('Error in anomaly detection:', error);
      throw new Error('Failed to perform anomaly detection');
    }
  },

  async predictMaintenance(machineData: any): Promise<MaintenancePrediction> {
    console.log('Analyzing maintenance needs:', machineData);
    try {
      const classifier = await pipeline(
        "text-classification",
        "onnx-community/distilbert-base-uncased-finetuned-sst-2-english",
        { device: "webgpu" }
      );

      const analysisText = `Machine status: ${machineData.status}, 
                           Last maintenance: ${machineData.lastMaintenance}, 
                           Runtime hours: ${machineData.runtime}, 
                           Performance trend: ${machineData.performanceTrend}`;
      
      const result = await classifier(analysisText);
      console.log('Maintenance prediction result:', result);

      // Calculate next maintenance date based on analysis
      const daysToAdd = result[0].label === 'NEGATIVE' ? 7 : 30;
      const nextMaintenanceDate = new Date();
      nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + daysToAdd);

      return {
        nextMaintenanceDate,
        urgency: result[0].label === 'NEGATIVE' ? 'high' : 'low',
        confidence: result[0].score,
        recommendations: [
          'Inspect machine components',
          'Check for wear and tear',
          'Verify calibration settings',
          'Review performance metrics'
        ]
      };
    } catch (error) {
      console.error('Error in maintenance prediction:', error);
      throw new Error('Failed to predict maintenance needs');
    }
  }
};