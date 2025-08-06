import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Building2, Phone, Mail, TrendingUp } from "lucide-react";
import { ClientForm } from "./ClientForm";
import { ClientsList } from "./ClientsList";

interface CRMDashboardProps {
  clients: any[];
  quotations: any[];
  onClientCreate: (client: any) => void;
  onClientUpdate: (client: any) => void;
}

export function CRMDashboard({ clients, quotations, onClientCreate, onClientUpdate }: CRMDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showClientForm, setShowClientForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "Active").length;
  const clientsWithQuotes = new Set(quotations.map(q => q.clientId)).size;
  
  // Calculate client value
  const clientValues = clients.map(client => {
    const clientQuotes = quotations.filter(q => q.clientId === client.id);
    const totalValue = clientQuotes.reduce((sum, q) => sum + parseFloat(q.totalAmount || 0), 0);
    return { ...client, totalValue, quotesCount: clientQuotes.length };
  });

  const topClients = clientValues
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5);

  const handleCreateClient = (clientData: any) => {
    const newClient = {
      id: `CL${Date.now()}`,
      ...clientData,
      createdAt: new Date().toISOString(),
      status: "Active"
    };
    onClientCreate(newClient);
    setShowClientForm(false);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowClientForm(true);
  };

  const handleUpdateClient = (clientData: any) => {
    onClientUpdate({ ...editingClient, ...clientData });
    setShowClientForm(false);
    setEditingClient(null);
  };

  if (showClientForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {editingClient ? "Edit Client" : "Add New Client"}
            </h2>
            <p className="text-muted-foreground">
              {editingClient ? "Update client information" : "Create a new client record"}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowClientForm(false);
              setEditingClient(null);
            }}
          >
            Back to CRM
          </Button>
        </div>
        
        <ClientForm 
          onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
          initialData={editingClient}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Customer Relationship Management</h2>
          <p className="text-muted-foreground">Manage your client database and relationships</p>
        </div>
        <Button onClick={() => setShowClientForm(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">{activeClients} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engaged Clients</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsWithQuotes}</div>
            <p className="text-xs text-muted-foreground">Have active quotes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Client Value</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KSh {topClients[0]?.totalValue?.toLocaleString() || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              {topClients[0]?.companyName || "No data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalClients > 0 ? Math.round((clientsWithQuotes / totalClients) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Clients with quotes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">All Clients</TabsTrigger>
          <TabsTrigger value="top-clients">Top Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>Last 5 clients added to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clients.slice(-5).reverse().map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-2 rounded border">
                      <div>
                        <div className="font-medium">{client.companyName}</div>
                        <div className="text-sm text-muted-foreground">{client.contactPerson}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Distribution</CardTitle>
                <CardDescription>Clients by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(
                    clients.reduce((acc, client) => {
                      acc[client.industry] = (acc[client.industry] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([industry, count]) => (
                    <div key={industry} className="flex items-center justify-between">
                      <span className="text-sm">{industry}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <ClientsList 
            clients={clients} 
            onEdit={handleEditClient}
            onViewDetails={(client) => console.log("View details", client)}
          />
        </TabsContent>

        <TabsContent value="top-clients">
          <Card>
            <CardHeader>
              <CardTitle>Top Clients by Value</CardTitle>
              <CardDescription>Clients ranked by total quotation value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.id} className="flex items-center justify-between p-4 rounded border">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{client.companyName}</div>
                        <div className="text-sm text-muted-foreground">{client.contactPerson}</div>
                        <div className="text-xs text-muted-foreground">{client.quotesCount || 0} quotes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">KSh {client.totalValue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}