import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  QrCode, 
  Truck, 
  Wrench, 
  Search, 
  Brain, 
  BarChart3,
  Shield,
  Wifi,
  WifiOff,
  RefreshCw
} from "lucide-react";
import QRScanner from "@/components/QRScanner";
import VendorPortal from "@/components/VendorPortal";
import DepotModule from "@/components/DepotModule";
import InspectorModule from "@/components/InspectorModule";
import AIAnalytics from "@/components/AIAnalytics";
import DashboardOverview from "@/components/DashboardOverview";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(true);
  const [syncPending, setSyncPending] = useState(3);
  const { toast } = useToast();

  const handleSync = () => {
    toast({
      title: "Sync Complete",
      description: `${syncPending} records synchronized with blockchain`,
    });
    setSyncPending(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 railway-gradient p-3 rounded-lg">
                <Wrench className="h-8 w-8 text-primary-foreground" />
                <div>
                  <h1 className="text-xl font-bold text-primary-foreground">Railway Track Parts</h1>
                  <p className="text-sm text-primary-foreground/80">Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Online/Offline Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <div className="flex items-center space-x-2 text-success">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-warning">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-sm font-medium">Offline Mode</span>
                  </div>
                )}
                
                {syncPending > 0 && (
                  <Button
                    onClick={handleSync}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Sync ({syncPending})</span>
                  </Button>
                )}
              </div>

              {/* Blockchain Status */}
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blockchain-verified" />
                <Badge variant="outline" className="border-blockchain-verified text-blockchain-verified">
                  Blockchain Verified
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-card border border-border">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="qr-scanner" className="flex items-center space-x-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="vendor" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Vendor Portal</span>
            </TabsTrigger>
            <TabsTrigger value="depot" className="flex items-center space-x-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Depot & Install</span>
            </TabsTrigger>
            <TabsTrigger value="inspector" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Inspector</span>
            </TabsTrigger>
            <TabsTrigger value="ai-analytics" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="qr-scanner">
            <QRScanner />
          </TabsContent>

          <TabsContent value="vendor">
            <VendorPortal />
          </TabsContent>

          <TabsContent value="depot">
            <DepotModule />
          </TabsContent>

          <TabsContent value="inspector">
            <InspectorModule />
          </TabsContent>

          <TabsContent value="ai-analytics">
            <AIAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;