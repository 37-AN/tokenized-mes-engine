import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { sql } from "@/lib/db";
import { Machine } from "@/services/machineService";

interface ConfigureMachineDialogProps {
  machine: Machine;
  onMachineUpdated: () => void;
}

export function ConfigureMachineDialog({ machine, onMachineUpdated }: ConfigureMachineDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(machine.name);
  const [status, setStatus] = useState(machine.status);
  const [maintenanceStatus, setMaintenanceStatus] = useState(machine.maintenance_status);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating machine configuration:', { name, status, maintenanceStatus });
    
    try {
      await sql`
        UPDATE machines 
        SET name = ${name}, 
            status = ${status}, 
            maintenance_status = ${maintenanceStatus}
        WHERE id = ${machine.id}
      `;

      toast({
        title: "Machine Updated",
        description: "Machine configuration has been updated successfully.",
      });
      
      onMachineUpdated();
      setOpen(false);
    } catch (error) {
      console.error('Error updating machine:', error);
      toast({
        title: "Error",
        description: "Failed to update machine configuration",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full gap-2">
          Configure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Machine</DialogTitle>
          <DialogDescription>
            Update the configuration settings for this machine.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Machine Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter machine name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenance">Maintenance Status</Label>
            <Select value={maintenanceStatus} onValueChange={setMaintenanceStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select maintenance status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Up to date">Up to date</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}