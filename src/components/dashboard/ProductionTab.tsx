import { Settings, Database, LineChart } from "lucide-react";
import MonitoringCard from "./monitoring/MonitoringCard";

const ProductionTab = () => {
  const productionItems = [
    {
      to: "/machine-setup",
      icon: Settings,
      title: "Machine Setup",
      description: "Configure and manage machines",
    },
    {
      to: "/production-management",
      icon: Database,
      title: "Production Management",
      description: "Manage production workflows",
    },
    {
      to: "/database-view",
      icon: LineChart,
      title: "Database Records",
      description: "View and manage database records",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productionItems.map((item) => (
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

export default ProductionTab;