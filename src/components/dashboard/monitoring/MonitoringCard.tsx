import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MonitoringCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const MonitoringCard = ({ to, icon: Icon, title, description }: MonitoringCardProps) => {
  return (
    <Link to={to}>
      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-primary/5">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MonitoringCard;