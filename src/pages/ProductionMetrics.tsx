import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from "@/components/Navigation";

const ProductionMetrics = () => {
  const data = [
    { name: 'Jan', production: 4000 },
    { name: 'Feb', production: 3000 },
    { name: 'Mar', production: 2000 },
    { name: 'Apr', production: 2780 },
    { name: 'May', production: 1890 },
    { name: 'Jun', production: 2390 },
  ];

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Production Metrics</h1>
        <p className="text-lg text-muted-foreground">Performance analytics and production data</p>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Monthly Production Output</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="production" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductionMetrics;