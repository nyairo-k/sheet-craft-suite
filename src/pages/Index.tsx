import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Package, DollarSign, ClipboardList, TrendingUp, Building2 } from "lucide-react";
import { CRMDashboard } from "@/components/CRM/CRMDashboard";
import { MainDashboard } from "@/components/Dashboard/MainDashboard";
import { Sidebar } from "@/components/Layout/Sidebar";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [userRole, setUserRole] = useState("admin");
  
  // Sample data for demo
  const [clients, setClients] = useState([
    {
      id: "CL001",
      companyName: "Nairobi Medical Center",
      contactPerson: "Dr. Sarah Kimani",
      email: "sarah@nmc.co.ke",
      phone: "+254722123456",
      address: "Kilimani, Nairobi",
      industry: "Healthcare",
      status: "Active",
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "CL002", 
      companyName: "Mombasa General Hospital",
      contactPerson: "Dr. Ahmed Hassan",
      email: "ahmed@mgh.co.ke",
      phone: "+254733987654",
      address: "Nyali, Mombasa",
      industry: "Healthcare",
      status: "Active",
      createdAt: "2024-02-01T14:30:00Z"
    }
  ]);

  const [quotations, setQuotations] = useState([
    {
      id: "Q001",
      clientId: "CL001",
      totalAmount: "850000",
      status: "Approved",
      createdAt: "2024-03-01T09:00:00Z"
    },
    {
      id: "Q002",
      clientId: "CL002", 
      totalAmount: "1200000",
      status: "Pending",
      createdAt: "2024-03-15T11:00:00Z"
    }
  ]);

  const [invoices] = useState([
    {
      id: "INV001",
      clientId: "CL001",
      amount: "850000",
      status: "Paid",
      dueDate: "2024-03-30"
    }
  ]);

  const [requisitions] = useState([
    {
      id: "REQ001",
      requester: "John Doe",
      amount: "25000",
      status: "Pending Approval"
    }
  ]);

  const [inventory] = useState([
    {
      id: "ITM001",
      name: "X-Ray Machine",
      stock: 5,
      reorderLevel: 2
    }
  ]);

  const handleClientCreate = (client: any) => {
    setClients(prev => [...prev, client]);
  };

  const handleClientUpdate = (updatedClient: any) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "crm":
        return (
          <CRMDashboard
            clients={clients}
            quotations={quotations}
            onClientCreate={handleClientCreate}
            onClientUpdate={handleClientUpdate}
          />
        );
      case "dashboard":
        return (
          <MainDashboard 
            userRole={userRole}
            clients={clients}
            quotations={quotations}
            invoices={invoices}
            requisitions={requisitions}
            inventory={inventory}
          />
        );
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Module</h2>
              <p className="text-muted-foreground">This module is planned for future implementation</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Module coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        userRole={userRole}
      />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Morab Flow ERP System</h1>
              <p className="text-muted-foreground">Medical Equipment Sales & Assembly Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={userRole} 
                onChange={(e) => setUserRole(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="admin">Admin</option>
                <option value="sales">Sales Rep</option>
                <option value="gm">General Manager</option>
                <option value="inventory">Inventory Manager</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;