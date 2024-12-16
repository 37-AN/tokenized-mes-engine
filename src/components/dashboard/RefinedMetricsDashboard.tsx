import { useQuery } from "@tanstack/react-query";
import { refinedDataService } from "@/services/refinedDataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Loader2, Activity } from "lucide-react";

const RefinedMetricsDashboard = () => {
  const { data: refinedData, isLoading: isLoadingRefined } = useQuery({
    queryKey: ['refinedData'],
    queryFn: () => refinedDataService.getRefinedData(undefined, 50),
    refetchInterval: 30000
  });

  const { data: mesMetrics, isLoading: isLoadingMes } = useQuery({
    queryKey: ['mesMetrics'],
    queryFn: () => refinedDataService.getMesMetrics(undefined, 50),
    refetchInterval: 30000
  });

  const { data: aiInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ['aiInsights'],
    queryFn: () => refinedDataService.getAiInsights(),
    refetchInterval: 30000
  });

  if (isLoadingRefined || isLoadingMes || isLoadingInsights) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="p-6">
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading metrics...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const latestMesMetric = mesMetrics?.[0];
  const latestInsight = aiInsights?.[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Production Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestMesMetric?.value.toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(latestMesMetric?.timestamp || '').toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestMesMetric?.quality_score?.toFixed(1) ?? 'N/A'}
            </div>
            <p className="text-sm text-muted-foreground">Target: 95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-lg">Operational</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {latestInsight && (
        <Alert variant={latestInsight.severity === 'warning' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>AI Insight</AlertTitle>
          <AlertDescription>
            {latestInsight.message}
            {latestInsight.confidence && (
              <div className="text-sm text-muted-foreground mt-1">
                Confidence: {(latestInsight.confidence * 100).toFixed(1)}%
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={refinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '10px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  name="Value"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="quality_score"
                  stroke="#dc2626"
                  name="Quality Score"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefinedMetricsDashboard;