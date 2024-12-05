import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MonitoringTab from "@/components/dashboard/MonitoringTab";
import AlertsTab from "@/components/dashboard/AlertsTab";
import ProductionTab from "@/components/dashboard/ProductionTab";
import ManagementTab from "@/components/dashboard/ManagementTab";

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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <MonitoringTab />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsTab />
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <ProductionTab />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <ManagementTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;