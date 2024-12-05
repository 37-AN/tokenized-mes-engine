import { pipeline } from "@huggingface/transformers";

export const aiService = {
  async analyzeMachineStatus(metrics: any) {
    console.log('Analyzing machine status with AI:', metrics);
    try {
      const classifier = await pipeline(
        "text-classification",
        "onnx-community/distilbert-base-uncased-finetuned-sst-2-english",
        { device: "webgpu" }
      );
      
      // Convert metrics to text for analysis
      const metricsText = `Machine performance: ${metrics.performance}, 
                          Uptime: ${metrics.uptime}, 
                          Error rate: ${metrics.errorRate}`;
      
      const result = await classifier(metricsText);
      console.log('AI analysis result:', result);
      return result;
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return null;
    }
  },

  async predictMaintenance(machineData: any) {
    console.log('Predicting maintenance with AI:', machineData);
    // Implement maintenance prediction logic
    return {
      nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      confidence: 0.85
    };
  }
};