import { Activity, TrendingUp, Users, AlertTriangle } from "lucide-react";
import DashboardMetricCard from "./metrics/DashboardMetricCard";

const DashboardAnalytics = () => {
  const metrics = [
    {
      title: "Production Rate",
      value: "98.5%",
      subtitle: "+2% from last month",
      icon: TrendingUp,
    },
    {
      title: "Active Machines",
      value: "24/25",
      subtitle: "1 in maintenance",
      icon: Activity,
    },
    {
      title: "Active Workers",
      value: "42",
      subtitle: "Across 3 shifts",
      icon: Users,
    },
    {
      title: "Alerts",
      value: "2",
      subtitle: "Requires attention",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <DashboardMetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          subtitle={metric.subtitle}
          icon={metric.icon}
        />
      ))}
    </div>
  );
};

export default DashboardAnalytics;