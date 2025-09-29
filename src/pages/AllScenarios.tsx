import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ScenarioStats {
  totalExceptions: number;
  autoProcessed: number;
  waitingProcessing: number;
  errorRate: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  lastUpdated: string;
  stats: ScenarioStats;
}

const mockScenarios: Scenario[] = [
  {
    id: "1",
    name: "Account Receivable Exceptions",
    description: "Automated processing of payment discrepancies and invoice exceptions",
    status: "active",
    lastUpdated: "2024-01-15",
    stats: {
      totalExceptions: 1247,
      autoProcessed: 892,
      waitingProcessing: 234,
      errorRate: 9.7
    }
  },
  {
    id: "2", 
    name: "Inventory Reconciliation",
    description: "Cross-platform inventory matching and discrepancy resolution",
    status: "active",
    lastUpdated: "2024-01-14",
    stats: {
      totalExceptions: 567,
      autoProcessed: 445,
      waitingProcessing: 89,
      errorRate: 5.8
    }
  },
  {
    id: "3",
    name: "Purchase Order Validation",
    description: "Automated validation of PO terms and compliance checking",
    status: "draft",
    lastUpdated: "2024-01-12",
    stats: {
      totalExceptions: 89,
      autoProcessed: 23,
      waitingProcessing: 56,
      errorRate: 11.2
    }
  },
  {
    id: "4",
    name: "Vendor Compliance Monitor",
    description: "Real-time monitoring of vendor SLA compliance and performance",
    status: "inactive",
    lastUpdated: "2024-01-10",
    stats: {
      totalExceptions: 342,
      autoProcessed: 298,
      waitingProcessing: 12,
      errorRate: 9.4
    }
  },
  {
    id: "5",
    name: "Currency Exchange Validation",
    description: "Multi-currency transaction validation and rate verification",
    status: "active",
    lastUpdated: "2024-01-16",
    stats: {
      totalExceptions: 756,
      autoProcessed: 623,
      waitingProcessing: 98,
      errorRate: 4.6
    }
  },
  {
    id: "6",
    name: "Trade Document Processing",
    description: "Automated processing of bills of lading, customs forms, and shipping documents",
    status: "active",
    lastUpdated: "2024-01-15",
    stats: {
      totalExceptions: 934,
      autoProcessed: 812,
      waitingProcessing: 87,
      errorRate: 3.7
    }
  }
];

const getStatusBadgeProps = (status: Scenario["status"]) => {
  switch (status) {
    case "active":
      return { variant: "default" as const, className: "bg-status-completed text-white" };
    case "inactive":
      return { variant: "secondary" as const, className: "bg-muted text-muted-foreground" };
    case "draft":
      return { variant: "outline" as const, className: "border-status-pending text-status-pending" };
    default:
      return { variant: "secondary" as const };
  }
};

const StatCard = ({ icon: Icon, label, value, trend }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  trend?: "up" | "down" | "neutral" 
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
    <div className="p-2 rounded-full bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground truncate">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

export default function AllScenarios() {
  const navigate = useNavigate();

  const handleViewDetails = (scenarioId: string) => {
    if (scenarioId === "1") { // Account Receivable Exceptions
      navigate("/scenarios/account-receivable-exceptions");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Scenarios</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your automated workflow scenarios
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Create New Scenario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockScenarios.map((scenario) => (
          <Card key={scenario.id} className="group hover:shadow-lg transition-all duration-200 border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-card-foreground truncate">
                    {scenario.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {scenario.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Badge {...getStatusBadgeProps(scenario.status)}>
                    {scenario.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  icon={Activity}
                  label="Total Exceptions"
                  value={scenario.stats.totalExceptions.toLocaleString()}
                />
                <StatCard
                  icon={CheckCircle}
                  label="Auto Processed"
                  value={scenario.stats.autoProcessed.toLocaleString()}
                />
                <StatCard
                  icon={Clock}
                  label="Waiting Processing"
                  value={scenario.stats.waitingProcessing.toLocaleString()}
                />
                <StatCard
                  icon={AlertTriangle}
                  label="Error Rate"
                  value={`${scenario.stats.errorRate}%`}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Updated {new Date(scenario.lastUpdated).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    Configure
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={() => handleViewDetails(scenario.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}