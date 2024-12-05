import { useQuery } from "@tanstack/react-query";
import { metricsService } from "@/services/metricsService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { initDatabase } from "@/lib/db";

const DatabaseView = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDatabase();
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize database:", error);
        setInitError(error instanceof Error ? error.message : "Unknown error occurred");
      }
    };
    initialize();
  }, []);

  const productionMetrics = useQuery({
    queryKey: ["productionMetrics"],
    queryFn: metricsService.getProductionMetrics,
    enabled: isInitialized,
  });

  const machineStatus = useQuery({
    queryKey: ["machineStatus"],
    queryFn: metricsService.getMachineStatus,
    enabled: isInitialized,
  });

  const maintenanceRecords = useQuery({
    queryKey: ["maintenanceRecords"],
    queryFn: metricsService.getMaintenanceRecords,
    enabled: isInitialized,
  });

  if (initError) {
    return (
      <div className="container mx-auto p-6">
        <Navigation />
        <div className="text-red-500">
          Error initializing database: {initError}
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="container mx-auto p-6">
        <Navigation />
        <div>Initializing database...</div>
      </div>
    );
  }

  console.log("Database view queries:", {
    productionMetrics: productionMetrics.data,
    machineStatus: machineStatus.data,
    maintenanceRecords: maintenanceRecords.data,
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <h1 className="text-3xl font-bold">Database Records</h1>

      <Tabs defaultValue="production" className="space-y-4">
        <TabsList>
          <TabsTrigger value="production">Production Metrics</TabsTrigger>
          <TabsTrigger value="machine">Machine Status</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Records</TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          <Card>
            <CardHeader>
              <CardTitle>Production Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {productionMetrics.isLoading ? (
                <p>Loading production metrics...</p>
              ) : productionMetrics.error ? (
                <p>Error loading production metrics</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Production Count</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Defects</TableHead>
                      <TableHead>Waste</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productionMetrics.data?.map((metric, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(new Date(metric.timestamp), "PPpp")}
                        </TableCell>
                        <TableCell>{metric.production_count}</TableCell>
                        <TableCell>{metric.efficiency}%</TableCell>
                        <TableCell>{metric.defects}</TableCell>
                        <TableCell>{metric.waste}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machine">
          <Card>
            <CardHeader>
              <CardTitle>Machine Status</CardTitle>
            </CardHeader>
            <CardContent>
              {machineStatus.isLoading ? (
                <p>Loading machine status...</p>
              ) : machineStatus.error ? (
                <p>Error loading machine status</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Machine ID</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {machineStatus.data?.map((status, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(new Date(status.timestamp), "PPpp")}
                        </TableCell>
                        <TableCell>{status.machine_id}</TableCell>
                        <TableCell>{status.performance}%</TableCell>
                        <TableCell>{status.temperature}°C</TableCell>
                        <TableCell>{status.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Records</CardTitle>
            </CardHeader>
            <CardContent>
              {maintenanceRecords.isLoading ? (
                <p>Loading maintenance records...</p>
              ) : maintenanceRecords.error ? (
                <p>Error loading maintenance records</p>
              ) : (
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
                    {maintenanceRecords.data?.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(new Date(record.date), "PPpp")}
                        </TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.duration}</TableCell>
                        <TableCell>{record.technician}</TableCell>
                        <TableCell>{record.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseView;