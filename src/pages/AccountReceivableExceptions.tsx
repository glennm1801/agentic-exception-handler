import { useState } from "react";
import { Eye, ArrowRight, FileText, ArrowLeft, CheckCircle, AlertCircle, Clock, Package, Receipt, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Mock data for document details
const getInvoiceDetails = (exception: Exception) => ({
  invoiceNumber: `INV-2024-${exception.id.padStart(4, '0')}`,
  invoiceDate: exception.receivedDate,
  dueDate: new Date(new Date(exception.receivedDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  amount: (Math.random() * 10000 + 1000).toFixed(2),
  currency: "USD",
  vendorName: exception.emailSender.split('@')[1]?.split('.')[0]?.toUpperCase() || "VENDOR",
  vendorAddress: "123 Business Street, Commerce City, CC 12345",
  lineItems: [
    { description: "Product/Service A", quantity: 5, unitPrice: 150.00, total: 750.00 },
    { description: "Product/Service B", quantity: 3, unitPrice: 200.00, total: 600.00 },
    { description: "Shipping & Handling", quantity: 1, unitPrice: 50.00, total: 50.00 },
  ],
  taxRate: 8.5,
  subtotal: 1400.00,
  tax: 119.00,
  total: 1519.00,
});

const getGoodsReceiptDetails = (exception: Exception) => ({
  grNumber: `GR-2024-${exception.id.padStart(4, '0')}`,
  receiptDate: exception.receivedDate,
  warehouseLocation: "Warehouse A - Bay 12",
  receivedBy: "John Smith",
  deliveryNote: `DN-${Math.floor(Math.random() * 100000)}`,
  carrier: "Express Logistics Inc.",
  items: [
    { itemCode: "SKU-001", description: "Product A", orderedQty: 5, receivedQty: 5, condition: "Good" },
    { itemCode: "SKU-002", description: "Product B", orderedQty: 3, receivedQty: 3, condition: "Good" },
  ],
  inspectionStatus: "Passed",
  notes: "All items received in good condition. No damage observed.",
});

const getPurchaseOrderDetails = (exception: Exception) => ({
  poNumber: `PO-2024-${exception.id.padStart(4, '0')}`,
  orderDate: new Date(new Date(exception.receivedDate).getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  expectedDelivery: exception.receivedDate,
  buyerName: "Accounts Payable Team",
  buyerEmail: "ap@company.com",
  vendorName: exception.emailSender.split('@')[1]?.split('.')[0]?.toUpperCase() || "VENDOR",
  vendorContact: exception.emailSender,
  paymentTerms: "Net 30",
  shippingMethod: "Standard Ground",
  items: [
    { itemCode: "SKU-001", description: "Product A", quantity: 5, unitPrice: 150.00, total: 750.00 },
    { itemCode: "SKU-002", description: "Product B", quantity: 3, unitPrice: 200.00, total: 600.00 },
  ],
  subtotal: 1350.00,
  shippingCost: 50.00,
  total: 1400.00,
  status: "Fulfilled",
});

export default function AccountReceivableExceptions() {
  const [data, setData] = useState<Exception[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Exception>("receivedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedException, setSelectedException] = useState<Exception | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewException, setViewException] = useState<Exception | null>(null);

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

  const handleViewDetails = (exception: Exception) => {
    setViewException(exception);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewException(null);
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
                      onClick={() => handleViewDetails(exception)}
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

      {/* View Details Modal with Tabs */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Document Details
            </DialogTitle>
          </DialogHeader>
          
          {viewException && (
            <div className="space-y-4">
              <Tabs defaultValue="invoice" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="invoice" className="gap-2">
                    <Receipt className="h-4 w-4" />
                    Invoice
                  </TabsTrigger>
                  <TabsTrigger value="goods-receipt" className="gap-2">
                    <Package className="h-4 w-4" />
                    Goods Receipt
                  </TabsTrigger>
                  <TabsTrigger value="purchase-order" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Purchase Order
                  </TabsTrigger>
                </TabsList>

                {/* Invoice Tab */}
                <TabsContent value="invoice" className="space-y-4 mt-4">
                  {(() => {
                    const invoice = getInvoiceDetails(viewException);
                    return (
                      <>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Receipt className="h-4 w-4" />
                              Invoice Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Invoice Number</span>
                                <p className="font-medium">{invoice.invoiceNumber}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Invoice Date</span>
                                <p className="font-medium">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Due Date</span>
                                <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Vendor</span>
                                <p className="font-medium">{invoice.vendorName}</p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Vendor Address</span>
                                <p className="font-medium">{invoice.vendorAddress}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Line Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Description</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead className="text-right">Unit Price</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {invoice.lineItems.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Separator className="my-4" />
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${invoice.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
                                <span>${invoice.tax.toFixed(2)}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${invoice.total.toFixed(2)} {invoice.currency}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })()}
                </TabsContent>

                {/* Goods Receipt Tab */}
                <TabsContent value="goods-receipt" className="space-y-4 mt-4">
                  {(() => {
                    const gr = getGoodsReceiptDetails(viewException);
                    return (
                      <>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              Receipt Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">GR Number</span>
                                <p className="font-medium">{gr.grNumber}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Receipt Date</span>
                                <p className="font-medium">{new Date(gr.receiptDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Delivery Note</span>
                                <p className="font-medium">{gr.deliveryNote}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Warehouse Location</span>
                                <p className="font-medium">{gr.warehouseLocation}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Received By</span>
                                <p className="font-medium">{gr.receivedBy}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Carrier</span>
                                <p className="font-medium">{gr.carrier}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Received Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item Code</TableHead>
                                  <TableHead>Description</TableHead>
                                  <TableHead className="text-right">Ordered Qty</TableHead>
                                  <TableHead className="text-right">Received Qty</TableHead>
                                  <TableHead>Condition</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {gr.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="font-mono">{item.itemCode}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">{item.orderedQty}</TableCell>
                                    <TableCell className="text-right">{item.receivedQty}</TableCell>
                                    <TableCell>
                                      <Badge variant={item.condition === "Good" ? "default" : "destructive"}>
                                        {item.condition}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Inspection Status</span>
                                <p className="mt-1">
                                  <Badge variant={gr.inspectionStatus === "Passed" ? "default" : "destructive"}>
                                    {gr.inspectionStatus}
                                  </Badge>
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Notes</span>
                                <p className="font-medium">{gr.notes}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })()}
                </TabsContent>

                {/* Purchase Order Tab */}
                <TabsContent value="purchase-order" className="space-y-4 mt-4">
                  {(() => {
                    const po = getPurchaseOrderDetails(viewException);
                    return (
                      <>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <ShoppingCart className="h-4 w-4" />
                              Order Information
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">PO Number</span>
                                <p className="font-medium">{po.poNumber}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Order Date</span>
                                <p className="font-medium">{new Date(po.orderDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Expected Delivery</span>
                                <p className="font-medium">{new Date(po.expectedDelivery).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Vendor</span>
                                <p className="font-medium">{po.vendorName}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Vendor Contact</span>
                                <p className="font-medium">{po.vendorContact}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status</span>
                                <p className="mt-1">
                                  <Badge variant="default">{po.status}</Badge>
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Buyer</span>
                                <p className="font-medium">{po.buyerName}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Payment Terms</span>
                                <p className="font-medium">{po.paymentTerms}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Shipping Method</span>
                                <p className="font-medium">{po.shippingMethod}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Order Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item Code</TableHead>
                                  <TableHead>Description</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead className="text-right">Unit Price</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {po.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="font-mono">{item.itemCode}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <Separator className="my-4" />
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${po.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>${po.shippingCost.toFixed(2)}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${po.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })()}
                </TabsContent>
              </Tabs>

              <Separator />

              {/* Return Button */}
              <div className="flex justify-end">
                <Button onClick={handleCloseViewModal} className="gap-2">
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