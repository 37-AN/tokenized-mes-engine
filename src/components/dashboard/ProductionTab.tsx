import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Settings, Database } from "lucide-react";

const ProductionTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/machine-setup">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Machine Setup</h3>
              <p className="text-sm text-muted-foreground">
                Configure and manage machines
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <Link to="/production-management">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Production Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage production workflows
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <Link to="/database">
        <Card className="p-6 glass-card hover-scale">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-lg bg-primary/5">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Database Records</h3>
              <p className="text-sm text-muted-foreground">
                View and manage database records
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default ProductionTab;