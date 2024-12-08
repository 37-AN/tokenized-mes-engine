import Navigation from "@/components/Navigation";
import ConnectionStatus from "@/components/status/ConnectionStatus";
import SystemCard from "@/components/status/SystemCard";

const SystemStatus = () => {
  const systems = [
    { 
      name: "Production Line A", 
      status: "operational", 
      uptime: "99.9%",
      temperature: "23.5°C",
      load: "78%",
      lastMaintenance: "2 days ago"
    },
    { 
      name: "Assembly Unit B", 
      status: "operational", 
      uptime: "98.5%",
      temperature: "24.1°C",
      load: "65%",
      lastMaintenance: "5 days ago"
    },
    { 
      name: "Quality Control", 
      status: "warning", 
      uptime: "95.2%",
      temperature: "22.8°C",
      load: "92%",
      lastMaintenance: "1 week ago"
    },
    { 
      name: "Packaging System", 
      status: "operational", 
      uptime: "99.1%",
      temperature: "21.9°C",
      load: "45%",
      lastMaintenance: "3 days ago"
    },
    { 
      name: "Warehouse Robotics", 
      status: "operational", 
      uptime: "97.8%",
      temperature: "25.2°C",
      load: "83%",
      lastMaintenance: "4 days ago"
    },
    { 
      name: "Material Handling", 
      status: "warning", 
      uptime: "94.5%",
      temperature: "26.1°C",
      load: "88%",
      lastMaintenance: "6 days ago"
    }
  ];

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">System Status</h1>
        <p className="text-lg text-muted-foreground">Real-time system monitoring and health status</p>
      </header>

      <div className="max-w-6xl mx-auto mb-8">
        <ConnectionStatus />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <SystemCard key={system.name} system={system} />
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;