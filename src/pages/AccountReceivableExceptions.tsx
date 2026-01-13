import { useState } from "react";
import { Eye, ArrowRight, FileText, ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface Exception {
  id: string;
  emailSender: string;
  receivedDate: string;
  exceptionReason: string;
  status: "pending" | "reviewed" | "resolved";
}

interface ProcessingStep {
  step: number;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress" | "pending";
}

const mockData: Exception[] = [
  {
    id: "1",
    emailSender: "vendor@supplier.com",
    receivedDate: "2024-01-15",
    exceptionReason: "Invoice amount mismatch",
    status: "pending"
  },
  {
    id: "2", 
    emailSender: "billing@company.com",
    receivedDate: "2024-01-14",
    exceptionReason: "Missing purchase order number",
    status: "reviewed"
  },
  {
    id: "3",
    emailSender: "finance@client.com", 
    receivedDate: "2024-01-13",
    exceptionReason: "Duplicate payment request",
    status: "resolved"
  },
  {
    id: "4",
    emailSender: "accounts@vendor.com",
    receivedDate: "2024-01-12", 
    exceptionReason: "Invalid account number",
    status: "pending"
  },
  {
    id: "5",
    emailSender: "support@supplier.com",
    receivedDate: "2024-01-11",
    exceptionReason: "Payment terms discrepancy",
    status: "reviewed"
  }
];

const getProcessingSteps = (exception: Exception): ProcessingStep[] => {
  const baseSteps: ProcessingStep[] = [
    {
      step: 1,
      title: "Exception Detected",
      description: `Email received from ${exception.emailSender} was flagged for review due to: ${exception.exceptionReason}`,
      timestamp: exception.receivedDate + " 09:15 AM",
      status: "completed"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Automated AI system analyzed the exception and extracted relevant data points from the email content.",
      timestamp: exception.receivedDate + " 09:16 AM",
      status: "completed"
    },
    {
      step: 3,
      title: "Data Validation",
      description: "Cross-referenced invoice details with existing records in the accounting system.",
      timestamp: exception.receivedDate + " 09:18 AM",
      status: exception.status === "pending" ? "in-progress" : "completed"
    },
    {
      step: 4,
      title: "Review Assignment",
      description: "Exception assigned to accounts receivable team for manual review.",
      timestamp: exception.receivedDate + " 09:20 AM",
      status: exception.status === "pending" ? "pending" : exception.status === "reviewed" ? "in-progress" : "completed"
    },
    {
      step: 5,
      title: "Resolution",
      description: "Final resolution applied and records updated accordingly.",
      timestamp: exception.receivedDate + " 10:30 AM",
      status: exception.status === "resolved" ? "completed" : "pending"
    }
  ];
  return baseSteps;
};

export default function AccountReceivableExceptions() {
  const [data, setData] = useState<Exception[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Exception>("receivedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedException, setSelectedException] = useState<Exception | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredData = data
    .filter((item) => {
      const matchesSearch = item.emailSender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.exceptionReason.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: keyof Exception) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for exception:", id);
  };

  const handleViewProcessingDetails = (exception: Exception) => {
    setSelectedException(exception);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedException(null);
  };

  const handleTriggerAction = (id: string) => {
    console.log("Trigger action for exception:", id);
    // Update status to reviewed for demo
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, status: "reviewed" as const } : item
    ));
  };

  const getStatusBadge = (status: Exception["status"]) => {
    const variants = {
      pending: "destructive",
      reviewed: "secondary", 
      resolved: "default"
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getStepIcon = (status: ProcessingStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Account Receivable Exceptions</h1>
          <p className="text-muted-foreground">
            Manage and review account receivable exceptions and discrepancies
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by email or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Exceptions ({filteredData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("emailSender")}
                >
                  Email Sender
                  {sortField === "emailSender" && (
                    <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("receivedDate")}
                >
                  Received Date
                  {sortField === "receivedDate" && (
                    <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort("exceptionReason")}
                >
                  Exception Reason
                  {sortField === "exceptionReason" && (
                    <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">View</TableHead>
                <TableHead className="text-center">Details</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((exception) => (
                <TableRow key={exception.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{exception.emailSender}</TableCell>
                  <TableCell>
                    {new Date(exception.receivedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{exception.exceptionReason}</TableCell>
                  <TableCell>{getStatusBadge(exception.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(exception.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProcessingDetails(exception)}
                      className="h-8 w-8 p-0"
                      title="View Processing Details"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      onClick={() => handleTriggerAction(exception.id)}
                      className="h-8 bg-green-600 hover:bg-green-700 text-white"
                      disabled={exception.status === "resolved"}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Processing Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Exception Processing Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedException && (
            <div className="space-y-6">
              {/* Exception Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Exception Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email Sender:</span>
                      <p className="font-medium">{selectedException.emailSender}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Received Date:</span>
                      <p className="font-medium">{new Date(selectedException.receivedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exception Reason:</span>
                      <p className="font-medium">{selectedException.exceptionReason}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Status:</span>
                      <p className="mt-1">{getStatusBadge(selectedException.status)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Processing Steps Timeline */}
              <div>
                <h4 className="font-semibold mb-4">Processing Timeline</h4>
                <div className="space-y-4">
                  {getProcessingSteps(selectedException).map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {getStepIcon(step.status)}
                        {index < 4 && (
                          <div className={`w-0.5 h-full mt-2 ${
                            step.status === "completed" ? "bg-green-500" : "bg-muted"
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">{step.title}</h5>
                          <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        <Badge 
                          variant={step.status === "completed" ? "default" : step.status === "in-progress" ? "secondary" : "outline"}
                          className="mt-2"
                        >
                          {step.status === "completed" ? "Completed" : step.status === "in-progress" ? "In Progress" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Return Button */}
              <div className="flex justify-end">
                <Button onClick={handleCloseDetails} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Exceptions
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
