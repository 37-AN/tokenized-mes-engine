import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface AnomalyDetectionProps {
  healthMetrics: {
    performance: number;
    temperature: number;
    vibration: number;
    power: number;
    pressure: number;
  };
}

export const AnomalyDetection = ({ healthMetrics }: AnomalyDetectionProps) => {
  const hasAnomaly = 
    healthMetrics.temperature > 80 || 
    healthMetrics.vibration > 0.8 || 
    healthMetrics.performance < 70;

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant={hasAnomaly ? "destructive" : "default"}>
          {hasAnomaly ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertTitle>{hasAnomaly ? "Anomalies Detected" : "System Normal"}</AlertTitle>
          <AlertDescription>
            {hasAnomaly ? (
              <ul className="list-disc pl-4 mt-2">
                {healthMetrics.temperature > 80 && <li>High temperature detected</li>}
                {healthMetrics.vibration > 0.8 && <li>Abnormal vibration levels</li>}
                {healthMetrics.performance < 70 && <li>Low performance warning</li>}
              </ul>
            ) : (
              "All systems are operating within normal parameters"
            )}
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Object.entries(healthMetrics).map(([key, value]) => (
            <div key={key} className="p-4 rounded-lg bg-muted">
              <div className="text-sm text-muted-foreground capitalize">{key}</div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};