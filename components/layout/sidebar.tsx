"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Logo, LogoMark } from "@/components/ui/logo";
import { useUIStore, useAuthStore } from "@/stores";
import { logoutAction } from "@/features/auth";
import {
  House,
  Users,
  Flag,
  Headset,
  SquarePen,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Deliveries Icon matching Figma screenshot (Round container with top handle and divider)
 */
function DeliveriesIcon({ className }: { className?: string }) {
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
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Bids & Matches Icon matching Figma screenshot (Ticket / badge token)
 */
function BidsMatchesIcon({ className }: { className?: string }) {
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
      <path d="m14 2 8 8-9.5 9.5a3.5 3.5 0 0 1-5 0l-5-5a3.5 3.5 0 0 1 0-5L14 2z" />
      <circle cx="15.5" cy="8.5" r="1.5" />
      <path d="m7 14 5-5" />
    </svg>
  );
}

/**
 * Payments Icon matching Figma screenshot (Purse / Tote with arched handle and dollar sign)
 */
function PaymentsIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="14" r="3" />
      <path d="M12 12.5v3" />
      <path d="M11 13.2h2" />
    </svg>
  );
}

/**
 * Analytics Icon matching Figma screenshot (Square card with 3 vertical bars)
 */
function AnalyticsIcon({ className }: { className?: string }) {
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
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="8" y1="17" x2="8" y2="13" />
      <line x1="12" y1="17" x2="12" y2="9" />
      <line x1="16" y1="17" x2="16" y2="11" />
    </svg>
  );
}

/**
 * Admin Management Icon matching Figma screenshot (Shield with inner user profile)
 */
function AdminManagementIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8.5 16a3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}

/**
 * System Icon matching Figma screenshot (Rounded box with "API" text inside)
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
 * Security Icon matching Figma screenshot (Shield with center keyhole/lock)
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

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Navigation Sections matching Figma Navbar
 */
const navigationSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: House,
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        title: "User Management",
        href: "/users",
        icon: Users,
      },
      {
        title: "Deliveries",
        href: "/deliveries",
        icon: DeliveriesIcon,
      },
      {
        title: "Bids & Matches",
        href: "/matches",
        icon: BidsMatchesIcon,
      },
      {
        title: "Payments",
        href: "/payments",
        icon: PaymentsIcon,
      },
    ],
  },
  {
    title: "TRUST AND SUPPORT",
    items: [
      {
        title: "Reports & Moderation",
        href: "/reports",
        icon: Flag,
      },
      {
        title: "Customer Support",
        href: "/support",
        icon: Headset,
      },
    ],
  },
  {
    title: "INSIGHT",
    items: [
      {
        title: "Analytics",
        href: "/analytics",
        icon: AnalyticsIcon,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Content Management",
        href: "/content",
        icon: SquarePen,
      },
      {
        title: "Admin Management",
        href: "/admin-management",
        icon: AdminManagementIcon,
      },
      {
        title: "System",
        href: "/system",
        icon: SystemApiIcon,
      },
      {
        title: "Security",
        href: "/security",
        icon: SecurityShieldIcon,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = async () => {
    await logoutAction();
    clearSession();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  // Keyboard shortcut: Cmd/Ctrl + B to toggle sidebar collapse
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const isItemActive = (href: string) => {
    const itemPath = href.split("?")[0];
    if (itemPath === "/") {
      return pathname === "/" || pathname === "";
    }
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
  };

  const isSettingsActive = pathname.startsWith("/settings");

  return (
    <aside
      className={cn(
        "shrink-0 bg-[#03170A] border-r border-[#0D2915] flex flex-col h-screen sticky top-0 select-none transition-all duration-300 ease-in-out z-40 text-white",
        sidebarOpen ? "w-[260px]" : "w-[72px]"
      )}
    >
      {/* Top Header Bar: RACVEST Logo + Amber Collapse Trigger Button */}
      <div
        className={cn(
          "h-16 flex items-center transition-all px-4",
          sidebarOpen ? "justify-between" : "justify-center gap-2"
        )}
      >
        {sidebarOpen ? (
          <>
            <Link
              href="/"
              className="flex items-center hover:opacity-95 transition-opacity overflow-hidden"
              title="Racvest Admin Home"
            >
              <Logo dark width={158} height={28} />
            </Link>

            {/* Collapse Trigger Button (Amber rectangular button with <) */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="w-6 h-6 rounded-md bg-[#B86E18] hover:bg-[#A35E10] active:bg-[#8A4D0B] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer"
              aria-label="Collapse navbar"
              title="Collapse navbar (⌘B)"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <Link
              href="/"
              className="hover:opacity-95 transition-opacity"
              title="Racvest Home"
            >
              <LogoMark dark width={28} height={28} />
            </Link>
            {/* Expand Trigger Button (Amber rectangular button with >) */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="w-6 h-6 rounded-md bg-[#B86E18] hover:bg-[#A35E10] active:bg-[#8A4D0B] text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer"
              aria-label="Expand navbar"
              title="Expand navbar (⌘B)"
            >
              <ChevronRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 scrollbar-none">
        {navigationSections.map((section) => (
          <div key={section.title} className="space-y-1">
            {/* Section Header (Hidden when collapsed) */}
            {sidebarOpen && (
              <h4 className="text-[10px] font-bold tracking-wider text-[#5C7766] uppercase px-3 pt-1.5 pb-1 select-none font-heading">
                {section.title}
              </h4>
            )}

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.href);

                return (
                  <div key={item.title} className="relative group">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg transition-all duration-150 select-none text-[13.5px]",
                        sidebarOpen
                          ? "px-3 py-2 gap-3"
                          : "p-2 justify-center",
                        active
                          ? "bg-gradient-to-r from-[#D97706] to-[#044E24] text-white font-medium shadow-xs"
                          : "text-[#D5DBD6] hover:bg-white/[0.06] hover:text-white"
                      )}
                      title={!sidebarOpen ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          active
                            ? "text-white"
                            : "text-[#D5DBD6] group-hover:text-white"
                        )}
                      />

                      {sidebarOpen && (
                        <span className="truncate tracking-tight font-body">
                          {item.title}
                        </span>
                      )}
                    </Link>

                    {/* Collapsed Tooltip */}
                    {!sidebarOpen && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:flex items-center bg-[#072412] text-white text-xs rounded-lg shadow-xl px-2.5 py-1.5 z-50 whitespace-nowrap border border-white/10 pointer-events-none">
                        <span className="font-medium">{item.title}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pinned Bottom Section: Setting & Log Out */}
      <div className="px-3 py-3 border-t border-[#092412] space-y-1 bg-[#03170A]">
        {/* Setting */}
        <div className="relative group">
          <Link
            href="/settings"
            className={cn(
              "flex items-center rounded-lg transition-all duration-150 select-none text-[13.5px]",
              sidebarOpen
                ? "px-3 py-2 gap-3"
                : "p-2 justify-center",
              isSettingsActive
                ? "bg-gradient-to-r from-[#D97706] to-[#044E24] text-white font-medium shadow-xs"
                : "text-[#D5DBD6] hover:bg-white/[0.06] hover:text-white"
            )}
            title={!sidebarOpen ? "Setting" : undefined}
          >
            <Settings
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isSettingsActive
                  ? "text-white"
                  : "text-[#D5DBD6] group-hover:text-white"
              )}
            />
            {sidebarOpen && (
              <span className="truncate tracking-tight font-body">Setting</span>
            )}
          </Link>

          {!sidebarOpen && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:flex items-center bg-[#072412] text-white text-xs rounded-lg shadow-xl px-2.5 py-1.5 z-50 whitespace-nowrap border border-white/10 pointer-events-none">
              <span className="font-medium">Setting</span>
            </div>
          )}
        </div>

        {/* Log Out */}
        <div className="relative group">
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center rounded-lg transition-colors text-[#EA3829] hover:bg-red-500/10 text-[13.5px] cursor-pointer",
              sidebarOpen ? "px-3 py-2 gap-3" : "p-2 justify-center"
            )}
            title={!sidebarOpen ? "Log Out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0 text-[#EA3829]" />
            {sidebarOpen && (
              <span className="truncate tracking-tight font-body font-medium text-[#EA3829]">
                Log Out
              </span>
            )}
          </button>

          {!sidebarOpen && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:flex items-center bg-[#EA3829] text-white text-xs font-semibold rounded-lg shadow-xl px-2.5 py-1.5 z-50 whitespace-nowrap pointer-events-none">
              <span>Log Out</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
