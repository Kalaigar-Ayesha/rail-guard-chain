import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  QrCode,
  Calendar,
  MapPin,
  User,
  FileText,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InspectionRecord {
  id: string;
  partId: string;
  partType: string;
  location: string;
  inspectionDate: string;
  inspector: string;
  result: "ok" | "defect" | "replace";
  findings: string;
  images?: string[];
  nextInspection?: string;
  blockchainHash?: string;
}

const InspectorModule = () => {
  const [inspections, setInspections] = useState<InspectionRecord[]>([
    {
      id: "INSP-001",
      partId: "TRP-EC-001-2024",
      partType: "Elastic Rail Clip",
      location: "Track Section A-12, KM 145.2",
      inspectionDate: "2024-08-15",
      inspector: "Alice Johnson",
      result: "ok",
      findings: "Visual inspection shows no signs of wear or damage. Torque within specifications.",
      nextInspection: "2024-11-15",
      blockchainHash: "0x9b2c4f8e..."
    },
    {
      id: "INSP-002",
      partId: "TRP-RP-002-2024",
      partType: "Rail Pad",
      location: "Track Section B-8, KM 203.7",
      inspectionDate: "2024-07-20",
      inspector: "Robert Chen",
      result: "defect",
      findings: "Minor surface cracking observed on the underside. Requires monitoring.",
      nextInspection: "2024-10-20",
      blockchainHash: "0x7a5d3e1b..."
    },
    {
      id: "INSP-003",
      partId: "TRP-SL-003-2024",
      partType: "Railway Sleeper",
      location: "Track Section C-15, KM 287.1",
      inspectionDate: "2024-09-05",
      inspector: "Maria Garcia",
      result: "replace",
      findings: "Significant concrete deterioration and structural integrity compromised.",
      nextInspection: "Immediate replacement required",
      blockchainHash: "0x4c8f2a9d..."
    }
  ]);

  const [newInspection, setNewInspection] = useState<Partial<InspectionRecord>>({
    partId: "",
    partType: "",
    location: "",
    inspectionDate: "",
    inspector: "",
    result: "ok",
    findings: "",
    nextInspection: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [photoMode, setPhotoMode] = useState(false);
  const { toast } = useToast();

  const inspectors = [
    "Alice Johnson",
    "Robert Chen",
    "Maria Garcia",
    "David Kim",
    "Sarah Wilson"
  ];

  const handleSubmitInspection = () => {
    if (!newInspection.partId || !newInspection.inspector || !newInspection.findings) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const inspectionId = `INSP-${String(inspections.length + 1).padStart(3, '0')}`;
    
    const inspection: InspectionRecord = {
      ...newInspection as InspectionRecord,
      id: inspectionId,
      blockchainHash: "0x" + Math.random().toString(36).substring(2, 10) + "..."
    };

    setInspections([...inspections, inspection]);
    setNewInspection({
      partId: "",
      partType: "",
      location: "",
      inspectionDate: "",
      inspector: "",
      result: "ok",
      findings: "",
      nextInspection: ""
    });
    setShowForm(false);

    toast({
      title: "Inspection Recorded Successfully",
      description: `Inspection ${inspectionId} has been submitted to blockchain`,
    });
  };

  const handleQRScan = () => {
    setScanMode(true);
    
    setTimeout(() => {
      const mockPartDetails = {
        partId: "TRP-EC-005-2024",
        partType: "Elastic Rail Clip",
        location: "Track Section D-3, KM 156.8"
      };
      
      setNewInspection({
        ...newInspection,
        ...mockPartDetails
      });
      setScanMode(false);
      
      toast({
        title: "QR Code Scanned",
        description: `Part ${mockPartDetails.partId} loaded`,
      });
    }, 2000);
  };

  const handleTakePhoto = () => {
    setPhotoMode(true);
    
    setTimeout(() => {
      setPhotoMode(false);
      toast({
        title: "Photo Captured",
        description: "Inspection photo added to record",
      });
    }, 1500);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "ok": return "text-inspection-ok border-inspection-ok";
      case "defect": return "text-warning border-warning";
      case "replace": return "text-inspection-critical border-inspection-critical";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "ok": return <CheckCircle className="h-4 w-4" />;
      case "defect": return <AlertTriangle className="h-4 w-4" />;
      case "replace": return <XCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getNextInspectionDate = (result: string, currentDate: string) => {
    const current = new Date(currentDate);
    switch (result) {
      case "ok":
        current.setMonth(current.getMonth() + 3);
        return current.toISOString().split('T')[0];
      case "defect":
        current.setMonth(current.getMonth() + 1);
        return current.toISOString().split('T')[0];
      case "replace":
        return "Immediate replacement required";
      default:
        return "";
    }
  };

  // Calculate inspection stats
  const totalInspections = inspections.length;
  const okInspections = inspections.filter(i => i.result === 'ok').length;
  const defectInspections = inspections.filter(i => i.result === 'defect').length;
  const replaceInspections = inspections.filter(i => i.result === 'replace').length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Inspector Module</h2>
        <p className="text-muted-foreground">
          Conduct inspections and record results with offline sync capability
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Inspections</p>
                <p className="text-2xl font-bold">{totalInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-inspection-ok" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">OK Status</p>
                <p className="text-2xl font-bold">{okInspections}</p>
                <Progress value={(okInspections / totalInspections) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Defects</p>
                <p className="text-2xl font-bold">{defectInspections}</p>
                <Progress value={(defectInspections / totalInspections) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow status-critical">
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-inspection-critical" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Replace Required</p>
                <p className="text-2xl font-bold">{replaceInspections}</p>
                <Progress value={(replaceInspections / totalInspections) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Inspection Form */}
      <Card className="industrial-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>New Inspection</span>
              </CardTitle>
              <CardDescription>
                Conduct part inspection and record findings
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "default"}
              className={!showForm ? "railway-gradient" : ""}
            >
              {showForm ? "Cancel" : "New Inspection"}
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
                    placeholder="Scan or enter part ID"
                    value={newInspection.partId || ""}
                    onChange={(e) => setNewInspection({...newInspection, partId: e.target.value})}
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
                <Input
                  id="partType"
                  placeholder="Auto-filled from scan"
                  value={newInspection.partType || ""}
                  onChange={(e) => setNewInspection({...newInspection, partType: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Auto-filled from scan"
                  value={newInspection.location || ""}
                  onChange={(e) => setNewInspection({...newInspection, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspectionDate">Inspection Date</Label>
                <Input
                  id="inspectionDate"
                  type="date"
                  value={newInspection.inspectionDate || ""}
                  onChange={(e) => setNewInspection({...newInspection, inspectionDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector</Label>
                <Select onValueChange={(value) => setNewInspection({...newInspection, inspector: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspector" />
                  </SelectTrigger>
                  <SelectContent>
                    {inspectors.map((inspector) => (
                      <SelectItem key={inspector} value={inspector}>{inspector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result">Inspection Result</Label>
                <Select onValueChange={(value) => {
                  setNewInspection({
                    ...newInspection, 
                    result: value as any,
                    nextInspection: getNextInspectionDate(value, newInspection.inspectionDate || new Date().toISOString().split('T')[0])
                  });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ok">OK - No Issues</SelectItem>
                    <SelectItem value="defect">Defect - Monitoring Required</SelectItem>
                    <SelectItem value="replace">Replace - Immediate Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="findings">Inspection Findings</Label>
              <Textarea
                id="findings"
                placeholder="Detailed inspection findings and observations..."
                value={newInspection.findings || ""}
                onChange={(e) => setNewInspection({...newInspection, findings: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextInspection">Next Inspection Date</Label>
              <Input
                id="nextInspection"
                value={newInspection.nextInspection || ""}
                onChange={(e) => setNewInspection({...newInspection, nextInspection: e.target.value})}
                placeholder="Auto-calculated based on result"
              />
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleTakePhoto}
                variant="outline"
                disabled={photoMode}
                className="flex items-center space-x-2"
              >
                <Camera className="h-4 w-4" />
                {photoMode ? "Taking Photo..." : "Take Photo"}
              </Button>
              
              <Button onClick={handleSubmitInspection} className="flex-1 railway-gradient" size="lg">
                Submit Inspection
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Inspections Table */}
      <Card className="industrial-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Inspection Records</span>
          </CardTitle>
          <CardDescription>
            View and manage all inspection records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inspection ID</TableHead>
                <TableHead>Part ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Next Inspection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.map((inspection) => (
                <TableRow key={inspection.id}>
                  <TableCell className="font-medium">{inspection.id}</TableCell>
                  <TableCell>{inspection.partId}</TableCell>
                  <TableCell>{inspection.partType}</TableCell>
                  <TableCell>{inspection.location}</TableCell>
                  <TableCell>{inspection.inspectionDate}</TableCell>
                  <TableCell>{inspection.inspector}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${getResultColor(inspection.result)} flex items-center space-x-1 w-fit`}
                    >
                      {getResultIcon(inspection.result)}
                      <span className="capitalize">{inspection.result}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {inspection.nextInspection}
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

export default InspectorModule;