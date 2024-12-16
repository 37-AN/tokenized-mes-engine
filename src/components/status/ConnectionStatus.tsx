import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ConnectionStatus = () => {
  const [refineryConnection, setRefineryConnection] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [lastDataReceived, setLastDataReceived] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkConnections = async () => {
      try {
        console.log('Checking connection status...');
        
        // First check if we can connect to Supabase
        const { data: healthCheck, error: healthError } = await supabase.from('refined_industrial_data').select('count(*)', { count: 'exact' });
        
        if (healthError) {
          console.error('Database connection error:', healthError);
          toast({
            title: "Database Connection Error",
            description: "Unable to connect to the database. Please check your configuration.",
            variant: "destructive",
          });
          setRefineryConnection('disconnected');
          return;
        }

        // Call the refinery-connection function
        const { data: functionData, error: functionError } = await supabase.functions.invoke('refinery-connection', {
          body: { action: 'check-connection' }
        });
        
        if (functionError) {
          console.error('Edge function error:', functionError);
          toast({
            title: "Connection Error",
            description: "Unable to connect to the refinery service. Please try again later.",
            variant: "destructive",
          });
          setRefineryConnection('disconnected');
          return;
        }

        // Check for recent data
        const { data, error } = await supabase
          .from('refined_industrial_data')
          .select('timestamp')
          .order('timestamp', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error checking refinery connection:', error);
          toast({
            title: "Data Fetch Error",
            description: error.message,
            variant: "destructive",
          });
          setRefineryConnection('disconnected');
          return;
        }

        console.log('Query result:', data);

        if (data && data.length > 0) {
          const lastTimestamp = new Date(data[0].timestamp);
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
          
          setLastDataReceived(lastTimestamp.toLocaleString());
          const isConnected = lastTimestamp > fiveMinutesAgo;
          setRefineryConnection(isConnected ? 'connected' : 'disconnected');
          console.log('Connection status updated:', isConnected ? 'connected' : 'disconnected');
          console.log('Last timestamp:', lastTimestamp);
          console.log('Five minutes ago:', fiveMinutesAgo);
        } else {
          console.log('No data found in refined_industrial_data table');
          setRefineryConnection('connected'); // Set to connected even if no data, as the connection itself works
          toast({
            title: "Connection Active",
            description: "Connected to the refinery service. Waiting for initial data.",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('Unexpected error in checkConnections:', error);
        toast({
          title: "Connection Error",
          description: "An unexpected error occurred while checking the connection.",
          variant: "destructive",
        });
        setRefineryConnection('disconnected');
      }
    };

    // Initial check
    checkConnections();
    
    // Set up interval for periodic checks
    const interval = setInterval(checkConnections, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle className="text-xl">AI Refinery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/5">
                {refineryConnection === 'checking' ? (
                  <Loader className="h-6 w-6 text-primary animate-spin" />
                ) : refineryConnection === 'connected' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">AI Industry Refinery Connection</h3>
                <p className="text-sm text-muted-foreground">
                  {refineryConnection === 'checking' ? 'Checking connection...' :
                   refineryConnection === 'connected' ? 'Connected and ready' :
                   'Connection issue detected'}
                </p>
                {lastDataReceived && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Last data received: {lastDataReceived}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;