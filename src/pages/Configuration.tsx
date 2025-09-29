import { useState } from "react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { WorkflowVisualization } from "@/components/WorkflowVisualization";
import { StepManagement } from "@/components/StepManagement";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Workflow, Bot, Database, Plug, Globe } from "lucide-react";

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

const Configuration = () => {
  const [processedDoc, setProcessedDoc] = useState<ProcessedDocument | null>(null);
  const [workflowAccepted, setWorkflowAccepted] = useState(false);

  const handleDocumentProcessed = (document: ProcessedDocument) => {
    setProcessedDoc(document);
  };

  const handleWorkflowAccepted = () => {
    setWorkflowAccepted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-workflow-secondary pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-workflow-primary">Configuration</h1>
            <p className="text-muted-foreground">Configure system connections and workflow settings</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-enterprise-blue/10 text-enterprise-blue border-enterprise-blue/20">
              Enterprise Ready
            </Badge>
          </div>
        </div>
      </div>

      {/* Configuration Tabs */}
      <Tabs defaultValue="auth-config" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="auth-config" className="flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>Authentication</span>
          </TabsTrigger>
          <TabsTrigger value="sap-connection" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>SAP Connection</span>
          </TabsTrigger>
          <TabsTrigger value="api-settings" className="flex items-center space-x-2">
            <Plug className="h-4 w-4" />
            <span>API Settings</span>
          </TabsTrigger>
          <TabsTrigger value="workflow-config" className="flex items-center space-x-2">
            <Workflow className="h-4 w-4" />
            <span>Workflow Config</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth-config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-enterprise-blue" />
                <span>AWS Cognito Authentication</span>
              </CardTitle>
              <CardDescription>
                Configure AWS Cognito settings for user authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-2">Environment Variables Required</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Add these environment variables to your <code className="bg-muted px-1 py-0.5 rounded text-xs">.env</code> file:
                </p>
                <div className="space-y-2 font-mono text-xs bg-background p-3 rounded border">
                  <div>VITE_AWS_REGION=us-east-1</div>
                  <div>VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX</div>
                  <div>VITE_AWS_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aws-region">AWS Region</Label>
                  <Input 
                    id="aws-region" 
                    placeholder="us-east-1" 
                    value={import.meta.env.VITE_AWS_REGION || ''}
                    readOnly
                    className="w-full bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Current region from environment variables</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-pool-id">User Pool ID</Label>
                  <Input 
                    id="user-pool-id" 
                    placeholder="us-east-1_XXXXXXXXX" 
                    value={import.meta.env.VITE_AWS_USER_POOL_ID || ''}
                    readOnly
                    className="w-full bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Current User Pool ID from environment variables</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-pool-client-id">User Pool Client ID</Label>
                  <Input 
                    id="user-pool-client-id" 
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxx" 
                    value={import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || ''}
                    readOnly
                    className="w-full bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground">Current Client ID from environment variables</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Setup Instructions</h4>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Create an AWS Cognito User Pool in your AWS Console</li>
                  <li>Create a User Pool Client (App Client) with appropriate settings</li>
                  <li>Copy the User Pool ID and Client ID to your environment variables</li>
                  <li>Restart the development server after updating environment variables</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sap-connection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-enterprise-blue" />
                <span>SAP System Connection</span>
              </CardTitle>
              <CardDescription>
                Configure your SAP system connection parameters for seamless integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sap-url">SAP System URL</Label>
                  <Input 
                    id="sap-url" 
                    placeholder="https://sap-server.company.com" 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sap-port">Port Number</Label>
                  <Input 
                    id="sap-port" 
                    type="number" 
                    placeholder="8000" 
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sap-username">Username</Label>
                  <Input 
                    id="sap-username" 
                    placeholder="Enter your SAP username" 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sap-password">Password</Label>
                  <Input 
                    id="sap-password" 
                    type="password" 
                    placeholder="Enter your SAP password" 
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sap-client">Client</Label>
                  <Input 
                    id="sap-client" 
                    placeholder="100" 
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sap-language">Language</Label>
                  <Input 
                    id="sap-language" 
                    placeholder="EN" 
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Plug className="h-4 w-4" />
                  <span>Test Connection</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Save Configuration</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure API endpoints and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">API settings configuration will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow-config" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Configuration</CardTitle>
              <CardDescription>
                Set default workflow parameters and execution settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Workflow configuration settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general application preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">General settings will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuration;