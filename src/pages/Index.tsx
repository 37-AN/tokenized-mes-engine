import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, BarChart3, Box, Settings, LineChart, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
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
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/analytics">
                <Card className="p-6 glass-card hover-scale">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-primary/5">
                      <LineChart className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Analytics View</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced analytics and insights
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;