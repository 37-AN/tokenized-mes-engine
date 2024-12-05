import { Card } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";

const SystemAlerts = () => {
  const alerts = [
    {
      id: 1,
      title: "Temperature Warning",
      description: "Production Line A temperature exceeding normal range",
      severity: "warning",
      timestamp: "10 minutes ago",
      status: "active"
    },
    {
      id: 2,
      title: "Maintenance Required",
      description: "Assembly Unit B scheduled maintenance due",
      severity: "info",
      timestamp: "1 hour ago",
      status: "pending"
    },
    {
      id: 3,
      title: "System Overload",
      description: "Quality Control system experiencing high load",
      severity: "critical",
      timestamp: "30 minutes ago",
      status: "active"
    },
    {
      id: 4,
      title: "Calibration Complete",
      description: "Packaging System successfully calibrated",
      severity: "success",
      timestamp: "2 hours ago",
      status: "resolved"
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "success":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">System Alerts</h1>
        <p className="text-lg text-muted-foreground">
          Monitor and manage system alerts and notifications
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{alert.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityClass(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">
                  {alert.description}
                </p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {alert.timestamp}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;