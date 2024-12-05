import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MachineSetup from "./pages/MachineSetup";
import ProductionManagement from "./pages/ProductionManagement";
import MachineAnalysis from "./pages/MachineAnalysis";
import SystemStatus from "./pages/SystemStatus";
import SystemAlerts from "./pages/SystemAlerts";
import ActiveProducts from "./pages/ActiveProducts";
import DatabaseView from "./pages/DatabaseView";
import AnalyticsView from "./pages/AnalyticsView";
import ProductionMetrics from "./pages/ProductionMetrics";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/machine-setup" element={<MachineSetup />} />
        <Route path="/production-management" element={<ProductionManagement />} />
        <Route path="/machine-analysis" element={<MachineAnalysis />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/system-alerts" element={<SystemAlerts />} />
        <Route path="/active-products" element={<ActiveProducts />} />
        <Route path="/database" element={<DatabaseView />} />
        <Route path="/analytics" element={<AnalyticsView />} />
        <Route path="/production-metrics" element={<ProductionMetrics />} />
      </Routes>
    </Router>
  );
}

export default App;