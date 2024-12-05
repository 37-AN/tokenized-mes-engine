import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const AlertsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/system-alerts">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">System Alerts</h3>
              <p className="text-sm text-muted-foreground">
                View and manage system alerts
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default AlertsTab;