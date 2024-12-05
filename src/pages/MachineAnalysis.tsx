import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";
import { PerformanceMetrics } from "@/components/machine-analysis/PerformanceMetrics";
import { AnomalyDetection } from "@/components/machine-analysis/AnomalyDetection";
import { PredictiveMaintenance } from "@/components/machine-analysis/PredictiveMaintenance";

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

  const healthMetrics = {
    performance: 92,
    temperature: 72,
    vibration: 0.5,
    power: 95,
    pressure: 78
  };

  const runDiagnostic = () => {
    setAnalyzing(true);
    toast.info("Starting diagnostic analysis...");
    
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("Diagnostic analysis completed successfully");
    }, 2000);
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
      
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <AnomalyDetection healthMetrics={healthMetrics} />
          <PredictiveMaintenance 
            maintenanceHistory={maintenanceHistory}
            healthMetrics={healthMetrics}
          />
        </div>
        <PerformanceMetrics performanceData={performanceData} />
      </div>
    </div>
  );
};

export default MachineAnalysis;