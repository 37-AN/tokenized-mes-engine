import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const ProductionMetrics = () => {
  const monthlyData = [
    { name: 'Jan', production: 4000, efficiency: 92 },
    { name: 'Feb', production: 3000, efficiency: 88 },
    { name: 'Mar', production: 2000, efficiency: 95 },
    { name: 'Apr', production: 2780, efficiency: 91 },
    { name: 'May', production: 1890, efficiency: 89 },
    { name: 'Jun', production: 2390, efficiency: 94 },
  ];

  const qualityData = [
    { name: 'Perfect', value: 85 },
    { name: 'Minor Defects', value: 10 },
    { name: 'Major Defects', value: 5 },
  ];

  const efficiencyTrend = [
    { time: '6:00', value: 88 },
    { time: '8:00', value: 92 },
    { time: '10:00', value: 95 },
    { time: '12:00', value: 91 },
    { time: '14:00', value: 93 },
    { time: '16:00', value: 90 },
    { time: '18:00', value: 89 },
  ];

  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  console.log("Rendering ProductionMetrics with data:", { monthlyData, qualityData, efficiencyTrend });

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Production Metrics</h1>
        <p className="text-lg text-muted-foreground">Comprehensive production analytics and insights</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Analysis</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Monthly Production Output</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="production" fill="#3b82f6" name="Units Produced" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Daily Efficiency Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <LineChart data={efficiencyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Efficiency %" />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <PieChart>
                    <Pie
                      data={qualityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {qualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductionMetrics;