import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MachineConfigFormProps {
  name: string;
  status: string;
  maintenanceStatus: string;
  onNameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onMaintenanceStatusChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function MachineConfigForm({
  name,
  status,
  maintenanceStatus,
  onNameChange,
  onStatusChange,
  onMaintenanceStatusChange,
  onSubmit,
}: MachineConfigFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Machine Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter machine name"
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="maintenance">Maintenance Status</Label>
        <Select value={maintenanceStatus} onValueChange={onMaintenanceStatusChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select maintenance status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
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
  );
}