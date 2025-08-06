import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Package, DollarSign, ClipboardList, TrendingUp } from "lucide-react";

// Simplified Index page with working components
const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Morab Flow ERP System</h1>
          <p className="text-muted-foreground">Medical Equipment Sales & Assembly Management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CRM Module</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready</div>
              <p className="text-xs text-muted-foreground">Client management system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales Module</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">Quotations & invoices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Planned</div>
              <p className="text-xs text-muted-foreground">Stock & dispatch tracking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requisitions</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Planned</div>
              <p className="text-xs text-muted-foreground">Approval workflow system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Finance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">Payment processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Planned</div>
              <p className="text-xs text-muted-foreground">Analytics dashboard</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>🎉 ERP System Design Complete!</CardTitle>
            <CardDescription>
              Your comprehensive multi-departmental ERP system architecture has been designed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">✅ Completed Components:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Enhanced Sidebar with role-based navigation</li>
                  <li>• CRM Dashboard with client management</li>
                  <li>• Client Forms with validation</li>
                  <li>• Main Dashboard with executive overview</li>
                  <li>• Google Sheets integration foundation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-secondary mb-2">🏗️ Architecture Designed:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Complete Requisitions workflow</li>
                  <li>• Advanced Inventory & Dispatch system</li>
                  <li>• Enhanced Sales with client integration</li>
                  <li>• Executive Reports dashboard</li>
                  <li>• Role-based access control</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Next Steps:</h4>
              <p className="text-sm text-muted-foreground">
                The ERP foundation is ready! You can now incrementally build each module 
                (Requisitions, Inventory, Reports) using the established patterns and 
                Google Sheets integration. Each component follows the same structure 
                for consistency and maintainability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;