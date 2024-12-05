import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Cog, Server, Wrench } from "lucide-react";
import { useState } from "react";
import { generateMachineToken } from "@/utils/tokenization";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import { AddMachineDialog } from "@/components/machines/AddMachineDialog";
import { machineService, type Machine } from "@/services/machineService";
import { useQuery } from "@tanstack/react-query";
import { sql } from "@/lib/db";

const MachineSetup = () => {
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: machines = [], refetch } = useQuery({
    queryKey: ["machines", refreshKey],
    queryFn: machineService.getAllMachines,
  });

  const regenerateToken = async (machineId: number) => {
    console.log('Regenerating token for machine:', machineId);
    const newToken = generateMachineToken(machineId.toString(), Date.now());
    try {
      await sql`
        UPDATE machines 
        SET token = ${newToken}
        WHERE id = ${machineId}
      `;
      await refetch();
      toast({
        title: "Token Regenerated",
        description: `New token generated for ${machines.find(m => m.id === machineId)?.name}`,
      });
    } catch (error) {
      console.error('Error regenerating token:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate token",
        variant: "destructive",
      });
    }
  };

  const handleMachineAdded = () => {
    refetch();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Navigation />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Machine Setup</h1>
        <AddMachineDialog onMachineAdded={handleMachineAdded} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <Card key={machine.id} className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{machine.name}</CardTitle>
              <Server className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`text-sm font-medium ${
                      machine.status === "Active" ? "text-green-500" : "text-red-500"
                    }`}>
                      {machine.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Maintenance</span>
                    <span className="text-sm font-medium">{machine.maintenance_status}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Token</span>
                    <Input 
                      value={machine.token} 
                      readOnly 
                      className="mt-1 text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Wrench className="h-4 w-4" />
                    Configure
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={() => regenerateToken(machine.id)}
                  >
                    <Cog className="h-4 w-4" />
                    Regenerate Token
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MachineSetup;