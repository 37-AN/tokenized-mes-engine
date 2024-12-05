import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MonitoringTab from "@/components/dashboard/MonitoringTab";
import AlertsTab from "@/components/dashboard/AlertsTab";
import ProductionTab from "@/components/dashboard/ProductionTab";
import ManagementTab from "@/components/dashboard/ManagementTab";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import AppSidebar from "@/components/AppSidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 p-8 animate-in">
        <DashboardAnalytics />
        
        <div className="mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default Index;