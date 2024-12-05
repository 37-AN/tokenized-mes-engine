import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { machineService } from "@/services/machineService";

interface AddMachineDialogProps {
  onMachineAdded: () => void;
}

export function AddMachineDialog({ onMachineAdded }: AddMachineDialogProps) {
  const [open, setOpen] = useState(false);
  const [machineName, setMachineName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!machineName.trim()) {
      toast({
        title: "Error",
        description: "Machine name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await machineService.addMachine(machineName);
      toast({
        title: "Success",
        description: "Machine added successfully",
      });
      setMachineName("");
      setOpen(false);
      onMachineAdded();
    } catch (error) {
      console.error("Error adding machine:", error);
      toast({
        title: "Error",
        description: "Failed to add machine",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Cog className="h-4 w-4" />
          Add Machine
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Machine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Machine Name</Label>
            <Input
              id="name"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="Enter machine name"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Machine"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}