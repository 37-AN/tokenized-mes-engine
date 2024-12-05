import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

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
      <Button variant="ghost" size="icon" className="hover:bg-secondary">
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Navigation;