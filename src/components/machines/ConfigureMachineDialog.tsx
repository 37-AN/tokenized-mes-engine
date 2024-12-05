import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { sql } from "@/lib/db";
import { Machine } from "@/services/machineService";
import { aiService } from "@/utils/aiService";
import { AiAnomalyAlert } from "./ai-insights/AiAnomalyAlert";
import { MaintenancePredictionAlert } from "./ai-insights/MaintenancePredictionAlert";
import { MachineConfigForm } from "./configuration/MachineConfigForm";

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
          <AiAnomalyAlert details={aiInsights.anomalyResult.details} />
        )}

        {aiInsights?.maintenancePrediction && (
          <MaintenancePredictionAlert
            nextMaintenanceDate={aiInsights.maintenancePrediction.nextMaintenanceDate}
            urgency={aiInsights.maintenancePrediction.urgency}
            confidence={aiInsights.maintenancePrediction.confidence}
          />
        )}

        <MachineConfigForm
          name={name}
          status={status}
          maintenanceStatus={maintenanceStatus}
          onNameChange={setName}
          onStatusChange={setStatus}
          onMaintenanceStatusChange={setMaintenanceStatus}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}