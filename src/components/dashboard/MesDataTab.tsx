import { Activity, BarChart3, LineChart } from "lucide-react";
import MonitoringCard from "./monitoring/MonitoringCard";

const MesDataTab = () => {
  const mesItems = [
    {
      to: "/production-metrics",
      icon: LineChart,
      title: "Production Performance",
      description: "Real-time production metrics",
    },
    {
      to: "/quality-metrics",
      icon: BarChart3,
      title: "Quality Metrics",
      description: "Product quality analysis",
    },
    {
      to: "/process-monitoring",
      icon: Activity,
      title: "Process Monitoring",
      description: "Live process parameters",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mesItems.map((item) => (
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

export default MesDataTab;