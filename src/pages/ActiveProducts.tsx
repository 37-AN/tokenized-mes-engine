import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, Clock } from "lucide-react";

const ActiveProducts = () => {
  const products = [
    { id: "PRD001", name: "Product A", status: "In Production", timeRemaining: "2h 30m" },
    { id: "PRD002", name: "Product B", status: "Quality Check", timeRemaining: "45m" },
    { id: "PRD003", name: "Product C", status: "Assembly", timeRemaining: "1h 15m" },
  ];

  return (
    <div className="min-h-screen p-8 animate-in">
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Active Products</h1>
        <p className="text-lg text-muted-foreground">Currently active products in the production line</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
              <Badge variant="secondary">{product.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Box className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{product.id}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Time Remaining: {product.timeRemaining}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveProducts;