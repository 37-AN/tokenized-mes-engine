import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Box, TrendingUp, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { metricsService } from "@/services/metricsService";

const ProductionMonitor = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['productionMetrics'],
    queryFn: metricsService.getProductionMetrics,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  console.log("Production metrics data:", metrics);

  const getStatusColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-500";
    if (efficiency >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  if (isLoading) {
    return <div>Loading production data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Output</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.[0]?.production_count || 0}
              <span className="text-xs text-muted-foreground ml-2">units/hr</span>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm text-muted-foreground">
                +2.5% from target
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.[0]?.efficiency || 0}%
            </div>
            <Badge variant="outline" className="mt-2">
              Above Target
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.[0]?.defects || 0}
              <span className="text-xs text-muted-foreground ml-2">defects</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {((metrics?.[0]?.defects || 0) / (metrics?.[0]?.production_count || 1) * 100).toFixed(1)}% defect rate
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="production_count" 
                  stroke="#3b82f6" 
                  name="Production" 
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#10b981" 
                  name="Efficiency" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionMonitor;