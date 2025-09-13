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
  BarChart3,
  Wifi,
  WifiOff,
  RefreshCw,
  Menu,
  X
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import QRScanner from "@/components/QRScanner";
import VendorPortal from "@/components/VendorPortal";
import DepotModule from "@/components/DepotModule";
import InspectorModule from "@/components/InspectorModule";
import DashboardOverview from "@/components/DashboardOverview";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(true);
  const [syncPending, setSyncPending] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSync = () => {
    toast({
      title: "Sync Complete",
      description: `${syncPending} records synchronized`,
    });
    setSyncPending(0);
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "qr-scanner", label: "QR Scanner", icon: QrCode },
    { id: "vendor", label: "Vendor Portal", icon: Truck },
    { id: "depot", label: "Depot & Install", icon: Wrench },
    { id: "inspector", label: "Inspector", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 railway-gradient p-3 rounded-lg">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold text-primary-foreground">Railway Track Parts</h1>
                  <p className="text-xs sm:text-sm text-primary-foreground/80">Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Online/Offline Status */}
              <div className="hidden sm:flex items-center space-x-2">
                {isOnline ? (
                  <div className="flex items-center space-x-2 text-success">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-warning">
                    <WifiOff className="h-4 w-4" />
                    <span className="text-sm font-medium">Offline</span>
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

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 border-t pt-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between py-2">
                  {isOnline ? (
                    <div className="flex items-center space-x-2 text-success">
                      <Wifi className="h-4 w-4" />
                      <span className="text-sm font-medium">Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-warning">
                      <WifiOff className="h-4 w-4" />
                      <span className="text-sm font-medium">Offline</span>
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
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Navigation */}
          <TabsList className="hidden sm:grid w-full grid-cols-5 mb-8 bg-card border border-border">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TabsTrigger key={item.id} value={item.id} className="flex items-center space-x-2">
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Mobile Navigation */}
          <div className="sm:hidden mb-6">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "outline"}
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center space-x-2 justify-center"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>
          </div>

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
        </Tabs>
      </main>
    </div>
  );
};

export default Index;