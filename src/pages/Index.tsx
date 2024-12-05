import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Activity, Settings2, Box } from "lucide-react";

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
          <Card className="p-6 glass-card hover-scale">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-primary/5">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">System Status</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All systems operational
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card hover-scale">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-primary/5">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Production Metrics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Current efficiency rate
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold">98.5%</span>
                  <Badge variant="secondary">+2.1%</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card hover-scale">
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-primary/5">
                <Box className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Active Products</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Products in production
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold">24</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Separator className="my-12" />

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="hover-scale">
              <Settings2 className="w-4 h-4 mr-2" />
              Machine Setup
            </Button>
            <Button variant="outline" className="hover-scale">
              <Box className="w-4 h-4 mr-2" />
              Product Management
            </Button>
            <Button variant="outline" className="hover-scale">
              <Activity className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;