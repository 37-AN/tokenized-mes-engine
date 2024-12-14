import { Activity, TrendingUp, Users, AlertTriangle, BarChart3 } from "lucide-react";
import DashboardMetricCard from "./metrics/DashboardMetricCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const DashboardAnalytics = () => {
  const { data: mesData } = useQuery({
    queryKey: ['mesMetrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('refined_mes_data')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const metrics = [
    {
      title: "Production Rate",
      value: mesData?.[0]?.value?.toFixed(1) + "%" || "98.5%",
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
      title: "Quality Score",
      value: mesData?.[0]?.quality_score?.toFixed(1) + "%" || "99.2%",
      subtitle: "Above target",
      icon: BarChart3,
    },
    {
      title: "Alerts",
      value: "2",
      subtitle: "Requires attention",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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