import { useState, useCallback } from "react";
import { CheckCircle, Play, Diamond, Circle, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "completed" | "error";
  estimatedTime: string;
  type: "start" | "process" | "decision" | "end";
  swimlane?: string;
}

interface WorkflowVisualizationProps {
  steps: WorkflowStep[];
  documentName: string;
  onAcceptWorkflow: () => void;
}

// Custom node components
const ProcessNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 bg-white border-2 border-workflow-secondary rounded-lg shadow-sm min-w-[200px]">
    <div className="flex items-center gap-2 mb-1">
      <Square className="w-4 h-4 text-enterprise-blue" />
      <span className="font-medium text-sm">{data.title}</span>
    </div>
    <p className="text-xs text-muted-foreground mb-2">{data.description}</p>
    <div className="flex items-center gap-2">
      <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
      <span className="text-xs text-muted-foreground">{data.estimatedTime}</span>
    </div>
  </div>
);

const DecisionNode = ({ data }: { data: any }) => (
  <div className="px-4 py-2 bg-white border-2 border-workflow-secondary rounded-lg shadow-sm transform rotate-45 min-w-[150px] min-h-[150px] flex items-center justify-center">
    <div className="transform -rotate-45 text-center">
      <div className="flex items-center gap-1 justify-center mb-1">
        <Diamond className="w-4 h-4 text-enterprise-blue" />
        <span className="font-medium text-sm">{data.title}</span>
      </div>
      <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
    </div>
  </div>
);

const StartEndNode = ({ data }: { data: any }) => (
  <div className="px-6 py-3 bg-enterprise-blue text-white rounded-full shadow-sm min-w-[120px] text-center">
    <div className="flex items-center gap-2 justify-center">
      <Circle className="w-4 h-4" />
      <span className="font-medium text-sm">{data.title}</span>
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  process: ProcessNode,
  decision: DecisionNode,
  startEnd: StartEndNode,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-status-completed text-white";
    case "processing": return "bg-status-processing text-white";
    case "error": return "bg-status-error text-white";
    default: return "bg-status-pending text-black";
  }
};

export const WorkflowVisualization = ({ steps, documentName, onAcceptWorkflow }: WorkflowVisualizationProps) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    onAcceptWorkflow();
  };

  // Convert steps to React Flow nodes and edges
  const initialNodes: Node[] = steps.map((step, index) => ({
    id: step.id,
    type: step.type === 'start' || step.type === 'end' ? 'startEnd' : step.type,
    position: { x: 300, y: index * 150 + 50 },
    data: { 
      ...step,
    },
  }));

  const initialEdges: Edge[] = steps.slice(0, -1).map((step, index) => ({
    id: `e${step.id}-${steps[index + 1].id}`,
    source: step.id,
    target: steps[index + 1].id,
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--workflow-secondary))' },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: any, node: Node) => {
    if (isAccepted) {
      // Handle node click for execution
      console.log('Node clicked:', node);
    }
  }, [isAccepted]);

  return (
    <Card className="border-workflow-secondary">
      <CardHeader className="bg-gradient-to-r from-workflow-secondary/30 to-enterprise-blue/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-workflow-primary">Generated Workflow Diagram</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Based on: <span className="font-medium">{documentName}</span>
            </p>
          </div>
          {!isAccepted && (
            <Button 
              onClick={handleAccept}
              className="bg-enterprise-blue hover:bg-enterprise-blue-dark text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept Workflow
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-[600px] bg-gray-50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {isAccepted && (
          <div className="m-6 p-4 bg-status-completed/10 border border-status-completed/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-status-completed" />
              <span className="font-medium text-status-completed">Workflow Accepted</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Click on nodes to view details and execute steps
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};