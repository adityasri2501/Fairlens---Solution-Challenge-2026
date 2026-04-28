"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  UploadCloud, 
  ShieldAlert, 
  FileText, 
  BarChart3, 
  Scale, 
  Users 
} from "lucide-react";

export function Sidebar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) return null;

  const links = [];

  if (user.role === "DATA_SCIENTIST") {
    links.push({ name: "Overview", href: "/data-scientist", icon: LayoutDashboard });
    links.push({ name: "Upload Models", href: "/data-scientist/upload", icon: UploadCloud });
    links.push({ name: "Mitigate Bias", href: "/data-scientist/mitigate", icon: ShieldAlert });
    links.push({ name: "Proxy Variables", href: "/data-scientist/proxy-variables", icon: Users });
  } else if (user.role === "COMPLIANCE_OFFICER") {
    links.push({ name: "Overview", href: "/compliance", icon: LayoutDashboard });
    links.push({ name: "Audit Trail", href: "/compliance/audit-trail", icon: FileText });
    links.push({ name: "Bias Reports", href: "/compliance/reports", icon: BarChart3 });
  } else if (user.role === "PRODUCT_MANAGER") {
    links.push({ name: "Overview", href: "/product-manager", icon: LayoutDashboard });
    links.push({ name: "Demographics", href: "/product-manager/demographics", icon: Users });
    links.push({ name: "Fairness Tradeoff", href: "/product-manager/tradeoff", icon: Scale });
  } else if (user.role === "REVIEWER") {
    links.push({ name: "Escalations", href: "/reviewer", icon: LayoutDashboard });
  }

  return (
    <div className="w-64 bg-slate-900 text-slate-100 flex flex-col h-full">
      <div className="p-6 font-bold text-2xl tracking-tight text-blue-400">FairLens</div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
