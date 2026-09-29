"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo, LogoMark } from "@/components/ui/logo";
import { useUIStore, uiStore } from "@/stores";
import {
  House,
  UsersRound,
  Package2,
  Handshake,
  Flag,
  Headset,
  SquareKanban,
  SquarePen,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Payments Icon matching Figma (Purse / Tote with arched handle and center circle)
 */
function PaymentIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      <rect x="3" y="7" width="18" height="14" rx="3" />
      <circle cx="12" cy="14" r="2.5" />
    </svg>
  );
}

/**
 * System Icon matching Figma (Rounded box with "API" text inside)
 */
function SystemApiIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M6.2 15l1.8-6 1.8 6" />
      <path d="M6.8 13.2h2.4" />
      <path d="M12.5 9h2a1.8 1.8 0 0 1 0 3.6h-2v2.4" />
      <path d="M17.8 9v6" />
    </svg>
  );
}

/**
 * Security Icon matching Figma (Shield with center keyhole/lock)
 */
function SecurityShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v3" />
    </svg>
  );
}

interface SubNavItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  subItems?: SubNavItem[];
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    title: "User Management",
    href: "/users",
    icon: UsersRound,
    hasSubmenu: true,
    subItems: [
      { title: "Sender/Traveller", href: "/users/senders" },
      { title: "Courier", href: "/users/couriers" },
      { title: "Business", href: "/users/business" },
      { title: "Shadow Banned", href: "/users/shadow-banned" },
      { title: "Suspended", href: "/users/suspended" },
    ],
  },
  {
    title: "Deliveries",
    href: "/deliveries",
    icon: Package2,
    hasSubmenu: true,
    subItems: [
      { title: "Active Deliveries", href: "/deliveries/active" },
      { title: "In-Transit", href: "/deliveries/in-transit" },
      { title: "Pending", href: "/deliveries/pending" },
      { title: "Delivered", href: "/deliveries/delivered" },
      { title: "Cancelled", href: "/deliveries/cancelled" },
      { title: "Disputed", href: "/deliveries/disputed" },
    ],
  },
  {
    title: "Bids & Matches",
    href: "/matches",
    icon: Handshake,
    hasSubmenu: true,
    subItems: [
      { title: "Active Matches", href: "/matches/active" },
      { title: "Algorithmic Batching", href: "/matches/batching" },
      { title: "Manual Overrides", href: "/matches/overrides" },
    ],
  },
  {
    title: "Payments",
    href: "/payments",
    icon: PaymentIcon,
    hasSubmenu: true,
    subItems: [
      { title: "Transactions", href: "/payments/transactions" },
      { title: "Courier Payouts", href: "/payments/payouts" },
      { title: "CoD Remittances", href: "/payments/remittances" },
      { title: "Platform Commissions", href: "/payments/commissions" },
    ],
  },
  {
    title: "Reports & Moderation",
    href: "/reports",
    icon: Flag,
    hasSubmenu: true,
    subItems: [
      { title: "Incident Reports", href: "/reports/incidents" },
      { title: "Ratings & Reviews", href: "/reports/ratings" },
      { title: "Dispute Arbitration", href: "/reports/disputes" },
    ],
  },
  {
    title: "Customer Support",
    href: "/support",
    icon: Headset,
    hasSubmenu: true,
    subItems: [
      { title: "Support Tickets", href: "/support/tickets" },
      { title: "SOS Alerts", href: "/support/sos" },
      { title: "Inquiries", href: "/support/inquiries" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: SquareKanban,
    hasSubmenu: true,
    subItems: [
      { title: "Overview", href: "/analytics/overview" },
      { title: "Revenue Trends", href: "/analytics/revenue" },
      { title: "Delivery Throughput", href: "/analytics/throughput" },
      { title: "Geographic Heatmaps", href: "/analytics/heatmaps" },
    ],
  },
  {
    title: "Content Management",
    href: "/content",
    icon: SquarePen,
    hasSubmenu: true,
    subItems: [
      { title: "Banners & Promos", href: "/content/banners" },
      { title: "Announcements", href: "/content/announcements" },
      { title: "Notices", href: "/content/notices" },
    ],
  },
  {
    title: "System",
    href: "/system",
    icon: SystemApiIcon,
    hasSubmenu: true,
    subItems: [
      { title: "API & Webhooks", href: "/system/webhooks" },
      { title: "System Health", href: "/system/health" },
      { title: "Database Logs", href: "/system/logs" },
    ],
  },
  {
    title: "Security",
    href: "/security",
    icon: SecurityShieldIcon,
    hasSubmenu: true,
    subItems: [
      { title: "Roles & RBAC", href: "/security/roles" },
      { title: "Access Logs", href: "/security/logs" },
      { title: "Audit Trail", href: "/security/audit" },
    ],
  },
];

const settingsSubItems: SubNavItem[] = [
  { title: "General Settings", href: "/settings" },
  { title: "Tariff Rules", href: "/settings/tariffs" },
  { title: "Notifications", href: "/settings/notifications" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();
  const [userToggledSubmenus, setUserToggledSubmenus] = React.useState<Record<string, boolean>>({});

  // Compute whether each submenu is open (active by route or toggled by user)
  const isSubmenuOpen = React.useCallback(
    (itemTitle: string, subItems?: SubNavItem[]) => {
      if (userToggledSubmenus[itemTitle] !== undefined) {
        return userToggledSubmenus[itemTitle];
      }
      if (subItems) {
        return subItems.some((sub) => pathname === sub.href);
      }
      if (itemTitle === "Setting") {
        return pathname.startsWith("/settings");
      }
      return false;
    },
    [pathname, userToggledSubmenus]
  );

  // Keyboard shortcut: Cmd/Ctrl + B to toggle sidebar collapse
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        uiStore.toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSubmenu = (title: string, subItems?: SubNavItem[], e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!sidebarOpen) {
      uiStore.setSidebarOpen(true);
      setUserToggledSubmenus((prev) => ({ ...prev, [title]: true }));
      return;
    }
    const currentlyOpen = isSubmenuOpen(title, subItems);
    setUserToggledSubmenus((prev) => ({
      ...prev,
      [title]: !currentlyOpen,
    }));
  };

  return (
    <aside
      className={cn(
        "shrink-0 bg-white border-r border-[#E3E3DC] flex flex-col h-screen sticky top-0 select-none transition-all duration-300 ease-in-out z-40",
        sidebarOpen ? "w-[264px]" : "w-[76px]"
      )}
    >
      {/* Top Header Bar: Logo + Figma Collapse Trigger Button */}
      <div
        className={cn(
          "h-16 flex items-center transition-all px-3.5",
          sidebarOpen ? "justify-between" : "justify-center gap-1.5"
        )}
      >
        {sidebarOpen ? (
          <>
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity overflow-hidden"
              title="Racvest Admin Home"
            >
              <Logo width={168} height={30} />
            </Link>

            {/* Collapse Trigger Button (Figma dark brown circular button with <) */}
            <button
              type="button"
              onClick={() => uiStore.setSidebarOpen(false)}
              className="w-7 h-7 rounded-full bg-[#875012] hover:bg-[#673C0E] active:bg-[#472809] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer"
              aria-label="Collapse sidebar"
              title="Collapse sidebar (⌘B)"
            >
              <ChevronLeft className="w-4 h-4 text-white stroke-[2.5]" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 py-1">
            <Link
              href="/"
              className="hover:opacity-90 transition-opacity"
              title="Racvest Home"
            >
              <LogoMark width={28} height={28} />
            </Link>
            {/* Expand Trigger Button (Figma dark brown circular button with >) */}
            <button
              type="button"
              onClick={() => uiStore.setSidebarOpen(true)}
              className="w-6 h-6 rounded-full bg-[#875012] hover:bg-[#673C0E] active:bg-[#472809] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer"
              aria-label="Expand sidebar"
              title="Expand sidebar (⌘B)"
            >
              <ChevronRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Main Navigation Card matching Figma's rounded container */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden mb-3 bg-[#F7F7F3] transition-all",
          sidebarOpen ? "mx-3 p-2 rounded-[22px]" : "mx-1.5 p-1 rounded-[18px]"
        )}
      >
        {/* Scrollable Upper Navigation */}
        <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-[#E3E3DC]">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isDirectActive =
              item.href === "/"
                ? pathname === "/" || pathname === ""
                : pathname === item.href;
            const isChildActive =
              item.subItems?.some((sub) => pathname === sub.href) ?? false;
            const isActive = isDirectActive || isChildActive;
            const itemSubmenuOpen = isSubmenuOpen(item.title, item.subItems);

            return (
              <div key={item.title} className="relative group">
                <div
                  onClick={(e) => {
                    if (item.hasSubmenu) {
                      toggleSubmenu(item.title, item.subItems, e);
                    }
                  }}
                  className={cn(
                    "flex items-center rounded-xl transition-all duration-150 cursor-pointer",
                    sidebarOpen
                      ? "px-2 py-1.5 justify-between"
                      : "p-1.5 justify-center",
                    isActive
                      ? "bg-[#D2E7DC] text-[#014D21] font-semibold"
                      : "text-[#5A5A52] hover:bg-black/5 hover:text-[#171713]"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      sidebarOpen ? "gap-2.5 min-w-0" : "justify-center"
                    )}
                  >
                    {/* Circular Icon Badge matching Figma */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isActive
                          ? "bg-[#014D21] text-[#D2E7DC] shadow-xs"
                          : "bg-[#EBEBE4] text-[#66665D] group-hover:bg-[#E3E3DC] group-hover:text-[#171713]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Menu Label */}
                    {sidebarOpen && (
                      <span className="text-[13.5px] font-medium tracking-tight truncate font-body">
                        {item.title}
                      </span>
                    )}
                  </div>

                  {/* Submenu Chevron matching Figma */}
                  {sidebarOpen && item.hasSubmenu && (
                    itemSubmenuOpen ? (
                      <ChevronRight className="w-3.5 h-3.5 text-[#5A5A52] shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                    )
                  )}
                </div>

                {/* Submenu Accordion matching Figma (Expanded Sidebar) */}
                {sidebarOpen && item.hasSubmenu && itemSubmenuOpen && item.subItems && (
                  <div className="mt-1 pl-4 pr-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-1.5 rounded-xl transition-colors font-body group/sub",
                            isSubActive
                              ? "bg-[#D2E7DC]/60 text-[#014D21] font-semibold"
                              : "text-[#5A5A52] hover:bg-black/5 hover:text-[#171713]"
                          )}
                        >
                          {/* Circular icon badge matching Figma screenshot */}
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full shrink-0 transition-colors flex items-center justify-center",
                              isSubActive
                                ? "bg-[#014D21] text-white"
                                : "bg-[#EAEAE5] group-hover/sub:bg-[#E3E3DC]"
                            )}
                          />
                          <span className="text-[13px] font-normal truncate">
                            {sub.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Tooltip / Flyout in Collapsed Mode */}
                {!sidebarOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:flex flex-col bg-[#171713] text-white text-xs rounded-xl shadow-xl py-2 px-3 z-50 whitespace-nowrap min-w-[140px] pointer-events-auto animate-in fade-in-50 zoom-in-95 duration-100">
                    <span className="font-semibold text-white/90 pb-1 border-b border-white/10 mb-1">
                      {item.title}
                    </span>
                    {item.hasSubmenu && item.subItems ? (
                      <div className="flex flex-col gap-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "text-left py-0.5 hover:text-[#DC851F] transition-colors",
                              pathname === sub.href
                                ? "text-[#DC851F] font-medium"
                                : "text-white/70"
                            )}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-[#DC851F]"
                      >
                        Open Dashboard
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section: Settings & Log Out */}
        <div className="pt-2 border-t border-[#EBEBE4] space-y-1 shrink-0">
          {/* Settings */}
          {(() => {
            const isSettingsActive = pathname.startsWith("/settings");
            const isSettingsOpen = isSubmenuOpen("Setting", settingsSubItems);

            return (
              <div className="relative group">
                <div
                  onClick={(e) => toggleSubmenu("Setting", settingsSubItems, e)}
                  className={cn(
                    "flex items-center rounded-xl transition-all duration-150 cursor-pointer",
                    sidebarOpen
                      ? "px-2 py-1.5 justify-between"
                      : "p-1.5 justify-center",
                    isSettingsActive
                      ? "bg-[#D2E7DC] text-[#014D21] font-semibold"
                      : "text-[#5A5A52] hover:bg-black/5 hover:text-[#171713]"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      sidebarOpen ? "gap-2.5" : "justify-center"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        isSettingsActive
                          ? "bg-[#014D21] text-[#D2E7DC] shadow-xs"
                          : "bg-[#EBEBE4] text-[#66665D] group-hover:bg-[#E3E3DC] group-hover:text-[#171713]"
                      )}
                    >
                      <Settings className="w-4 h-4" />
                    </div>
                    {sidebarOpen && (
                      <span className="text-[13.5px] font-medium font-body">
                        Setting
                      </span>
                    )}
                  </div>
                  {sidebarOpen && (
                    isSettingsOpen ? (
                      <ChevronRight className="w-3.5 h-3.5 text-[#5A5A52] shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#85857B] shrink-0" />
                    )
                  )}
                </div>

                {/* Settings Submenu Accordion matching Figma */}
                {sidebarOpen && isSettingsOpen && (
                  <div className="mt-1 pl-4 pr-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {settingsSubItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "flex items-center gap-3 px-2 py-1.5 rounded-xl transition-colors font-body group/sub",
                            isSubActive
                              ? "bg-[#D2E7DC]/60 text-[#014D21] font-semibold"
                              : "text-[#5A5A52] hover:bg-black/5 hover:text-[#171713]"
                          )}
                        >
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full shrink-0 transition-colors flex items-center justify-center",
                              isSubActive
                                ? "bg-[#014D21] text-white"
                                : "bg-[#EAEAE5] group-hover/sub:bg-[#E3E3DC]"
                            )}
                          />
                          <span className="text-[13px] font-normal truncate">
                            {sub.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Collapsed Tooltip for Settings */}
                {!sidebarOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:flex flex-col bg-[#171713] text-white text-xs rounded-xl shadow-xl py-2 px-3 z-50 whitespace-nowrap min-w-[130px] pointer-events-auto">
                    <span className="font-semibold text-white/90 pb-1 border-b border-white/10 mb-1">
                      Setting
                    </span>
                    <div className="flex flex-col gap-1">
                      {settingsSubItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={cn(
                            "text-left py-0.5 hover:text-[#DC851F] transition-colors",
                            pathname === sub.href
                              ? "text-[#DC851F] font-medium"
                              : "text-white/70"
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Log Out */}
          <div className="relative group">
            <Link
              href="/login"
              className={cn(
                "flex items-center rounded-xl transition-colors text-[#C83B2B] hover:bg-[#FEF2F0]",
                sidebarOpen ? "px-2 py-1.5 gap-2.5" : "p-1.5 justify-center"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-[#FEF2F0] text-[#C83B2B] group-hover:bg-[#FDE0DB] flex items-center justify-center shrink-0 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              {sidebarOpen && (
                <span className="text-[13.5px] font-medium font-body">Log Out</span>
              )}
            </Link>

            {/* Collapsed Tooltip for Log Out */}
            {!sidebarOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 hidden group-hover:block bg-[#C83B2B] text-white text-xs font-semibold rounded-lg shadow-xl py-1.5 px-3 z-50 whitespace-nowrap pointer-events-none">
                Log Out
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

