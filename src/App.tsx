import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductionMetrics from "./pages/ProductionMetrics";
import MachineAnalysis from "./pages/MachineAnalysis";
import SystemStatus from "./pages/SystemStatus";
import DatabaseView from "./pages/DatabaseView";
import ProductionManagement from "./pages/ProductionManagement";
import MachineSetup from "./pages/MachineSetup";
import AnalyticsView from "./pages/AnalyticsView";
import ActiveProducts from "./pages/ActiveProducts";
import SystemAlerts from "./pages/SystemAlerts";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/production-metrics" element={<ProductionMetrics />} />
        <Route path="/machine-analysis" element={<MachineAnalysis />} />
        <Route path="/system-status" element={<SystemStatus />} />
        <Route path="/database-view" element={<DatabaseView />} />
        <Route path="/production-management" element={<ProductionManagement />} />
        <Route path="/machine-setup" element={<MachineSetup />} />
        <Route path="/analytics-view" element={<AnalyticsView />} />
        <Route path="/active-products" element={<ActiveProducts />} />
        <Route path="/system-alerts" element={<SystemAlerts />} />
      </Routes>
    </Router>
  );
}

export default App;