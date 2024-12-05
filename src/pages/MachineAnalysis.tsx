import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { aiService } from "@/utils/aiService";
import { useToast } from "@/hooks/use-toast";
import { Activity, AlertTriangle, Calendar, Gauge } from "lucide-react";

const MachineAnalysis = () => {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [maintenancePrediction, setMaintenancePrediction] = useState<{
    nextMaintenance: Date;
    confidence: number;
  } | null>(null);

  // Sample performance data - in a real app, this would come from your backend
  const performanceData = [
    { time: '00:00', performance: 85 },
    { time: '04:00', performance: 88 },
    { time: '08:00', performance: 92 },
    { time: '12:00', performance: 90 },
    { time: '16:00', performance: 87 },
    { time: '20:00', performance: 89 },
  ];

  const analyzeMachineStatus = async () => {
    console.log('Starting machine status analysis');
    setAnalyzing(true);
    try {
      const metrics = {
        performance: 89,
        uptime: "98%",
        errorRate: "0.02"
      };

      const result = await aiService.analyzeMachineStatus(metrics);
      console.log('AI analysis result:', result);

      toast({
        title: "Analysis Complete",
        description: "Machine status analysis has been completed successfully.",
      });
    } catch (error) {
      console.error('Error in machine analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the machine status.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const predictNextMaintenance = async () => {
    console.log('Predicting next maintenance');
    try {
      const prediction = await aiService.predictMaintenance({
        lastMaintenance: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        runningHours: 720,
        performanceMetrics: performanceData
      });
      
      console.log('Maintenance prediction:', prediction);
      setMaintenancePrediction(prediction);
      
      toast({
        title: "Prediction Complete",
        description: "Maintenance prediction has been calculated.",
      });
    } catch (error) {
      console.error('Error in maintenance prediction:', error);
      toast({
        title: "Prediction Failed",
        description: "Failed to predict next maintenance window.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Machine Analysis</h1>
          <p className="text-muted-foreground">AI-powered machine status analysis and maintenance prediction</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="performance" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Button 
              className="mt-4 w-full"
              onClick={analyzeMachineStatus}
              disabled={analyzing}
            >
              <Gauge className="mr-2 h-4 w-4" />
              {analyzing ? "Analyzing..." : "Analyze Status"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Maintenance Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenancePrediction ? (
                <>
                  <div className="p-4 rounded-lg bg-primary/5">
                    <p className="font-medium">Next Maintenance Due:</p>
                    <p className="text-2xl font-bold">
                      {maintenancePrediction.nextMaintenance.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Confidence: {(maintenancePrediction.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  {maintenancePrediction.confidence < 0.7 && (
                    <div className="flex items-center gap-2 text-yellow-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Low confidence prediction</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No maintenance prediction available
                </p>
              )}
              <Button 
                className="w-full" 
                variant="outline"
                onClick={predictNextMaintenance}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Predict Next Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MachineAnalysis;