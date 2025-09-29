import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onDocumentProcessed: (document: { name: string; content: string; steps: any[] }) => void;
}

export const DocumentUpload = ({ onDocumentProcessed }: DocumentUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "Document uploaded",
        description: `${file.name} ready for processing`,
      });
    }
  };

  const processDocument = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate document processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock processed workflow data
    const mockSteps = [
      {
        id: "step-1",
        title: "Start Process",
        description: "Initialize the data processing workflow",
        status: "pending",
        estimatedTime: "1 minute",
        type: "start",
        swimlane: "System"
      },
      {
        id: "step-2",
        title: "Data Collection",
        description: "Gather required information from multiple sources",
        status: "pending",
        estimatedTime: "5 minutes",
        type: "process",
        swimlane: "Data Team"
      },
      {
        id: "step-3", 
        title: "Quality Check",
        description: "Should we proceed with analysis based on data quality?",
        status: "pending",
        estimatedTime: "2 minutes",
        type: "decision",
        swimlane: "Quality Team"
      },
      {
        id: "step-4",
        title: "Analysis & Validation",
        description: "Analyze collected data and validate against business rules",
        status: "pending",
        estimatedTime: "8 minutes",
        type: "process",
        swimlane: "Analytics Team"
      },
      {
        id: "step-5",
        title: "Report Generation", 
        description: "Generate comprehensive report with findings and recommendations",
        status: "pending",
        estimatedTime: "3 minutes",
        type: "process",
        swimlane: "Reporting Team"
      },
      {
        id: "step-6",
        title: "Complete",
        description: "Workflow completed successfully",
        status: "pending",
        estimatedTime: "1 minute",
        type: "end",
        swimlane: "System"
      }
    ];

    const processedDoc = {
      name: uploadedFile.name,
      content: "Standard Operating Procedure for Data Processing Workflow",
      steps: mockSteps
    };

    onDocumentProcessed(processedDoc);
    setIsProcessing(false);
    
    toast({
      title: "Document processed successfully",
      description: "Workflow has been generated and is ready for review",
    });
  };

  return (
    <Card className="border-workflow-secondary bg-gradient-to-br from-background to-workflow-secondary/20">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-enterprise-blue/10 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-enterprise-blue" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-workflow-primary mb-2">
              Upload Scenario Document
            </h3>
            <p className="text-muted-foreground">
              Upload your Standard Operating Procedure (SOP) document to generate an AI-powered workflow
            </p>
          </div>

          <div className="space-y-4">
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-workflow-secondary rounded-lg p-8 transition-colors hover:border-enterprise-blue/50">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto w-10 h-10 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX, TXT up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-workflow-secondary/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-status-completed" />
                  <span className="text-sm font-medium">{uploadedFile.name}</span>
                </div>
                <Button
                  onClick={processDocument}
                  disabled={isProcessing}
                  className="bg-enterprise-blue hover:bg-enterprise-blue-dark text-white"
                >
                  {isProcessing ? "Processing..." : "Process Document"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};