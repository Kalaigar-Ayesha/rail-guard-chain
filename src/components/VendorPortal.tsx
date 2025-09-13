import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Truck, 
  Plus, 
  Upload, 
  Shield,
  Calendar,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BatchData {
  batchId: string;
  vendor: string;
  materialType: string;
  quantity: number;
  manufacturingDate: string;
  warrantyPeriod: string;
  status: "pending" | "approved" | "shipped" | "delivered";
  blockchainHash?: string;
}

const VendorPortal = () => {
  const [batches, setBatches] = useState<BatchData[]>([
    {
      batchId: "EC-BATCH-2024-Q1-001",
      vendor: "Steel Forge Industries",
      materialType: "Elastic Rail Clip",
      quantity: 500,
      manufacturingDate: "2024-01-15",
      warrantyPeriod: "36 months",
      status: "delivered",
      blockchainHash: "0x8f3a2b1c..."
    },
    {
      batchId: "RP-BATCH-2024-Q2-002",
      vendor: "Railway Components Ltd",
      materialType: "Rail Pad",
      quantity: 300,
      manufacturingDate: "2024-04-10",
      warrantyPeriod: "24 months",
      status: "shipped",
      blockchainHash: "0x7e2d9c4f..."
    },
    {
      batchId: "SL-BATCH-2024-Q3-003",
      vendor: "Concrete Solutions Inc",
      materialType: "Railway Sleeper",
      quantity: 150,
      manufacturingDate: "2024-07-22",
      warrantyPeriod: "60 months",
      status: "approved",
      blockchainHash: "0x9a5c7e3d..."
    }
  ]);

  const [newBatch, setNewBatch] = useState<Partial<BatchData>>({
    vendor: "",
    materialType: "",
    quantity: 0,
    manufacturingDate: "",
    warrantyPeriod: "",
    status: "pending"
  });

  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const materialTypes = [
    "Elastic Rail Clip",
    "Rail Pad",
    "Rail Liner",
    "Railway Sleeper",
    "Track Fastener",
    "Rail Joint"
  ];

  const vendors = [
    "Steel Forge Industries",
    "Railway Components Ltd",
    "Concrete Solutions Inc",
    "Track Systems Corp",
    "Industrial Rail Parts"
  ];

  const handleSubmitBatch = () => {
    if (!newBatch.vendor || !newBatch.materialType || !newBatch.quantity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const batchId = `${newBatch.materialType?.split(' ')[0]?.substring(0, 2).toUpperCase()}-BATCH-${new Date().getFullYear()}-Q${Math.ceil((new Date().getMonth() + 1) / 3)}-${String(batches.length + 1).padStart(3, '0')}`;
    
    const batch: BatchData = {
      ...newBatch as BatchData,
      batchId,
    };

    setBatches([...batches, batch]);
    setNewBatch({
      vendor: "",
      materialType: "",
      quantity: 0,
      manufacturingDate: "",
      warrantyPeriod: "",
      status: "pending"
    });
    setShowForm(false);

    toast({
      title: "Batch Submitted Successfully",
      description: `Batch ${batchId} has been submitted for approval`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "text-inspection-ok border-inspection-ok";
      case "shipped": return "text-primary border-primary";
      case "approved": return "text-warning border-warning";
      case "pending": return "text-muted-foreground border-muted";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "approved": return <Upload className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Vendor Portal</h2>
        <p className="text-muted-foreground">
          Manage manufacturing and supply batch data for railway track parts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Batches</p>
                <p className="text-2xl font-bold">{batches.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-inspection-ok" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold">{batches.filter(b => b.status === 'delivered').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold">{batches.filter(b => b.status === 'shipped').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{batches.filter(b => b.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Batch */}
      <Card className="industrial-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>New Batch Submission</span>
              </CardTitle>
              <CardDescription>
                Submit new manufacturing and supply batch data
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "default"}
              className={!showForm ? "railway-gradient" : ""}
            >
              {showForm ? "Cancel" : "Add New Batch"}
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor Name</Label>
                <Select onValueChange={(value) => setNewBatch({...newBatch, vendor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="materialType">Material Type</Label>
                <Select onValueChange={(value) => setNewBatch({...newBatch, materialType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material type" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={newBatch.quantity || ""}
                  onChange={(e) => setNewBatch({...newBatch, quantity: parseInt(e.target.value)})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
                <Input
                  id="manufacturingDate"
                  type="date"
                  value={newBatch.manufacturingDate || ""}
                  onChange={(e) => setNewBatch({...newBatch, manufacturingDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyPeriod">Warranty Period</Label>
                <Select onValueChange={(value) => setNewBatch({...newBatch, warrantyPeriod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warranty period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12 months">12 months</SelectItem>
                    <SelectItem value="24 months">24 months</SelectItem>
                    <SelectItem value="36 months">36 months</SelectItem>
                    <SelectItem value="48 months">48 months</SelectItem>
                    <SelectItem value="60 months">60 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSubmitBatch} className="w-full railway-gradient" size="lg">
              Submit Batch Data
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Batches Table */}
      <Card className="industrial-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Batch Management</span>
          </CardTitle>
          <CardDescription>
            View and manage all submitted batches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Material Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Manufacturing Date</TableHead>
                <TableHead>Warranty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Blockchain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.batchId}>
                  <TableCell className="font-medium">{batch.batchId}</TableCell>
                  <TableCell>{batch.vendor}</TableCell>
                  <TableCell>{batch.materialType}</TableCell>
                  <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                  <TableCell>{batch.manufacturingDate}</TableCell>
                  <TableCell>{batch.warrantyPeriod}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(batch.status)} flex items-center space-x-1 w-fit`}
                    >
                      {getStatusIcon(batch.status)}
                      <span className="capitalize">{batch.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {batch.blockchainHash ? (
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blockchain-verified" />
                        <span className="text-xs font-mono text-muted-foreground">
                          {batch.blockchainHash}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPortal;