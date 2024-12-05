import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { metricsService } from "@/services/metricsService";

const QualityControl = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['productionMetrics'],
    queryFn: metricsService.getProductionMetrics,
    refetchInterval: 30000,
  });

  console.log("Quality metrics data:", metrics);

  const getQualityStatus = (defectRate: number) => {
    if (defectRate <= 1) return { color: "text-green-500", label: "Excellent" };
    if (defectRate <= 3) return { color: "text-yellow-500", label: "Warning" };
    return { color: "text-red-500", label: "Critical" };
  };

  if (isLoading) {
    return <div>Loading quality data...</div>;
  }

  const defectRate = metrics?.[0] ? 
    (metrics[0].defects / metrics[0].production_count) * 100 : 0;

  const status = getQualityStatus(defectRate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CheckCircle className={`h-4 w-4 ${status.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(100 - defectRate).toFixed(1)}%
            </div>
            <Badge variant="outline" className="mt-2">
              {status.label}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {defectRate.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {metrics?.[0]?.defects || 0} defects detected
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics?.[0]?.waste || 0}%
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Target: &lt;3%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Metrics Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleString()}
                />
                <Bar 
                  dataKey="defects" 
                  fill="#ef4444" 
                  name="Defects" 
                />
                <Bar 
                  dataKey="waste" 
                  fill="#f59e0b" 
                  name="Waste %" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityControl;