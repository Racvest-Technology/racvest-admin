"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared";
import { SupportTabsNavigation } from "./support-tabs-navigation";
import { SupportKpis } from "./support-kpis";
import { SupportActivityChart } from "./support-activity-chart";
import { TicketStatusBreakdown } from "./ticket-status-breakdown";
import { SupportCategoryGrid } from "./support-category-grid";
import { SupportSlaGrid } from "./support-sla-grid";
import { SupportTicketsTab } from "./support-tickets-tab";
import { SupportChatTab } from "./support-chat-tab";
import { SupportSosTab } from "./support-sos-tab";
import { SupportHistoryTab } from "./support-history-tab";
import {
  MOCK_SUPPORT_KPIS,
  MOCK_ACTIVITY_STREAM,
  MOCK_TICKET_STATUSES,
  MOCK_SUPPORT_CATEGORIES,
  MOCK_SLA_METRICS,
  MOCK_SUPPORT_TICKETS,
  MOCK_LIVE_CHATS,
  MOCK_SOS_ALERTS,
} from "../data/mock-support";
import { SupportTabType } from "../types";

export function CustomerSupportView() {
  const [activeTab, setActiveTab] = React.useState<SupportTabType>("overview");
  const [dateFilter, setDateFilter] = React.useState("Last 7days");

  const handleRefresh = () => {
    // Refresh action
  };

  const handleDownloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange: dateFilter,
      kpis: MOCK_SUPPORT_KPIS,
      statusBreakdown: MOCK_TICKET_STATUSES,
      categories: MOCK_SUPPORT_CATEGORIES,
      sla: MOCK_SLA_METRICS,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customer-support-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Page Header matching Figma */}
      <PageHeader
        title="Customer Support Overview"
        subtitle="Manage customer issues, live conversations, safety emergencies, and resolution history."
        dateFilterLabel={dateFilter}
        onDateFilterClick={() => {
          setDateFilter((prev) => (prev === "Last 7days" ? "Last 30days" : "Last 7days"));
        }}
        onRefresh={handleRefresh}
        downloadLabel="Download report"
        onDownloadReport={handleDownloadReport}
      />

      {/* Tabs Sub-navigation */}
      <SupportTabsNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ticketBadgeCount={2}
        liveChatBadgeCount={2}
        sosBadgeCount={2}
      />

      {/* Overview Tab Content (Exact Figma Layout) */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* 8 KPI Cards (2 rows of 4) */}
          <SupportKpis metrics={MOCK_SUPPORT_KPIS} />

          {/* Middle Row: Activity Stream Chart + Ticket Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SupportActivityChart data={MOCK_ACTIVITY_STREAM} />
            <TicketStatusBreakdown statuses={MOCK_TICKET_STATUSES} />
          </div>

          {/* Bottom Row: Category Breakdown + SLA Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SupportCategoryGrid categories={MOCK_SUPPORT_CATEGORIES} />
            <SupportSlaGrid metrics={MOCK_SLA_METRICS} />
          </div>
        </div>
      )}

      {/* Tickets Tab Content */}
      {activeTab === "ticket" && (
        <SupportTicketsTab tickets={MOCK_SUPPORT_TICKETS} />
      )}

      {/* Live Chat Tab Content */}
      {activeTab === "live_chat" && (
        <SupportChatTab sessions={MOCK_LIVE_CHATS} />
      )}

      {/* SOS Requests Tab Content */}
      {activeTab === "sos_requests" && (
        <SupportSosTab alerts={MOCK_SOS_ALERTS} />
      )}

      {/* Resolution History Tab Content */}
      {activeTab === "resolution_history" && (
        <SupportHistoryTab />
      )}
    </div>
  );
}
