import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { sql } from "@/lib/db";
import { Machine } from "@/services/machineService";
import { aiService } from "@/utils/aiService";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ConfigureMachineDialogProps {
  machine: Machine;
  onMachineUpdated: () => void;
}

export function ConfigureMachineDialog({ machine, onMachineUpdated }: ConfigureMachineDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(machine.name);
  const [status, setStatus] = useState(machine.status);
  const [maintenanceStatus, setMaintenanceStatus] = useState(machine.maintenance_status);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const analyzeWithAI = async () => {
      try {
        const [anomalyResult, maintenancePrediction] = await Promise.all([
          aiService.detectAnomalies({
            performance: 85,
            temperature: 72,
            vibration: 0.15,
            power_usage: 4.2
          }),
          aiService.predictMaintenance({
            status: machine.status,
            lastMaintenance: '2024-01-01',
            runtime: 2160,
            performanceTrend: 'stable'
          })
        ]);

        setAiInsights({ anomalyResult, maintenancePrediction });
        console.log('AI analysis completed:', { anomalyResult, maintenancePrediction });

        if (anomalyResult.isAnomaly) {
          toast({
            title: "Anomaly Detected",
            description: anomalyResult.details,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error during AI analysis:', error);
        toast({
          title: "AI Analysis Error",
          description: "Failed to perform AI analysis",
          variant: "destructive",
        });
      }
    };

    if (open) {
      analyzeWithAI();
    }
  }, [open, machine.status, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating machine configuration:', { name, status, maintenanceStatus });
    
    try {
      await sql`
        UPDATE machines 
        SET name = ${name}, 
            status = ${status}, 
            maintenance_status = ${maintenanceStatus}
        WHERE id = ${machine.id}
      `;

      toast({
        title: "Machine Updated",
        description: "Machine configuration has been updated successfully.",
      });
      
      onMachineUpdated();
      setOpen(false);
    } catch (error) {
      console.error('Error updating machine:', error);
      toast({
        title: "Error",
        description: "Failed to update machine configuration",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full gap-2">
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Machine</DialogTitle>
          <DialogDescription>
            Update the configuration settings for this machine.
          </DialogDescription>
        </DialogHeader>
        
        {aiInsights?.anomalyResult?.isAnomaly && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Anomaly Detected</AlertTitle>
            <AlertDescription>
              {aiInsights.anomalyResult.details}
            </AlertDescription>
          </Alert>
        )}

        {aiInsights?.maintenancePrediction && (
          <Alert className="mb-4">
            <AlertTitle>Maintenance Prediction</AlertTitle>
            <AlertDescription>
              Next maintenance recommended by: {new Date(aiInsights.maintenancePrediction.nextMaintenanceDate).toLocaleDateString()}
              <br />
              Urgency: {aiInsights.maintenancePrediction.urgency}
              <br />
              Confidence: {(aiInsights.maintenancePrediction.confidence * 100).toFixed(1)}%
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Machine Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter machine name"
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenance">Maintenance Status</Label>
            <Select value={maintenanceStatus} onValueChange={setMaintenanceStatus}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select maintenance status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Up to date">Up to date</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}