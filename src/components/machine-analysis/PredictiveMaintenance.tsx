import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Clock } from "lucide-react";

interface MaintenanceRecord {
  date: string;
  type: string;
  duration: string;
  technician: string;
  status: string;
}

interface PredictiveMaintenanceProps {
  maintenanceHistory: MaintenanceRecord[];
  healthMetrics: {
    performance: number;
  };
}

export const PredictiveMaintenance = ({ maintenanceHistory, healthMetrics }: PredictiveMaintenanceProps) => {
  const nextMaintenanceDate = new Date();
  nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + 7);

  const maintenanceUrgency = healthMetrics.performance < 85 ? "high" : "normal";

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Predictive Maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Next Maintenance Prediction</AlertTitle>
          <AlertDescription className="mt-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Recommended by: {nextMaintenanceDate.toLocaleDateString()}</span>
            </div>
            <div className="mt-2">
              Urgency: <Badge variant={maintenanceUrgency === "high" ? "destructive" : "default"}>
                {maintenanceUrgency.toUpperCase()}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        <div className="rounded-md border">
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
        </div>
      </CardContent>
    </Card>
  );
};