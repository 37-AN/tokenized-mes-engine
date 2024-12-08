import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RefinedIndustrialData } from "@/integrations/supabase/types/refined-data";

interface PerformanceMetricsProps {
  performanceData: any[];
}

const fetchRefinedData = async (): Promise<RefinedIndustrialData[]> => {
  console.log('Fetching refined industrial data...');
  const { data, error } = await supabase
    .from('refined_industrial_data')
    .select('*')
    .order('timestamp', { ascending: true })
    .limit(100);

  if (error) {
    console.error('Error fetching refined data:', error);
    throw error;
  }

  console.log('Fetched refined data:', data);
  return data;
};

export const PerformanceMetrics = ({ performanceData }: PerformanceMetricsProps) => {
  const { toast } = useToast();
  
  const { data: refinedData, error: refinedError } = useQuery({
    queryKey: ['refinedData'],
    queryFn: fetchRefinedData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (refinedError) {
    console.error('Error in refined data query:', refinedError);
    toast({
      title: "Error fetching performance data",
      description: "Please check your connection and try again",
      variant: "destructive",
    });
  }

  const chartData = refinedData?.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    performance: item.value,
    temperature: item.metadata?.temperature ?? 0,
    vibration: item.metadata?.vibration ?? 0
  })) || performanceData;

  console.log('Rendering PerformanceMetrics with processed data:', chartData);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
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