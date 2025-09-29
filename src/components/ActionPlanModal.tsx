import { useState } from "react";
import { X, Brain, CheckCircle2, Clock, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  estimatedTime: string;
}

interface ActionPlanModalProps {
  step: WorkflowStep;
  isOpen: boolean;
  onClose: () => void;
  onExecute: () => void;
}

// Mock action plan data
const generateActionPlan = (step: WorkflowStep) => {
  const plans: Record<string, any> = {
    "step-1": {
      objective: "Collect and consolidate data from multiple enterprise systems",
      approach: "Multi-source data aggregation with validation checkpoints",
      actions: [
        {
          id: "action-1",
          title: "Connect to CRM System",
          description: "Establish secure connection to Salesforce CRM and extract customer records",
          estimatedDuration: "2 minutes",
          dependencies: [],
          risk: "low"
        },
        {
          id: "action-2", 
          title: "Query Database Systems",
          description: "Execute optimized queries across PostgreSQL and MongoDB instances",
          estimatedDuration: "2 minutes",
          dependencies: ["action-1"],
          risk: "medium"
        },
        {
          id: "action-3",
          title: "Validate Data Integrity",
          description: "Run comprehensive data quality checks and flag inconsistencies",
          estimatedDuration: "1 minute",
          dependencies: ["action-2"],
          risk: "low"
        }
      ],
      resources: ["Database Connections", "API Keys", "Validation Rules"],
      risks: ["Network latency", "API rate limits", "Data inconsistencies"]
    },
    "step-2": {
      objective: "Analyze collected data against business rules and compliance requirements",
      approach: "AI-powered analysis with rule-based validation and anomaly detection",
      actions: [
        {
          id: "action-1",
          title: "Apply Business Rules",
          description: "Execute configured business logic rules against the dataset",
          estimatedDuration: "3 minutes",
          dependencies: [],
          risk: "low"
        },
        {
          id: "action-2",
          title: "Anomaly Detection",
          description: "Use ML models to identify data patterns and outliers",
          estimatedDuration: "4 minutes", 
          dependencies: ["action-1"],
          risk: "medium"
        },
        {
          id: "action-3",
          title: "Compliance Check",
          description: "Verify data meets regulatory and internal compliance standards",
          estimatedDuration: "1 minute",
          dependencies: ["action-2"],
          risk: "high"
        }
      ],
      resources: ["ML Models", "Business Rules Engine", "Compliance Database"],
      risks: ["Model accuracy", "Rule conflicts", "Compliance violations"]
    },
    "step-3": {
      objective: "Generate comprehensive report with insights and actionable recommendations",
      approach: "Template-based report generation with dynamic content and visualizations",
      actions: [
        {
          id: "action-1",
          title: "Data Aggregation",
          description: "Consolidate analysis results into structured report format",
          estimatedDuration: "1 minute",
          dependencies: [],
          risk: "low"
        },
        {
          id: "action-2",
          title: "Generate Visualizations",
          description: "Create charts, graphs, and dashboards from processed data",
          estimatedDuration: "1.5 minutes",
          dependencies: ["action-1"], 
          risk: "low"
        },
        {
          id: "action-3",
          title: "Export & Distribution",
          description: "Format report in multiple formats and send to stakeholders",
          estimatedDuration: "0.5 minutes",
          dependencies: ["action-2"],
          risk: "low"
        }
      ],
      resources: ["Report Templates", "Chart Libraries", "Email Service"],
      risks: ["Template errors", "Export failures", "Delivery issues"]
    }
  };
  
  return plans[step.id] || plans["step-1"];
};

export const ActionPlanModal = ({ step, isOpen, onClose, onExecute }: ActionPlanModalProps) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const actionPlan = generateActionPlan(step);

  const handleExecute = () => {
    setIsExecuting(true);
    onExecute();
    setTimeout(() => {
      setIsExecuting(false);
      onClose();
    }, 1000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-status-error bg-status-error/10 border-status-error/20";
      case "medium": return "text-status-pending bg-status-pending/10 border-status-pending/20";
      default: return "text-status-completed bg-status-completed/10 border-status-completed/20";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-enterprise-blue" />
            <span>Agent Action Plan</span>
          </DialogTitle>
          <DialogDescription>
            Detailed execution plan for: <span className="font-semibold">{step.title}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Objective */}
          <Card className="border-enterprise-blue/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{actionPlan.objective}</p>
            </CardContent>
          </Card>

          {/* Approach */}
          <Card className="border-workflow-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{actionPlan.approach}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-workflow-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Planned Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actionPlan.actions.map((action: any, index: number) => (
                <div key={action.id} className="relative">
                  <div className="flex space-x-4 p-4 border border-workflow-secondary/50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-enterprise-blue text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-workflow-primary">{action.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getRiskColor(action.risk)}>
                            {action.risk} risk
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {action.estimatedDuration}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                      {action.dependencies.length > 0 && (
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>Depends on:</span>
                          <Badge variant="outline" className="text-xs">
                            Action {action.dependencies[0].split('-')[1]}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < actionPlan.actions.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources & Risks */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-workflow-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-status-completed">Required Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {actionPlan.resources.map((resource: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle2 className="w-3 h-3 text-status-completed" />
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-workflow-secondary">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-status-pending">Potential Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {actionPlan.risks.map((risk: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Clock className="w-3 h-3 text-status-pending" />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-workflow-secondary">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-enterprise-blue hover:bg-enterprise-blue-dark text-white"
            >
              {isExecuting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Execute Step
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};