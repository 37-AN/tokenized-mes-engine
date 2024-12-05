import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Activity, BarChart3, Gauge } from "lucide-react";

const MonitoringTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/system-status">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">System Status</h3>
              <p className="text-sm text-muted-foreground">
                Monitor real-time system health
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <Link to="/production-metrics">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Production Metrics</h3>
              <p className="text-sm text-muted-foreground">
                View detailed production analytics
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <Link to="/machine-analysis">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <Gauge className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Machine Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered status and maintenance
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default MonitoringTab;