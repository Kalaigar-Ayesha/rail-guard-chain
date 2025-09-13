import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Calendar,
  MapPin
} from "lucide-react";

interface PredictionAlert {
  id: string;
  partId: string;
  partType: string;
  location: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  prediction: string;
  confidence: number;
  timeframe: string;
  factors: string[];
}

interface QualityTrend {
  vendor: string;
  defectRate: number;
  trend: "improving" | "stable" | "declining";
  totalParts: number;
  avgLifespan: number;
}

const AIAnalytics = () => {
  const [predictions] = useState<PredictionAlert[]>([
    {
      id: "PRED-001",
      partId: "TRP-EC-001-2024",
      partType: "Elastic Rail Clip",
      location: "Track Section A-12, KM 145.2",
      riskLevel: "medium",
      prediction: "Fatigue failure expected within 6-8 months",
      confidence: 78,
      timeframe: "6-8 months",
      factors: ["High vibration exposure", "Temperature cycling", "Installation torque variance"]
    },
    {
      id: "PRED-002",
      partId: "TRP-RP-005-2024",
      partType: "Rail Pad",
      location: "Track Section B-8, KM 203.7",
      riskLevel: "high",
      prediction: "Material degradation accelerating",
      confidence: 91,
      timeframe: "2-3 months",
      factors: ["UV exposure", "Chemical contamination", "Moisture retention"]
    },
    {
      id: "PRED-003",
      partId: "TRP-SL-010-2024",
      partType: "Railway Sleeper",
      location: "Track Section C-15, KM 287.1",
      riskLevel: "critical",
      prediction: "Structural integrity compromised",
      confidence: 95,
      timeframe: "1 month",
      factors: ["Concrete carbonation", "Reinforcement corrosion", "Load stress concentration"]
    }
  ]);

  const [qualityTrends] = useState<QualityTrend[]>([
    {
      vendor: "Steel Forge Industries",
      defectRate: 2.1,
      trend: "improving",
      totalParts: 1250,
      avgLifespan: 8.2
    },
    {
      vendor: "Railway Components Ltd",
      defectRate: 4.7,
      trend: "stable",
      totalParts: 890,
      avgLifespan: 6.8
    },
    {
      vendor: "Concrete Solutions Inc",
      defectRate: 6.3,
      trend: "declining",
      totalParts: 456,
      avgLifespan: 5.1
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-inspection-ok border-inspection-ok";
      case "medium": return "text-warning border-warning";
      case "high": return "text-accent border-accent";
      case "critical": return "text-inspection-critical border-inspection-critical";
      default: return "text-muted-foreground border-muted";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <Shield className="h-4 w-4" />;
      case "medium": return <AlertTriangle className="h-4 w-4" />;
      case "high": return <Zap className="h-4 w-4" />;
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-inspection-ok";
      case "stable": return "text-primary";
      case "declining": return "text-inspection-critical";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 rotate-0" />;
      case "stable": return <Activity className="h-4 w-4" />;
      case "declining": return <TrendingUp className="h-4 w-4 rotate-180" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">AI Analytics Module</h2>
        <p className="text-muted-foreground">
          Predictive maintenance and quality control analytics powered by machine learning
        </p>
      </div>

      {/* AI Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Predictions</p>
                <p className="text-2xl font-bold">{predictions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow status-critical">
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-inspection-critical" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold">{predictions.filter(p => p.riskLevel === 'critical').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold">
                  {Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="industrial-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold">12.4K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
          <TabsTrigger value="predictions" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Failure Predictions</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Quality Trends</span>
          </TabsTrigger>
          <TabsTrigger value="anomalies" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Anomaly Detection</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* Critical Alerts */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-inspection-critical" />
                <span>Critical Failure Predictions</span>
              </CardTitle>
              <CardDescription>
                AI-powered failure predictions requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.filter(p => p.riskLevel === 'critical' || p.riskLevel === 'high').map((prediction) => (
                <Card key={prediction.id} className={`border-l-4 ${prediction.riskLevel === 'critical' ? 'border-l-inspection-critical' : 'border-l-accent'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant="outline" 
                            className={`${getRiskColor(prediction.riskLevel)} flex items-center space-x-1`}
                          >
                            {getRiskIcon(prediction.riskLevel)}
                            <span className="capitalize">{prediction.riskLevel} Risk</span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {prediction.confidence}% confidence
                          </span>
                        </div>
                        <h4 className="font-semibold">{prediction.partId} - {prediction.partType}</h4>
                        <p className="text-sm text-muted-foreground flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{prediction.location}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Predicted Timeframe</p>
                        <p className="text-lg font-bold text-accent">{prediction.timeframe}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{prediction.prediction}</p>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Contributing Factors:</p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Progress value={prediction.confidence} className="mt-3" />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* All Predictions */}
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>All Failure Predictions</span>
              </CardTitle>
              <CardDescription>
                Complete list of AI failure predictions and risk assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction) => (
                  <div key={prediction.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant="outline" 
                          className={`${getRiskColor(prediction.riskLevel)} flex items-center space-x-1`}
                        >
                          {getRiskIcon(prediction.riskLevel)}
                          <span className="capitalize">{prediction.riskLevel}</span>
                        </Badge>
                        <span className="font-medium">{prediction.partId}</span>
                        <span className="text-sm text-muted-foreground">{prediction.partType}</span>
                      </div>
                      <span className="text-sm font-medium">{prediction.confidence}% confidence</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{prediction.location}</p>
                    <p className="text-sm">{prediction.prediction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Vendor Quality Analysis</span>
              </CardTitle>
              <CardDescription>
                Quality trends and performance metrics by vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qualityTrends.map((trend) => (
                  <Card key={trend.vendor} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">{trend.vendor}</h4>
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center space-x-1 ${getTrendColor(trend.trend)}`}>
                            {getTrendIcon(trend.trend)}
                            <span className="text-sm font-medium capitalize">{trend.trend}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Defect Rate</p>
                          <p className="text-2xl font-bold text-accent">{trend.defectRate}%</p>
                          <Progress value={trend.defectRate} max={10} className="mt-2" />
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Total Parts Supplied</p>
                          <p className="text-2xl font-bold">{trend.totalParts.toLocaleString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Lifespan (years)</p>
                          <p className="text-2xl font-bold text-primary">{trend.avgLifespan}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-6">
          <Card className="industrial-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Anomaly Detection</span>
              </CardTitle>
              <CardDescription>
                Unusual patterns and outliers detected by AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-warning">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-medium">Batch Quality Anomaly</span>
                      <Badge variant="outline" className="text-warning border-warning">
                        Medium Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Batch EC-BATCH-2024-Q3-008 from Steel Forge Industries showing 15% higher failure rate than expected
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Detected: 3 hours ago • Confidence: 89%
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-accent rotate-180" />
                      <span className="font-medium">Installation Pattern Anomaly</span>
                      <Badge variant="outline" className="text-accent border-accent">
                        High Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Track Section B installations showing accelerated wear pattern, 40% faster than similar sections
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Detected: 1 day ago • Confidence: 94%
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="font-medium">Environmental Correlation</span>
                      <Badge variant="outline" className="text-primary border-primary">
                        Low Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Strong correlation detected between temperature fluctuations and rail pad degradation in coastal sections
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Detected: 2 days ago • Confidence: 76%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAnalytics;