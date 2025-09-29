import { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Exception {
  id: string;
  emailSender: string;
  receivedDate: string;
  exceptionReason: string;
  status: "pending" | "reviewed" | "resolved";
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

export default function AccountReceivableExceptions() {
  const [data, setData] = useState<Exception[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Exception>("receivedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
    </div>
  );
}