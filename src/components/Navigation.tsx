import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navigation = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Production Management", path: "/production-management" },
    { name: "Machine Analysis", path: "/machine-analysis" },
    { name: "Production Metrics", path: "/production-metrics" },
    { name: "Active Products", path: "/active-products" },
    { name: "System Status", path: "/system-status" },
    { name: "Database Records", path: "/database" },
  ];

  console.log("Navigation component rendered");

  return (
    <div className="flex justify-between items-center w-full mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="hover:bg-secondary"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-4">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  console.log(`Navigating to ${item.path}`);
                }}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navigation;