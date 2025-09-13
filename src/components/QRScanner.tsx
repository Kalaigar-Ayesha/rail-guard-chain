import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  Shield,
  Calendar,
  MapPin,
  Wrench,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrackPart {
  id: string;
  type: string;
  batchId: string;
  vendor: string;
  manufacturingDate: string;
  installationDate?: string;
  location?: string;
  status: "active" | "inspection_due" | "maintenance_required" | "retired";
  lastInspection?: string;
  nextInspection?: string;
}

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedPart, setScannedPart] = useState<TrackPart | null>(null);
  const [manualQRInput, setManualQRInput] = useState("");
  const { toast } = useToast();

  const mockTrackParts: Record<string, TrackPart> = {
    "TRP-EC-001-2024": {
      id: "TRP-EC-001-2024",
      type: "Elastic Rail Clip",
      batchId: "EC-BATCH-2024-Q1-001",
      vendor: "Steel Forge Industries",
      manufacturingDate: "2024-01-15",
      installationDate: "2024-02-20",
      location: "Track Section A-12, KM 145.2",
      status: "active",
      lastInspection: "2024-08-15",
      nextInspection: "2024-11-15"
    },
    "TRP-RP-002-2024": {
      id: "TRP-RP-002-2024",
      type: "Rail Pad",
      batchId: "RP-BATCH-2024-Q2-002",
      vendor: "Railway Components Ltd",
      manufacturingDate: "2024-04-10",
      installationDate: "2024-05-18",
      location: "Track Section B-8, KM 203.7",
      status: "inspection_due",
      lastInspection: "2024-07-20",
      nextInspection: "2024-10-20"
    }
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const qrCodes = Object.keys(mockTrackParts);
      const randomQR = qrCodes[Math.floor(Math.random() * qrCodes.length)];
      const part = mockTrackParts[randomQR];
      
      setScannedPart(part);
      setIsScanning(false);
      
      toast({
        title: "QR Code Scanned Successfully",
        description: `Found ${part.type} - ${part.id}`,
      });
    }, 2000);
  };

  const handleManualQRLookup = () => {
    const part = mockTrackParts[manualQRInput];
    if (part) {
      setScannedPart(part);
      toast({
        title: "Part Found",
        description: `Retrieved ${part.type} details`,
      });
    } else {
      toast({
        title: "Part Not Found",
        description: "QR code not found in database",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-inspection-ok border-inspection-ok";
      case "inspection_due": return "text-warning border-warning";
      case "maintenance_required": return "text-inspection-critical border-inspection-critical";
      case "retired": return "text-muted-foreground border-muted";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "inspection_due": return <AlertTriangle className="h-4 w-4" />;
      case "maintenance_required": return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">QR Code Scanner</h2>
        <p className="text-muted-foreground">
          Scan or manually enter QR codes to access track part information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner Interface */}
        <Card className="industrial-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>QR Code Scanner</span>
            </CardTitle>
            <CardDescription>
              Use camera to scan QR codes on track parts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Simulator */}
            <div className="relative">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                {isScanning ? (
                  <div className="text-center">
                    <div className="scanning-animation">
                      <QrCode className="h-16 w-16 text-primary mx-auto mb-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Camera Ready</p>
                  </div>
                )}
              </div>
            </div>

            <Button 
              onClick={simulateQRScan} 
              disabled={isScanning}
              className="w-full railway-gradient"
              size="lg"
            >
              {isScanning ? "Scanning..." : "Start QR Scan"}
            </Button>

            <Separator />

            {/* Manual QR Input */}
            <div className="space-y-4">
              <Label htmlFor="manual-qr">Manual QR Code Entry</Label>
              <div className="flex space-x-2">
                <Input
                  id="manual-qr"
                  placeholder="Enter QR code (e.g., TRP-EC-001-2024)"
                  value={manualQRInput}
                  onChange={(e) => setManualQRInput(e.target.value)}
                />
                <Button onClick={handleManualQRLookup} variant="outline">
                  Lookup
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Try: TRP-EC-001-2024 or TRP-RP-002-2024
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Scan Results */}
        <Card className="industrial-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Scan Results</span>
            </CardTitle>
            <CardDescription>
              Track part information and verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scannedPart ? (
              <div className="space-y-6">
                {/* Part Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{scannedPart.type}</h3>
                    <p className="text-sm text-muted-foreground">{scannedPart.id}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(scannedPart.status)} flex items-center space-x-1`}
                  >
                    {getStatusIcon(scannedPart.status)}
                    <span className="capitalize">{scannedPart.status.replace('_', ' ')}</span>
                  </Badge>
                </div>

                {/* Part Details */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Vendor</p>
                      <p className="text-sm text-muted-foreground">{scannedPart.vendor}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Manufacturing Date</p>
                      <p className="text-sm text-muted-foreground">{scannedPart.manufacturingDate}</p>
                    </div>
                  </div>

                  {scannedPart.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{scannedPart.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Batch ID</p>
                      <p className="text-sm text-muted-foreground">{scannedPart.batchId}</p>
                    </div>
                  </div>
                </div>

                {/* Inspection Status */}
                {scannedPart.lastInspection && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Last Inspection</p>
                      <p className="text-sm text-muted-foreground">{scannedPart.lastInspection}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Inspection</p>
                      <p className="text-sm text-muted-foreground">{scannedPart.nextInspection}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No part scanned yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use the scanner or manual entry to view part details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;