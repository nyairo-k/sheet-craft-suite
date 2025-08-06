import {
  Home,
  Users,
  FileText,
  Receipt,
  Package,
  DollarSign,
  BarChart3,
  ClipboardList,
  Building2,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: string;
}

export function Sidebar({ activeSection, onSectionChange, userRole }: SidebarProps) {
  // Define role-based menu items
  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Home, roles: ["Sales Rep", "Finance", "Inventory", "GM", "Requester"] }
    ];

    const menuItems = [
      { id: "crm", label: "CRM", icon: Users, roles: ["Sales Rep", "GM"] },
      { id: "sales", label: "Sales", icon: FileText, roles: ["Sales Rep", "GM"] },
      { id: "requisitions", label: "Requisitions", icon: ClipboardList, roles: ["Requester", "GM", "Finance"] },
      { id: "inventory", label: "Inventory", icon: Package, roles: ["Inventory", "GM"] },
      { id: "finance", label: "Finance", icon: DollarSign, roles: ["Finance", "GM"] },
      { id: "reports", label: "Reports", icon: BarChart3, roles: ["GM"] }
    ];

    return [...baseItems, ...menuItems.filter(item => item.roles.includes(userRole))];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-nav-background text-nav-foreground h-full flex flex-col">
      <div className="p-6 border-b border-nav-accent/20">
        <h2 className="text-lg font-semibold mb-1">Morab Flow ERP</h2>
        <p className="text-sm text-nav-foreground/70">{userRole} Portal</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeSection === item.id
                  ? "bg-nav-accent text-nav-accent-foreground"
                  : "text-nav-foreground hover:bg-nav-accent/50 hover:text-nav-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-nav-accent/20">
        <div className="text-xs text-nav-foreground/50">
          Medical Equipment ERP v2.0
        </div>
      </div>
    </aside>
  );
}