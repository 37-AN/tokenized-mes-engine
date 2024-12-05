import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartArea, ChartBar, ChartLine, ChartPie } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import Navigation from "@/components/Navigation";

const AnalyticsView = () => {
  const lineData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 120 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 140 },
    { name: "May", value: 180 },
    { name: "Jun", value: 190 },
  ];

  const areaData = [
    { name: "Week 1", value: 400 },
    { name: "Week 2", value: 300 },
    { name: "Week 3", value: 500 },
    { name: "Week 4", value: 450 },
  ];

  const pieData = [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 200 },
    { name: "Product D", value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  console.log("Rendering AnalyticsView with data:", { lineData, areaData, pieData });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <h1 className="text-3xl font-bold">Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Production Trends</CardTitle>
            <ChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Resource Utilization</CardTitle>
            <ChartArea className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <AreaChart data={areaData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area type="monotone" dataKey="value" fill="#3b82f6" fillOpacity={0.3} stroke="#3b82f6" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">Product Distribution</CardTitle>
            <ChartPie className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[400px]" config={{}}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsView;