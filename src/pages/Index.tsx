import { useState } from "react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { WorkflowVisualization } from "@/components/WorkflowVisualization";
import { StepManagement } from "@/components/StepManagement";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, FileText, Workflow } from "lucide-react";

interface ProcessedDocument {
  name: string;
  content: string;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    status: "pending" | "processing" | "completed" | "error";
    estimatedTime: string;
    type: "start" | "process" | "decision" | "end";
    swimlane?: string;
  }>;
}

const Index = () => {
  const [processedDoc, setProcessedDoc] = useState<ProcessedDocument | null>(null);
  const [workflowAccepted, setWorkflowAccepted] = useState(false);

  const handleDocumentProcessed = (document: ProcessedDocument) => {
    setProcessedDoc(document);
  };

  const handleWorkflowAccepted = () => {
    setWorkflowAccepted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-workflow">
      {/* Header */}
      <header className="border-b border-workflow-secondary bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-enterprise-blue rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-workflow-primary">AgentFlow</h1>
                <p className="text-xs text-muted-foreground">Enterprise Agentic Workflows</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-enterprise-blue/10 text-enterprise-blue border-enterprise-blue/20">
                AI-Powered
              </Badge>
              <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/20">
                Enterprise Ready
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className={`flex items-center space-x-2 ${!processedDoc ? 'text-enterprise-blue' : 'text-status-completed'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${!processedDoc ? 'bg-enterprise-blue text-white' : 'bg-status-completed text-white'}`}>
              <FileText className="w-3 h-3" />
            </div>
            <span className="font-medium">Upload Document</span>
          </div>
          
          <Separator orientation="horizontal" className="w-12" />
          
          <div className={`flex items-center space-x-2 ${processedDoc && !workflowAccepted ? 'text-enterprise-blue' : processedDoc && workflowAccepted ? 'text-status-completed' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${processedDoc && !workflowAccepted ? 'bg-enterprise-blue text-white' : processedDoc && workflowAccepted ? 'bg-status-completed text-white' : 'bg-muted border'}`}>
              <Workflow className="w-3 h-3" />
            </div>
            <span className="font-medium">Review Workflow</span>
          </div>
          
          <Separator orientation="horizontal" className="w-12" />
          
          <div className={`flex items-center space-x-2 ${workflowAccepted ? 'text-enterprise-blue' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${workflowAccepted ? 'bg-enterprise-blue text-white' : 'bg-muted border'}`}>
              <Bot className="w-3 h-3" />
            </div>
            <span className="font-medium">Execute Steps</span>
          </div>
        </div>

        {/* Main Content */}
        {!processedDoc ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-workflow-primary mb-4">
                Transform Your SOPs into AI Workflows
              </h2>
              <p className="text-lg text-muted-foreground">
                Upload your Standard Operating Procedures and let our AI agents create intelligent, 
                automated workflows that execute complex business processes with precision.
              </p>
            </div>
            <DocumentUpload onDocumentProcessed={handleDocumentProcessed} />
          </div>
        ) : !workflowAccepted ? (
          <div className="max-w-4xl mx-auto">
            <WorkflowVisualization
              steps={processedDoc.steps}
              documentName={processedDoc.name}
              onAcceptWorkflow={handleWorkflowAccepted}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <StepManagement
              steps={processedDoc.steps}
              documentName={processedDoc.name}
            />
          </div>
        )}

        {/* Features Section */}
        {!processedDoc && (
          <div className="max-w-4xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-workflow-secondary rounded-lg bg-background/50">
                <div className="w-12 h-12 bg-enterprise-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-enterprise-blue" />
                </div>
                <h3 className="font-semibold text-workflow-primary mb-2">Document Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Upload SOPs in multiple formats and let AI extract actionable workflow steps
                </p>
              </div>
              
              <div className="text-center p-6 border border-workflow-secondary rounded-lg bg-background/50">
                <div className="w-12 h-12 bg-enterprise-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Workflow className="w-6 h-6 text-enterprise-blue" />
                </div>
                <h3 className="font-semibold text-workflow-primary mb-2">Visual Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  See your processes as interactive visual workflows with clear dependencies
                </p>
              </div>
              
              <div className="text-center p-6 border border-workflow-secondary rounded-lg bg-background/50">
                <div className="w-12 h-12 bg-enterprise-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-enterprise-blue" />
                </div>
                <h3 className="font-semibold text-workflow-primary mb-2">AI Execution</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent agents execute each step with detailed planning and monitoring
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;