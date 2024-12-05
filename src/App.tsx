import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SystemStatus from "./pages/SystemStatus";
import ProductionMetrics from "./pages/ProductionMetrics";
import ActiveProducts from "./pages/ActiveProducts";
import MachineSetup from "./pages/MachineSetup";
import ProductionManagement from "./pages/ProductionManagement";
import AnalyticsView from "./pages/AnalyticsView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/production-metrics" element={<ProductionMetrics />} />
          <Route path="/active-products" element={<ActiveProducts />} />
          <Route path="/machine-setup" element={<MachineSetup />} />
          <Route path="/production-management" element={<ProductionManagement />} />
          <Route path="/analytics" element={<AnalyticsView />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;