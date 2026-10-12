export type SupportTabType =
  | "overview"
  | "ticket"
  | "live_chat"
  | "sos_requests"
  | "call_logs"
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

export interface SupportTicketMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  isInternal?: boolean;
}

export interface SupportTicketTimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
}

export interface LinkedDeliveryContext {
  orderCode: string;
  description: string;
  trackingCode: string;
  courierName: string;
  courierPhone: string;
  pickup: string;
  destination: string;
  transactionId: string;
  escrowAmount: string;
  escrowStatus: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. "#TKT-10294"
  subject: string;
  fullSubject?: string;
  customerName: string;
  customerAvatar: string;
  customerRole: "Sender" | "Traveler" | "Recipient";
  customerId?: string;
  isVerified?: boolean;
  category: "Delivery" | "Refund" | "Verification" | "Technical";
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Resolved" | "Waiting" | "Open";
  assignedToName: string;
  assignedToAvatar: string;
  lastActivity: string; // e.g. "2 mins"
  createdAtFormatted: string; // e.g. "Oct 03"
  fullCreatedAt?: string; // e.g. "Oct 03, 2026, 10:15 AM"
  customerMessage?: string;
  linkedDelivery?: LinkedDeliveryContext;
  messages: SupportTicketMessage[];
  timeline: SupportTicketTimelineItem[];
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
