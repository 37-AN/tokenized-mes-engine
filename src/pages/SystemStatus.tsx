import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle } from "lucide-react";

const SystemStatus = () => {
  const systems = [
    { name: "Production Line A", status: "operational", uptime: "99.9%" },
    { name: "Assembly Unit B", status: "operational", uptime: "98.5%" },
    { name: "Quality Control", status: "warning", uptime: "95.2%" },
  ];

  return (
    <div className="min-h-screen p-8 animate-in">
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-2xl font-semibold">{system.uptime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;