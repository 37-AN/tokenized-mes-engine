import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceMetricsProps {
  performanceData: any[];
}

export const PerformanceMetrics = ({ performanceData }: PerformanceMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="performance" stroke="#2563eb" name="Performance %" />
              <Line type="monotone" dataKey="temperature" stroke="#dc2626" name="Temperature °F" />
              <Line type="monotone" dataKey="vibration" stroke="#eab308" name="Vibration" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};