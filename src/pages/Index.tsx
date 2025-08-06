import { useState, useEffect } from "react";
import { LoginScreen } from "@/components/Auth/LoginScreen";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";

// Dashboard Components
import { MainDashboard } from "@/components/Dashboard/MainDashboard";
import { SalesDashboard } from "@/components/Dashboard/SalesDashboard";
import { FinanceDashboard } from "@/components/Dashboard/FinanceDashboard";

// CRM Components
import { CRMDashboard } from "@/components/CRM/CRMDashboard";

// Sales Components (Updated)
import { QuotationForm } from "@/components/Sales/QuotationForm";
import { InvoiceRequestForm } from "@/components/Sales/InvoiceRequestForm";
import { QuotationsList } from "@/components/Sales/QuotationsList";
import { InvoicesList } from "@/components/Sales/InvoicesList";

// Requisitions Components
import { RequisitionsDashboard } from "@/components/Requisitions/RequisitionsDashboard";

// Inventory Components
import { InventoryDashboard } from "@/components/Inventory/InventoryDashboard";

// Finance Components
import { PendingInvoices } from "@/components/Finance/PendingInvoices";
import { PaymentStatus } from "@/components/Finance/PaymentStatus";

// Reports Components
import { ReportsDashboard } from "@/components/Reports/ReportsDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", role: "" });
  const [activeSection, setActiveSection] = useState("dashboard");
  
  // Data States
  const [clients, setClients] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [requisitions, setRequisitions] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [outsourcedItems, setOutsourcedItems] = useState<any[]>([]);

  const handleLogin = (role: string, username: string) => {
    setCurrentUser({ name: username, role });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ name: "", role: "" });
  };

  // Google Sheets Integration
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzleToSqw6zAX25KWZ0UnLE4lmiIe2UMNgNAqoFQACx4kwYTSTF9fGx-JgjEG6mk0Ah/exec";

  const sendToGoogleSheets = async (data: any) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      throw error;
    }
  };

  // CRM Handlers
  const handleClientCreate = async (client: any) => {
    try {
      await sendToGoogleSheets({
        type: "client",
        ...client
      });
      setClients(prev => [...prev, client]);
    } catch (error) {
      console.error('Failed to create client:', error);
      throw error;
    }
  };

  const handleClientUpdate = async (client: any) => {
    try {
      await sendToGoogleSheets({
        type: "client_update",
        ...client
      });
      setClients(prev => prev.map(c => c.id === client.id ? client : c));
    } catch (error) {
      console.error('Failed to update client:', error);
      throw error;
    }
  };

  // Sales Handlers
  const handleQuotationSubmit = async (quotation: any) => {
    try {
      const payload = {
        type: "quotation",
        quoteId: quotation.id,
        clientId: quotation.clientId,
        clientName: quotation.clientName,
        items: quotation.items,
        totalAmount: quotation.totalAmount,
        salesRep: currentUser.name
      };

      await sendToGoogleSheets(payload);
      setQuotations(prev => [...prev, quotation]);
    } catch (error) {
      console.error('Failed to submit quotation:', error);
      throw error;
    }
  };

  const handleInvoiceSubmit = async (invoice: any) => {
    try {
      const payload = {
        type: "invoice",
        invoiceId: invoice.id,
        quoteId: invoice.quoteId,
        clientId: invoice.clientId,
        clientName: invoice.clientName,
        items: invoice.items,
        totalAmount: invoice.totalAmount,
        status: "Pending"
      };

      await sendToGoogleSheets(payload);
      setInvoices(prev => [...prev, invoice]);
    } catch (error) {
      console.error('Failed to submit invoice:', error);
      throw error;
    }
  };

  // Requisitions Handlers
  const handleRequisitionCreate = async (requisition: any) => {
    try {
      await sendToGoogleSheets({
        type: "requisition",
        ...requisition,
        requesterName: currentUser.name
      });
      setRequisitions(prev => [...prev, requisition]);
    } catch (error) {
      console.error('Failed to create requisition:', error);
      throw error;
    }
  };

  // Inventory Handlers
  const handleInventoryUpdate = async (item: any) => {
    try {
      await sendToGoogleSheets({
        type: "inventory_update",
        ...item
      });
      setInventory(prev => prev.map(i => i.id === item.id ? item : i));
    } catch (error) {
      console.error('Failed to update inventory:', error);
      throw error;
    }
  };

  // Render current section based on user role and active section
  const renderCurrentSection = () => {
    const { role } = currentUser;

    switch (activeSection) {
      case "dashboard":
        return (
          <MainDashboard
            userRole={role}
            clients={clients}
            quotations={quotations}
            invoices={invoices}
            requisitions={requisitions}
            inventory={inventory}
          />
        );

      case "crm":
        if (role === "Sales Rep" || role === "GM") {
          return (
            <CRMDashboard
              clients={clients}
              quotations={quotations}
              onClientCreate={handleClientCreate}
              onClientUpdate={handleClientUpdate}
            />
          );
        }
        break;

      case "sales":
        if (role === "Sales Rep" || role === "GM") {
          return <SalesDashboard quotations={quotations} invoices={invoices} />;
        }
        break;

      case "quotes":
        if (role === "Sales Rep" || role === "GM") {
          return <QuotationForm onSubmit={handleQuotationSubmit} clients={clients} />;
        }
        break;

      case "invoices":
        if (role === "Sales Rep" || role === "GM") {
          return <InvoiceRequestForm onSubmit={handleInvoiceSubmit} quotations={quotations} />;
        }
        break;

      case "requisitions":
        if (["Requester", "GM", "Finance"].includes(role)) {
          return (
            <RequisitionsDashboard
              userRole={role}
              requisitions={requisitions}
              onRequisitionCreate={handleRequisitionCreate}
            />
          );
        }
        break;

      case "inventory":
        if (role === "Inventory" || role === "GM") {
          return (
            <InventoryDashboard
              inventory={inventory}
              suppliers={suppliers}
              invoices={invoices}
              onInventoryUpdate={handleInventoryUpdate}
            />
          );
        }
        break;

      case "finance":
        if (role === "Finance" || role === "GM") {
          return <FinanceDashboard invoices={invoices} />;
        }
        break;

      case "pending-invoices":
        if (role === "Finance" || role === "GM") {
          return <PendingInvoices invoices={invoices} />;
        }
        break;

      case "payments":
        if (role === "Finance" || role === "GM") {
          return <PaymentStatus invoices={invoices} />;
        }
        break;

      case "reports":
        if (role === "GM") {
          return (
            <ReportsDashboard
              quotations={quotations}
              invoices={invoices}
              inventory={inventory}
              requisitions={requisitions}
              outsourcedItems={outsourcedItems}
            />
          );
        }
        break;

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground">
              You don't have permission to view this section.
            </p>
          </div>
        );
    }

    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
        <p className="text-muted-foreground">
          You don't have permission to view this section.
        </p>
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={currentUser.role}
        />
        <main className="flex-1 p-6">
          {renderCurrentSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;