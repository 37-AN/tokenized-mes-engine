import { WalletConnection } from '@/components/wallet/WalletConnection';
import ProductionMonitor from '@/components/production/ProductionMonitor';
import Navigation from '@/components/Navigation';

const ProductionMetrics = () => {
  return (
    <div className="min-h-screen p-8">
      <Navigation />
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Production Metrics</h1>
          <p className="text-lg text-muted-foreground">
            Monitor production metrics and manage wallet connection
          </p>
        </header>

        <div className="mb-8">
          <WalletConnection />
        </div>

        <ProductionMonitor />
      </div>
    </div>
  );
};

export default ProductionMetrics;