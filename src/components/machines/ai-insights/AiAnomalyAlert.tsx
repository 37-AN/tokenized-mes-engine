import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface AiAnomalyAlertProps {
  details: string;
}

export function AiAnomalyAlert({ details }: AiAnomalyAlertProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Anomaly Detected</AlertTitle>
      <AlertDescription>{details}</AlertDescription>
    </Alert>
  );
}