import { Activity, BarChart3, Gauge } from "lucide-react";
import MonitoringCard from "./monitoring/MonitoringCard";

const MonitoringTab = () => {
  const monitoringItems = [
    {
      to: "/system-status",
      icon: Activity,
      title: "System Status",
      description: "Monitor real-time system health",
    },
    {
      to: "/production-metrics",
      icon: BarChart3,
      title: "Production Metrics",
      description: "View detailed production analytics",
    },
    {
      to: "/machine-analysis",
      icon: Gauge,
      title: "Machine Analysis",
      description: "AI-powered status and maintenance",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {monitoringItems.map((item) => (
        <MonitoringCard
          key={item.to}
          to={item.to}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default MonitoringTab;