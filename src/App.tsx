import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductionMetrics from "./pages/ProductionMetrics";
import SystemStatus from "./pages/SystemStatus";
import MachineSetup from "./pages/MachineSetup";
import MachineAnalysis from "./pages/MachineAnalysis";
import ActiveProducts from "./pages/ActiveProducts";
import AnalyticsView from "./pages/AnalyticsView";
import SystemAlerts from "./pages/SystemAlerts";
import ProductionManagement from "./pages/ProductionManagement";
import DatabaseView from "./pages/DatabaseView";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/production-metrics" element={<ProductionMetrics />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/machine-setup" element={<MachineSetup />} />
        <Route path="/machine-analysis" element={<MachineAnalysis />} />
        <Route path="/active-products" element={<ActiveProducts />} />
        <Route path="/analytics" element={<AnalyticsView />} />
        <Route path="/system-alerts" element={<SystemAlerts />} />
        <Route path="/production-management" element={<ProductionManagement />} />
        <Route path="/database-view" element={<DatabaseView />} />
      </Routes>
    </Router>
  );
}

export default App;