import { useState } from "react";
import { Eye, Play, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionPlanModal } from "./ActionPlanModal";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  estimatedTime: string;
}

interface StepManagementProps {
  steps: WorkflowStep[];
  documentName: string;
}

export const StepManagement = ({ steps, documentName }: StepManagementProps) => {
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [stepStatuses, setStepStatuses] = useState<Record<string, string>>(
    Object.fromEntries(steps.map(step => [step.id, step.status]))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-status-completed" />;
      case "processing": return <Clock className="w-4 h-4 text-status-processing animate-spin" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-status-error" />;
      default: return <Clock className="w-4 h-4 text-status-pending" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-status-pending/10 text-status-pending border-status-pending/20",
      processing: "bg-status-processing/10 text-status-processing border-status-processing/20", 
      completed: "bg-status-completed/10 text-status-completed border-status-completed/20",
      error: "bg-status-error/10 text-status-error border-status-error/20"
    };
    
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles] || styles.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleViewPlan = (step: WorkflowStep) => {
    setSelectedStep(step);
  };

  const handleExecuteStep = (stepId: string) => {
    setStepStatuses(prev => ({ ...prev, [stepId]: "processing" }));
    
    // Simulate step execution
    setTimeout(() => {
      setStepStatuses(prev => ({ ...prev, [stepId]: "completed" }));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-workflow-secondary">
        <CardHeader className="bg-gradient-to-r from-workflow-secondary/30 to-enterprise-blue/10">
          <CardTitle className="text-workflow-primary">Workflow Execution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Document: <span className="font-medium">{documentName}</span>
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="rounded-lg border border-workflow-secondary overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-workflow-secondary/30">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Step</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Est. Time</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {steps.map((step, index) => {
                  const currentStatus = stepStatuses[step.id];
                  return (
                    <TableRow key={step.id} className="hover:bg-workflow-secondary/20">
                      <TableCell className="font-medium">
                        <div className="w-6 h-6 bg-enterprise-blue text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(currentStatus)}
                          <span className="font-medium">{step.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs">
                        {step.description}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(currentStatus)}
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {step.estimatedTime}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPlan(step)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Plan
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleExecuteStep(step.id)}
                            disabled={currentStatus === "processing" || currentStatus === "completed"}
                            className="bg-enterprise-blue hover:bg-enterprise-blue-dark text-white disabled:opacity-50"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Execute
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedStep && (
        <ActionPlanModal
          step={selectedStep}
          isOpen={!!selectedStep}
          onClose={() => setSelectedStep(null)}
          onExecute={() => handleExecuteStep(selectedStep.id)}
        />
      )}
    </div>
  );
};