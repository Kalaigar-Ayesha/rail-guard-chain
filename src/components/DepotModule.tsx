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
  Wrench, 
  MapPin, 
  Calendar, 
  User,
  QrCode,
  CheckCircle,
  Clock,
  AlertTriangle,
  Package,
  Truck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstallationRecord {
  id: string;
  partId: string;
  partType: string;
  location: string;
  installationDate: string;
  engineer: string;
  status: "received" | "installed" | "verified" | "maintenance";
  notes?: string;
  blockchainHash?: string;
}

const DepotModule = () => {
  const [records, setRecords] = useState<InstallationRecord[]>([
    {
      id: "INST-001",
      partId: "TRP-EC-001-2024",
      partType: "Elastic Rail Clip",
      location: "Track Section A-12, KM 145.2",
      installationDate: "2024-02-20",
      engineer: "John Anderson",
      status: "verified",
      notes: "Installation completed successfully. All torque specifications met.",
      blockchainHash: "0x8f3a2b1c..."
    },
    {
      id: "INST-002",
      partId: "TRP-RP-002-2024",
      partType: "Rail Pad",
      location: "Track Section B-8, KM 203.7",
      installationDate: "2024-05-18",
      engineer: "Sarah Mitchell",
      status: "installed",
      notes: "Installation complete, pending verification.",
      blockchainHash: "0x7e2d9c4f..."
    },
    {
      id: "INST-003",
      partId: "TRP-SL-003-2024",
      partType: "Railway Sleeper",
      location: "Track Section C-15, KM 287.1",
      installationDate: "2024-08-10",
      engineer: "Mike Roberts",
      status: "received",
      notes: "Parts received at depot, ready for installation."
    }
  ]);

  const [newRecord, setNewRecord] = useState<Partial<InstallationRecord>>({
    partId: "",
    partType: "",
    location: "",
    installationDate: "",
    engineer: "",
    status: "received",
    notes: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const { toast } = useToast();

  const engineers = [
    "John Anderson",
    "Sarah Mitchell",
    "Mike Roberts",
    "Lisa Chen",
    "David Wilson"
  ];

  const partTypes = [
    "Elastic Rail Clip",
    "Rail Pad",
    "Rail Liner", 
    "Railway Sleeper",
    "Track Fastener",
    "Rail Joint"
  ];

  const handleSubmitRecord = () => {
    if (!newRecord.partId || !newRecord.location || !newRecord.engineer) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const recordId = `INST-${String(records.length + 1).padStart(3, '0')}`;
    
    const record: InstallationRecord = {
      ...newRecord as InstallationRecord,
      id: recordId,
    };

    setRecords([...records, record]);
    setNewRecord({
      partId: "",
      partType: "",
      location: "",
      installationDate: "",
      engineer: "",
      status: "received",
      notes: ""
    });
    setShowForm(false);

    toast({
      title: "Record Submitted Successfully",
      description: `Installation record ${recordId} has been created`,
    });
  };

  const handleQRScan = () => {
    setScanMode(true);
    
    // Simulate QR scan
    setTimeout(() => {
      const mockPartId = "TRP-EC-004-2024";
      setNewRecord({
        ...newRecord,
        partId: mockPartId,
        partType: "Elastic Rail Clip"
      });
      setScanMode(false);
      
      toast({
        title: "QR Code Scanned",
        description: `Part ${mockPartId} identified`,
      });
    }, 2000);
  };

  const updateRecordStatus = (recordId: string, newStatus: string) => {
    setRecords(records.map(record => 
      record.id === recordId 
        ? { ...record, status: newStatus as any, blockchainHash: "0x" + Math.random().toString(36).substring(2, 10) + "..." }
        : record
    ));
    
    toast({
      title: "Status Updated",
      description: `Record ${recordId} status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-inspection-ok border-inspection-ok";
      case "installed": return "text-primary border-primary";
      case "received": return "text-warning border-warning";
      case "maintenance": return "text-inspection-critical border-inspection-critical";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "installed": return <Wrench className="h-4 w-4" />;
      case "received": return <Package className="h-4 w-4" />;
      case "maintenance": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Depot & Installation Module</h2>
        <p className="text-muted-foreground">
          Track part receipt and installation management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Received</p>
                <p className="text-2xl font-bold">{records.filter(r => r.status === 'received').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Installed</p>
                <p className="text-2xl font-bold">{records.filter(r => r.status === 'installed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-inspection-ok" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold">{records.filter(r => r.status === 'verified').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-inspection-critical" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold">{records.filter(r => r.status === 'maintenance').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Installation Record */}
      <Card className="industrial-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>New Installation Record</span>
              </CardTitle>
              <CardDescription>
                Log new part receipts and installations
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "default"}
              className={!showForm ? "railway-gradient" : ""}
            >
              {showForm ? "Cancel" : "New Record"}
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partId">Part ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="partId"
                    placeholder="Enter or scan part ID"
                    value={newRecord.partId || ""}
                    onChange={(e) => setNewRecord({...newRecord, partId: e.target.value})}
                  />
                  <Button 
                    onClick={handleQRScan}
                    variant="outline"
                    disabled={scanMode}
                    className="flex items-center space-x-2"
                  >
                    <QrCode className="h-4 w-4" />
                    {scanMode ? "Scanning..." : "Scan"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partType">Part Type</Label>
                <Select onValueChange={(value) => setNewRecord({...newRecord, partType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select part type" />
                  </SelectTrigger>
                  <SelectContent>
                    {partTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Installation Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Track Section A-12, KM 145.2"
                  value={newRecord.location || ""}
                  onChange={(e) => setNewRecord({...newRecord, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationDate">Installation Date</Label>
                <Input
                  id="installationDate"
                  type="date"
                  value={newRecord.installationDate || ""}
                  onChange={(e) => setNewRecord({...newRecord, installationDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="engineer">Engineer</Label>
                <Select onValueChange={(value) => setNewRecord({...newRecord, engineer: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select engineer" />
                  </SelectTrigger>
                  <SelectContent>
                    {engineers.map((engineer) => (
                      <SelectItem key={engineer} value={engineer}>{engineer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => setNewRecord({...newRecord, status: value as any})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="installed">Installed</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Installation notes and observations..."
                value={newRecord.notes || ""}
                onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
              />
            </div>

            <Button onClick={handleSubmitRecord} className="w-full railway-gradient" size="lg">
              Submit Installation Record
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Records Table */}
      <Card className="industrial-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Installation Records</span>
          </CardTitle>
          <CardDescription>
            View and manage all installation records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Part ID</TableHead>
                <TableHead>Part Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Engineer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.partId}</TableCell>
                  <TableCell>{record.partType}</TableCell>
                  <TableCell>{record.location}</TableCell>
                  <TableCell>{record.installationDate}</TableCell>
                  <TableCell>{record.engineer}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(record.status)} flex items-center space-x-1 w-fit`}
                    >
                      {getStatusIcon(record.status)}
                      <span className="capitalize">{record.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {record.status === "received" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRecordStatus(record.id, "installed")}
                        >
                          Mark Installed
                        </Button>
                      )}
                      {record.status === "installed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRecordStatus(record.id, "verified")}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
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

export default DepotModule;