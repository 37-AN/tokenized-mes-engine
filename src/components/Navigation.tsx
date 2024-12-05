import { ChevronLeft, Menu, Database } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Production Management", path: "/production-management" },
    { name: "Machine Analysis", path: "/machine-analysis" },
    { name: "Production Metrics", path: "/production-metrics" },
    { name: "Active Products", path: "/active-products" },
    { name: "System Status", path: "/system-status" },
    { name: "Database Records", path: "/database-view", icon: <Database className="mr-2 h-4 w-4" /> },
  ];

  console.log("Navigation component rendered, current path:", location.pathname);

  return (
    <div className="flex justify-between items-center w-full mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-background">Pages</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavigationMenuLink asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start",
                            location.pathname === item.path && "bg-accent"
                          )}
                          onClick={() => navigate(item.path)}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

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
                className={cn(
                  "w-full justify-start",
                  location.pathname === item.path && "bg-accent"
                )}
                onClick={() => {
                  navigate(item.path);
                  console.log(`Navigating to ${item.path}`);
                }}
              >
                {item.icon}
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