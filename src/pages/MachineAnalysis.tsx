import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Activity, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";

const MachineAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [maintenancePrediction, setMaintenancePrediction] = useState(null);

  const performanceData = [
    { time: '00:00', performance: 85 },
    { time: '04:00', performance: 88 },
    { time: '08:00', performance: 92 },
    { time: '12:00', performance: 90 },
    { time: '16:00', performance: 87 },
    { time: '20:00', performance: 89 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Machine Analysis</h1>
      </header>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="performance" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Activity className="h-5 w-5" />
                <span>System operating normally</span>
              </div>
              <Button className="w-full" disabled={analyzing}>
                {analyzing ? "Analyzing..." : "Analyze Status"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MachineAnalysis;