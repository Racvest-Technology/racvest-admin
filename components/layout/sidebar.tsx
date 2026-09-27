"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Route,
  CreditCard,
  FileText,
  Headphones,
  BarChart3,
  Layers,
  Cpu,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "User Management", href: "/users", icon: Users, hasSubmenu: true },
  { title: "Deliveries", href: "/deliveries", icon: Package, hasSubmenu: true },
  { title: "Rides & Matches", href: "/matches", icon: Route, hasSubmenu: true },
  { title: "Payments", href: "/payments", icon: CreditCard, hasSubmenu: true },
  { title: "Reports & Moderation", href: "/reports", icon: FileText, hasSubmenu: true },
  { title: "Customer Support", href: "/support", icon: Headphones, hasSubmenu: true },
  { title: "Analytics", href: "/analytics", icon: BarChart3, hasSubmenu: true },
  { title: "Content Management", href: "/content", icon: Layers, hasSubmenu: true },
  { title: "System", href: "/system", icon: Cpu, hasSubmenu: true },
  { title: "Security", href: "/security", icon: ShieldAlert, hasSubmenu: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-[#0A3323] flex items-center justify-center text-amber-400 font-bold text-lg shadow-xs">
          R
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xl tracking-tight text-gray-900 font-sans">
            RAC<span className="text-[#0A3323]">VEST</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[#0A3323] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-700"
                  )}
                />
                <span>{item.title}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    isActive ? "text-white/80" : "text-gray-400"
                  )}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400" />
          <span>Setting</span>
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>LogOut</span>
        </Link>
      </div>
    </aside>
  );
}
