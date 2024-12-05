import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const ProductionMetrics = () => {
  const monthlyData = [
    { name: 'Jan', production: 4000, efficiency: 92, defects: 120, waste: 230 },
    { name: 'Feb', production: 3000, efficiency: 88, defects: 90, waste: 180 },
    { name: 'Mar', production: 2000, efficiency: 95, defects: 60, waste: 150 },
    { name: 'Apr', production: 2780, efficiency: 91, defects: 85, waste: 200 },
    { name: 'May', production: 1890, efficiency: 89, defects: 70, waste: 160 },
    { name: 'Jun', production: 2390, efficiency: 94, defects: 65, waste: 170 },
  ];

  const qualityData = [
    { name: 'Perfect', value: 85, color: '#22c55e' },
    { name: 'Minor Defects', value: 10, color: '#eab308' },
    { name: 'Major Defects', value: 5, color: '#ef4444' },
  ];

  const efficiencyTrend = [
    { time: '6:00', value: 88, oee: 92 },
    { time: '8:00', value: 92, oee: 94 },
    { time: '10:00', value: 95, oee: 96 },
    { time: '12:00', value: 91, oee: 93 },
    { time: '14:00', value: 93, oee: 95 },
    { time: '16:00', value: 90, oee: 91 },
    { time: '18:00', value: 89, oee: 90 },
  ];

  const resourceUtilization = [
    { time: '6:00', labor: 85, machine: 90, material: 88 },
    { time: '8:00', labor: 88, machine: 92, material: 90 },
    { time: '10:00', labor: 92, machine: 95, material: 93 },
    { time: '12:00', labor: 90, machine: 91, material: 89 },
    { time: '14:00', labor: 91, machine: 93, material: 92 },
    { time: '16:00', labor: 89, machine: 90, material: 88 },
    { time: '18:00', labor: 87, machine: 88, material: 86 },
  ];

  console.log("Rendering ProductionMetrics with enhanced data:", { monthlyData, qualityData, efficiencyTrend, resourceUtilization });

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Production Metrics</h1>
        <p className="text-lg text-muted-foreground">Comprehensive production analytics and insights</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16,060</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
              <Badge className="mt-2" variant="secondary">High Performance</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.5%</div>
              <p className="text-xs text-muted-foreground">+2.3% from target</p>
              <Badge className="mt-2" variant="secondary">Above Target</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Defect Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.8%</div>
              <p className="text-xs text-muted-foreground">-0.2% from last month</p>
              <Badge className="mt-2" variant="secondary">Within Limits</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+1.5% efficiency</p>
              <Badge className="mt-2" variant="secondary">Optimal</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Monthly Production Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="production" fill="#3b82f6" name="Units Produced" />
                    <Bar dataKey="defects" fill="#ef4444" name="Defects" />
                    <Bar dataKey="waste" fill="#eab308" name="Waste" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <LineChart data={efficiencyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Efficiency %" />
                    <Line type="monotone" dataKey="oee" stroke="#22c55e" name="OEE %" />
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
                      dataKey="value"
                      label
                    >
                      {qualityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer className="h-full" config={{}}>
                  <AreaChart data={resourceUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="labor" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Labor" />
                    <Area type="monotone" dataKey="machine" stackId="1" stroke="#22c55e" fill="#22c55e" name="Machine" />
                    <Area type="monotone" dataKey="material" stackId="1" stroke="#eab308" fill="#eab308" name="Material" />
                  </AreaChart>
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