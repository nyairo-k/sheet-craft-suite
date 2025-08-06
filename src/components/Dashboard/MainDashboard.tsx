import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Package, DollarSign, ClipboardList, TrendingUp } from "lucide-react";

interface MainDashboardProps {
  userRole: string;
  clients: any[];
  quotations: any[];
  invoices: any[];
  requisitions: any[];
  inventory: any[];
}

export function MainDashboard({ 
  userRole, 
  clients, 
  quotations, 
  invoices, 
  requisitions, 
  inventory 
}: MainDashboardProps) {
  const totalClients = clients.length;
  const totalQuotations = quotations.length;
  const pendingInvoices = invoices.filter(i => i.paymentStatus === "Pending").length;
  const pendingRequisitions = requisitions.filter(r => r.status === "Pending Approval").length;
  const lowStockItems = inventory.filter(item => item.currentStockLevel <= item.reorderLevel).length;

  const totalSalesValue = quotations.reduce((sum, q) => sum + parseFloat(q.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Morab Flow ERP</h2>
        <p className="text-muted-foreground">Medical Equipment Sales & Assembly Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(userRole === "Sales Rep" || userRole === "GM") && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClients}</div>
                <p className="text-xs text-muted-foreground">Active in CRM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quotations</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuotations}</div>
                <p className="text-xs text-muted-foreground">
                  KSh {totalSalesValue.toLocaleString()} total value
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {(userRole === "Finance" || userRole === "GM") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingInvoices}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>
        )}

        {(userRole === "Requester" || userRole === "GM" || userRole === "Finance") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requisitions</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequisitions}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        )}

        {(userRole === "Inventory" || userRole === "GM") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems}</div>
              <p className="text-xs text-muted-foreground">Need reordering</p>
            </CardContent>
          </Card>
        )}
      </div>

      {userRole === "GM" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Executive Summary
            </CardTitle>
            <CardDescription>
              Overall system performance and key metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{totalClients}</div>
                <div className="text-sm text-muted-foreground">Active Clients</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">
                  KSh {totalSalesValue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Sales Pipeline</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{pendingRequisitions}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{lowStockItems}</div>
                <div className="text-sm text-muted-foreground">Low Stock Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}