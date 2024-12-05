import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ProductionMonitor from "@/components/production/ProductionMonitor";
import QualityControl from "@/components/quality/QualityControl";

const ProductionMetrics = () => {
  console.log("Rendering ProductionMetrics page");

  return (
    <div className="min-h-screen p-8 animate-in">
      <Navigation />
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Production Metrics</h1>
        <p className="text-lg text-muted-foreground">Real-time production monitoring and quality control</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList>
            <TabsTrigger value="monitoring">Production Monitoring</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <ProductionMonitor />
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <QualityControl />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductionMetrics;