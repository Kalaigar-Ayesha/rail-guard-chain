import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Package, 
  Truck, 
  Wrench, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  Users
} from "lucide-react";

const DashboardOverview = () => {
  // Mock data for the dashboard
  const inventoryStats = {
    totalParts: 2847,
    inStock: 2156,
    installed: 582,
    underMaintenance: 109
  };

  const inspectionStats = {
    scheduled: 23,
    completed: 187,
    overdue: 8,
    nextWeek: 15
  };

  const recentActivities = [
    {
      id: 1,
      type: "inspection",
      message: "Critical inspection completed for TRP-EC-001-2024",
      time: "2 hours ago",
      icon: Search,
      status: "critical"
    },
    {
      id: 2,
      type: "installation",
      message: "New batch RP-BATCH-2024-Q3-012 installed at Track Section C-15",
      time: "4 hours ago",
      icon: Wrench,
      status: "success"
    },
    {
      id: 3,
      type: "vendor",
      message: "Steel Forge Industries delivered batch EC-BATCH-2024-Q4-001",
      time: "1 day ago",
      icon: Truck,
      status: "info"
    },
    {
      id: 4,
      type: "maintenance",  
      message: "Scheduled maintenance completed for Track Section A-5",
      time: "2 days ago",
      icon: Wrench,
      status: "success"
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      partId: "TRP-SL-010-2024",
      location: "Track Section C-15, KM 287.1",
      issue: "Structural integrity compromised",
      priority: "critical",
      timeframe: "1 month"
    },
    {
      id: 2,
      partId: "TRP-RP-005-2024",
      location: "Track Section B-8, KM 203.7",
      issue: "Material degradation accelerating",
      priority: "high",
      timeframe: "2-3 months"
    }
  ];

  const vendorPerformance = [
    { name: "Steel Forge Industries", score: 95, trend: "up" },
    { name: "Railway Components Ltd", score: 87, trend: "stable" },
    { name: "Concrete Solutions Inc", score: 78, trend: "down" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-inspection-critical";
      case "warning": return "text-warning";
      case "success": return "text-inspection-ok";
      case "info": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-inspection-critical border-inspection-critical";
      case "high": return "text-accent border-accent";
      case "medium": return "text-warning border-warning";
      default: return "text-muted-foreground border-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Railway Track Parts Management Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of inventory, inspections, and system status
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Parts</p>
                <p className="text-2xl font-bold">{inventoryStats.totalParts.toLocaleString()}</p>
                <p className="text-xs text-inspection-ok">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Inspections</p>
                <p className="text-2xl font-bold">{inspectionStats.completed}</p>
                <p className="text-xs text-warning">{inspectionStats.overdue} overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                <p className="text-2xl font-bold">{vendorPerformance.length}</p>
                <p className="text-xs text-inspection-ok">All verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Inventory Status */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Inventory Status</span>
              </CardTitle>
              <CardDescription>Current status of all track parts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-inspection-ok">{inventoryStats.inStock}</div>
                  <div className="text-sm text-muted-foreground">In Stock</div>
                  <Progress value={(inventoryStats.inStock / inventoryStats.totalParts) * 100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{inventoryStats.installed}</div>
                  <div className="text-sm text-muted-foreground">Installed</div>
                  <Progress value={(inventoryStats.installed / inventoryStats.totalParts) * 100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{inventoryStats.underMaintenance}</div>
                  <div className="text-sm text-muted-foreground">Maintenance</div>
                  <Progress value={(inventoryStats.underMaintenance / inventoryStats.totalParts) * 100} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{inventoryStats.totalParts}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                  <Progress value={100} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card className="industrial-shadow status-critical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-inspection-critical" />
                <span>Critical Alerts</span>
              </CardTitle>
              <CardDescription>Immediate attention required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalAlerts.map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${alert.priority === 'critical' ? 'border-l-inspection-critical' : 'border-l-accent'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant="outline" 
                            className={getPriorityColor(alert.priority)}
                          >
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <span className="text-sm font-medium">{alert.partId}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.location}</p>
                        <p className="text-sm">{alert.issue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Predicted Timeframe</p>
                        <p className="text-sm font-bold text-accent">{alert.timeframe}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Vendor Performance */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Vendor Performance</span>
              </CardTitle>
              <CardDescription>Quality scores and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendorPerformance.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{vendor.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">{vendor.score}%</span>
                        <TrendingUp 
                          className={`h-4 w-4 ${
                            vendor.trend === 'up' ? 'text-inspection-ok' : 
                            vendor.trend === 'down' ? 'text-inspection-critical rotate-180' : 
                            'text-primary'
                          }`} 
                        />
                      </div>
                    </div>
                    <Progress value={vendor.score} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Inspection Overview */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Inspections</span>
              </CardTitle>
              <CardDescription>Current inspection status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-inspection-ok" />
                  <div>
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                </div>
                <span className="text-lg font-bold">{inspectionStats.completed}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Scheduled</p>
                    <p className="text-xs text-muted-foreground">Next 7 days</p>
                  </div>
                </div>
                <span className="text-lg font-bold">{inspectionStats.nextWeek}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-inspection-critical" />
                  <div>
                    <p className="text-sm font-medium">Overdue</p>
                    <p className="text-xs text-muted-foreground">Requires attention</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-inspection-critical">{inspectionStats.overdue}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full bg-muted ${getStatusColor(activity.status)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>Current system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="outline" className="text-inspection-ok border-inspection-ok">
                  Online
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Photo Storage</span>
                <Badge variant="outline" className="text-inspection-ok border-inspection-ok">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Offline Sync</span>
                <Badge variant="outline" className="text-primary border-primary">
                  Ready
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile Devices</span>
                <Badge variant="outline" className="text-inspection-ok border-inspection-ok">
                  12 Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;