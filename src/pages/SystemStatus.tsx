import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle, Cpu, Thermometer, Battery, Wifi, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const SystemStatus = () => {
  const systems = [
    { 
      name: "Production Line A", 
      status: "operational", 
      uptime: "99.9%",
      temperature: "23.5°C",
      load: "78%",
      lastMaintenance: "2 days ago"
    },
    { 
      name: "Assembly Unit B", 
      status: "operational", 
      uptime: "98.5%",
      temperature: "24.1°C",
      load: "65%",
      lastMaintenance: "5 days ago"
    },
    { 
      name: "Quality Control", 
      status: "warning", 
      uptime: "95.2%",
      temperature: "22.8°C",
      load: "92%",
      lastMaintenance: "1 week ago"
    },
    { 
      name: "Packaging System", 
      status: "operational", 
      uptime: "99.1%",
      temperature: "21.9°C",
      load: "45%",
      lastMaintenance: "3 days ago"
    },
    { 
      name: "Warehouse Robotics", 
      status: "operational", 
      uptime: "97.8%",
      temperature: "25.2°C",
      load: "83%",
      lastMaintenance: "4 days ago"
    },
    { 
      name: "Material Handling", 
      status: "warning", 
      uptime: "94.5%",
      temperature: "26.1°C",
      load: "88%",
      lastMaintenance: "6 days ago"
    }
  ];

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">System Status</h1>
        <p className="text-lg text-muted-foreground">Real-time system monitoring and health status</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <Card key={system.name} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{system.name}</CardTitle>
              {system.status === "operational" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Uptime</span>
                  </div>
                  <span className="font-semibold">{system.uptime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Temperature</span>
                  </div>
                  <span className="font-semibold">{system.temperature}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">System Load</span>
                  </div>
                  <span className="font-semibold">{system.load}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last Maintenance</span>
                  </div>
                  <span className="font-semibold">{system.lastMaintenance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;