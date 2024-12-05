import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from "react";
import { Activity, AlertTriangle, Thermometer, Timer, Wrench, Battery } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MachineAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const performanceData = [
    { time: '00:00', performance: 85, temperature: 65, vibration: 0.5 },
    { time: '04:00', performance: 88, temperature: 68, vibration: 0.6 },
    { time: '08:00', performance: 92, temperature: 70, vibration: 0.4 },
    { time: '12:00', performance: 90, temperature: 72, vibration: 0.7 },
    { time: '16:00', performance: 87, temperature: 69, vibration: 0.5 },
    { time: '20:00', performance: 89, temperature: 67, vibration: 0.4 },
  ];

  const maintenanceHistory = [
    { date: '2024-02-01', type: 'Preventive', duration: '2h', technician: 'John Doe' },
    { date: '2024-01-15', type: 'Repair', duration: '4h', technician: 'Jane Smith' },
    { date: '2024-01-01', type: 'Inspection', duration: '1h', technician: 'Mike Johnson' },
  ];

  console.log("Rendering MachineAnalysis with data:", { performanceData, maintenanceHistory });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Machine Analysis</h1>
        <Button 
          onClick={() => setAnalyzing(true)} 
          disabled={analyzing}
          className="bg-primary"
        >
          {analyzing ? "Analyzing..." : "Run Diagnostic"}
        </Button>
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
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#2563eb" 
                    name="Performance %"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#dc2626" 
                    name="Temperature °F"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <Activity className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-2xl font-bold text-green-600">Operational</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Thermometer className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-2xl font-bold text-blue-600">72°F</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <Timer className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Uptime</p>
                    <p className="text-2xl font-bold text-yellow-600">98.5%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <Battery className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium">Load</p>
                    <p className="text-2xl font-bold text-purple-600">75%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Technician</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>{record.technician}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MachineAnalysis;