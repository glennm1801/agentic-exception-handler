import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, FileText, Workflow, TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-workflow-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-enterprise-blue/10 rounded-lg flex items-center justify-center">
              <Workflow className="w-5 h-5 text-enterprise-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-workflow-primary">24</p>
              <p className="text-sm text-muted-foreground">Active Workflows</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-workflow-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-status-completed/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-status-completed" />
            </div>
            <div>
              <p className="text-2xl font-bold text-workflow-primary">156</p>
              <p className="text-sm text-muted-foreground">Completed Tasks</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-workflow-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-status-processing/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-status-processing" />
            </div>
            <div>
              <p className="text-2xl font-bold text-workflow-primary">8</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-workflow-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-status-error/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-status-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-workflow-primary">3</p>
              <p className="text-sm text-muted-foreground">Requires Attention</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-workflow-secondary">
          <h3 className="text-lg font-semibold text-workflow-primary mb-4">Recent Workflows</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-enterprise-blue/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-enterprise-blue" />
                </div>
                <div>
                  <p className="font-medium text-workflow-primary">Quantum Computing Analysis</p>
                  <p className="text-sm text-muted-foreground">Supply chain intelligence</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/20">
                Completed
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-enterprise-blue/10 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-enterprise-blue" />
                </div>
                <div>
                  <p className="font-medium text-workflow-primary">Biotechnology Risk Assessment</p>
                  <p className="text-sm text-muted-foreground">Healthcare sector analysis</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-status-processing/10 text-status-processing border-status-processing/20">
                Processing
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-enterprise-blue/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-enterprise-blue" />
                </div>
                <div>
                  <p className="font-medium text-workflow-primary">Market Intelligence Report</p>
                  <p className="text-sm text-muted-foreground">Competitive analysis</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending/20">
                Pending
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-workflow-secondary">
          <h3 className="text-lg font-semibold text-workflow-primary mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AI Agents Status</span>
              <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/20">
                Operational
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Document Processing</span>
              <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/20">
                Online
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Workflow Engine</span>
              <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/20">
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Analytics</span>
              <Badge variant="outline" className="bg-status-processing/10 text-status-processing border-status-processing/20">
                Processing
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border-workflow-secondary">
        <h3 className="text-lg font-semibold text-workflow-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-workflow-secondary rounded-lg hover:bg-background/50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-enterprise-blue/10 rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-enterprise-blue" />
            </div>
            <h4 className="font-medium text-workflow-primary mb-1">Upload New SOP</h4>
            <p className="text-sm text-muted-foreground">Create a new workflow from documentation</p>
          </div>
          
          <div className="p-4 border border-workflow-secondary rounded-lg hover:bg-background/50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-enterprise-blue/10 rounded-lg flex items-center justify-center mb-3">
              <Workflow className="w-5 h-5 text-enterprise-blue" />
            </div>
            <h4 className="font-medium text-workflow-primary mb-1">View All Workflows</h4>
            <p className="text-sm text-muted-foreground">Monitor and manage active processes</p>
          </div>
          
          <div className="p-4 border border-workflow-secondary rounded-lg hover:bg-background/50 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-enterprise-blue/10 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-enterprise-blue" />
            </div>
            <h4 className="font-medium text-workflow-primary mb-1">Analytics Dashboard</h4>
            <p className="text-sm text-muted-foreground">View performance insights and metrics</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;