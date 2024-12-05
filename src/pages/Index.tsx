import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, BarChart3, Box } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen p-8 animate-in">
      <header className="max-w-5xl mx-auto text-center mb-16">
        <Badge className="mb-4" variant="secondary">Manufacturing Execution System</Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          AI-Powered Manufacturing Control
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Monitor, control, and optimize your manufacturing processes with advanced AI capabilities
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
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

          <Link to="/active-products">
            <Card className="p-6 glass-card hover-scale">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-primary/5">
                  <Box className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Active Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Track current production items
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;