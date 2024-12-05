import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MaintenancePredictionAlertProps {
  nextMaintenanceDate: string;
  urgency: string;
  confidence: number;
}

export function MaintenancePredictionAlert({
  nextMaintenanceDate,
  urgency,
  confidence,
}: MaintenancePredictionAlertProps) {
  return (
    <Alert className="mb-4">
      <AlertTitle>Maintenance Prediction</AlertTitle>
      <AlertDescription>
        Next maintenance recommended by: {new Date(nextMaintenanceDate).toLocaleDateString()}
        <br />
        Urgency: {urgency}
        <br />
        Confidence: {(confidence * 100).toFixed(1)}%
      </AlertDescription>
    </Alert>
  );
}