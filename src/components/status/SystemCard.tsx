import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle, Cpu, Thermometer, Clock } from "lucide-react";

interface SystemCardProps {
  system: {
    name: string;
    status: string;
    uptime: string;
    temperature: string;
    load: string;
    lastMaintenance: string;
  };
}

const SystemCard = ({ system }: SystemCardProps) => {
  return (
    <Card className="hover-scale">
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
  );
};

export default SystemCard;