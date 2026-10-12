export type SupportTabType =
  | "overview"
  | "ticket"
  | "live_chat"
  | "sos_requests"
  | "resolution_history";

export interface SupportKpiMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  isPrimary?: boolean; // Highlighted card like Open Tickets in forest green
  iconType: "users" | "ticket" | "package" | "pending" | "sos" | "phone" | "clock" | "check";
}

export interface ActivityStreamDataPoint {
  day: string;
  tickets: number;
  chats: number;
  calls: number;
}

export interface TicketStatusItem {
  id: string;
  name: string;
  count: number;
  percentage: number;
  barColor: string;
}

export interface SupportCategoryItem {
  name: string;
  count: number;
}

export interface SlaSummaryItem {
  id: string;
  label: string;
  value: string;
  tone: "success" | "warning" | "info" | "error";
  starIcon?: boolean;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  customerName: string;
  customerRole: "Sender" | "Traveler" | "Recipient";
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "New" | "Open" | "In Progress" | "Waiting for Customer" | "Escalated" | "Resolved / Closed";
  category: string;
  orderCode?: string;
  assignee?: string;
  lastUpdated: string;
  createdAt: string;
}

export interface LiveChatMessage {
  id: string;
  sender: "customer" | "agent" | "system";
  text: string;
  timestamp: string;
}

export interface LiveChatSession {
  id: string;
  customerName: string;
  customerRole: "Sender" | "Traveler" | "Recipient";
  avatar: string;
  orderCode: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: "Active" | "Waiting";
  messages: LiveChatMessage[];
}

export interface SosAlert {
  id: string;
  reporterName: string;
  role: "Traveler" | "Courier" | "Sender";
  phoneMasked: string;
  orderTrackingCode: string;
  location: string;
  reason: string;
  severity: "Critical" | "High";
  timestamp: string;
  status: "Under Review" | "Escalated to Dispatch" | "Resolved";
}
