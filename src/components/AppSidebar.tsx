import { Home, Activity, Database, Settings, AlertCircle, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Production Metrics", icon: BarChart, path: "/production-metrics" },
    { name: "Machine Analysis", icon: Activity, path: "/machine-analysis" },
    { name: "System Status", icon: Settings, path: "/system-status" },
    { name: "Database Records", icon: Database, path: "/database-view" },
    { name: "System Alerts", icon: AlertCircle, path: "/system-alerts" },
  ];

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            43v3r M3S
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm",
                    "hover:bg-accent transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <SidebarTrigger />
      </div>
    </>
  );
};

export default AppSidebar;