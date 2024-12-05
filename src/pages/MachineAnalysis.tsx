import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { useState } from "react";
import { Activity, AlertTriangle, Thermometer, Timer, Wrench, Battery, Cpu, Gauge } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MachineAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const performanceData = [
    { time: '00:00', performance: 85, temperature: 65, vibration: 0.5, power: 90, pressure: 75 },
    { time: '04:00', performance: 88, temperature: 68, vibration: 0.6, power: 92, pressure: 78 },
    { time: '08:00', performance: 92, temperature: 70, vibration: 0.4, power: 95, pressure: 80 },
    { time: '12:00', performance: 90, temperature: 72, vibration: 0.7, power: 91, pressure: 77 },
    { time: '16:00', performance: 87, temperature: 69, vibration: 0.5, power: 88, pressure: 76 },
    { time: '20:00', performance: 89, temperature: 67, vibration: 0.4, power: 93, pressure: 79 },
  ];

  const maintenanceHistory = [
    { date: '2024-02-01', type: 'Preventive', duration: '2h', technician: 'John Doe', status: 'Completed' },
    { date: '2024-01-15', type: 'Repair', duration: '4h', technician: 'Jane Smith', status: 'Completed' },
    { date: '2024-01-01', type: 'Inspection', duration: '1h', technician: 'Mike Johnson', status: 'Completed' },
    { date: '2024-02-15', type: 'Scheduled', duration: '3h', technician: 'Sarah Wilson', status: 'Pending' },
  ];

  const runDiagnostic = () => {
    setAnalyzing(true);
    toast.info("Starting diagnostic analysis...");
    
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("Diagnostic analysis completed successfully");
    }, 2000);
  };

  const healthMetrics = {
    performance: 92,
    temperature: 72,
    vibration: 0.5,
    power: 95,
    pressure: 78
  };

  console.log("Rendering MachineAnalysis with enhanced data:", { performanceData, maintenanceHistory, healthMetrics });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Machine Analysis</h1>
          <p className="text-muted-foreground">Comprehensive machine health monitoring and diagnostics</p>
        </div>
        <Button 
          onClick={runDiagnostic} 
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
                  <Line type="monotone" dataKey="performance" stroke="#2563eb" name="Performance %" />
                  <Line type="monotone" dataKey="temperature" stroke="#dc2626" name="Temperature °F" />
                  <Line type="monotone" dataKey="vibration" stroke="#eab308" name="Vibration" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="power" stroke="#2563eb" fill="#2563eb33" name="Power Usage" />
                  <Area type="monotone" dataKey="pressure" stroke="#22c55e" fill="#22c55e33" name="Pressure" />
                </AreaChart>
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
                    <p className="text-2xl font-bold text-blue-600">{healthMetrics.temperature}°F</p>
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
                <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                  <Gauge className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="text-sm font-medium">Pressure</p>
                    <p className="text-2xl font-bold text-indigo-600">{healthMetrics.pressure} PSI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20">
                  <Cpu className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="text-sm font-medium">CPU Usage</p>
                    <p className="text-2xl font-bold text-rose-600">65%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6">
                <div className="text-6xl font-bold text-primary mb-2">92</div>
                <Badge variant="secondary" className="text-lg">Excellent</Badge>
                <p className="text-muted-foreground mt-2">Based on current performance metrics</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-xl font-semibold">95%</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm text-muted-foreground">Reliability</p>
                  <p className="text-xl font-semibold">89%</p>
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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>{record.technician}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Completed' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                    </TableCell>
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