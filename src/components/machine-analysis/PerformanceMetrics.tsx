import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceMetricsProps {
  performanceData: any[];
}

export const PerformanceMetrics = ({ performanceData }: PerformanceMetricsProps) => {
  console.log('Rendering PerformanceMetrics with data:', performanceData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#2563eb" 
                name="Performance %" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#dc2626" 
                name="Temperature °F"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="vibration" 
                stroke="#eab308" 
                name="Vibration"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};