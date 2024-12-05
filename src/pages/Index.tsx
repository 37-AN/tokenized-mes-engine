import { WalletConnection } from "@/components/wallet/WalletConnection";
import { TokenInteraction } from "@/components/token/TokenInteraction";
import { Card } from "@/components/ui/card";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import MonitoringTab from "@/components/dashboard/MonitoringTab";
import ProductionTab from "@/components/dashboard/ProductionTab";
import ManagementTab from "@/components/dashboard/ManagementTab";
import AppSidebar from "@/components/AppSidebar";

export default function Index() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1 p-8 space-y-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <DashboardAnalytics />
          
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">System Monitoring</h2>
            <MonitoringTab />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Production Management</h2>
            <ProductionTab />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Management Tools</h2>
            <ManagementTab />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Token Management</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Wallet Connection</h3>
                <WalletConnection />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Token Operations</h3>
                <TokenInteraction />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}