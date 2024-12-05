import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceMetricsProps {
  performanceData: any[];
}

export const PerformanceMetrics = ({ performanceData }: PerformanceMetricsProps) => {
  console.log('Rendering PerformanceMetrics with data:', performanceData);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={performanceData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'currentColor' }}
                height={50}
              />
              <YAxis 
                tick={{ fill: 'currentColor' }}
                width={60}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '10px'
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