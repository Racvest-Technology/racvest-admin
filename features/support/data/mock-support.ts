import {
  SupportKpiMetric,
  ActivityStreamDataPoint,
  TicketStatusItem,
  SupportCategoryItem,
  SlaSummaryItem,
  SupportTicket,
  LiveChatSession,
  SosAlert,
} from "../types";

export const MOCK_SUPPORT_KPIS: SupportKpiMetric[] = [
  {
    id: "open-tickets",
    title: "Open Tickets",
    value: 16,
    change: "16.4%",
    isPositive: true,
    isPrimary: true, // Special dark forest green card from screenshot
    iconType: "users",
  },
  {
    id: "unassigned-tickets",
    title: "Unassigned Tickets",
    value: 6,
    change: "19.2%",
    isPositive: true,
    iconType: "ticket",
  },
  {
    id: "active-chat",
    title: "Active Chat",
    value: 8,
    change: "24.5%",
    isPositive: true,
    iconType: "package",
  },
  {
    id: "pending-responses",
    title: "Pending Responses",
    value: "11,980",
    change: "24.1%",
    isPositive: true,
    iconType: "pending",
  },
  {
    id: "open-sos",
    title: "Open SOS request",
    value: 2,
    change: "2.1%",
    isPositive: true,
    iconType: "sos",
  },
  {
    id: "calls-today",
    title: "Calls today",
    value: 24,
    change: "2.1%",
    isPositive: true,
    iconType: "phone",
  },
  {
    id: "avg-resolution-time",
    title: "Avg Resolution time",
    value: "1h 45m",
    change: "22.1%",
    isPositive: true,
    iconType: "clock",
  },
  {
    id: "resolution-rate",
    title: "Resolution rate",
    value: "9.6%",
    change: "22.1%",
    isPositive: true,
    iconType: "check",
  },
];

export const MOCK_ACTIVITY_STREAM: ActivityStreamDataPoint[] = [
  { day: "Mon", tickets: 850, chats: 420, calls: 180 },
  { day: "Tue", tickets: 2300, chats: 1100, calls: 320 },
  { day: "Wed", tickets: 3500, chats: 1850, calls: 490 },
  { day: "Thu", tickets: 3450, chats: 1720, calls: 430 },
  { day: "Fri", tickets: 3800, chats: 1980, calls: 510 },
  { day: "Sat", tickets: 4200, chats: 2200, calls: 640 },
  { day: "Sun", tickets: 5200, chats: 2850, calls: 780 },
];

export const MOCK_TICKET_STATUSES: TicketStatusItem[] = [
  {
    id: "new",
    name: "New",
    count: 5,
    percentage: 20,
    barColor: "#0284C7", // Sky blue
  },
  {
    id: "open",
    name: "Open",
    count: 7,
    percentage: 20,
    barColor: "#EAB308", // Amber / Yellow
  },
  {
    id: "in-progress",
    name: "In Progress",
    count: 6,
    percentage: 24,
    barColor: "#0A3E1E", // Dark Forest Green
  },
  {
    id: "waiting-customer",
    name: "Waiting for Customer",
    count: 3,
    percentage: 12,
    barColor: "#94A3B8", // Slate gray
  },
  {
    id: "escalated",
    name: "Escalated",
    count: 2,
    percentage: 8,
    barColor: "#EF4444", // Red / Coral
  },
  {
    id: "resolved-closed",
    name: "Resolved / Closed",
    count: 22,
    percentage: 88,
    barColor: "#10B981", // Vibrant Emerald Green
  },
];

export const MOCK_SUPPORT_CATEGORIES: SupportCategoryItem[] = [
  { name: "Delivery Delay / Track", count: 42 },
  { name: "Payment & Escrow", count: 28 },
  { name: "Identity Verification", count: 19 },
  { name: "Traveler/Courier Comms", count: 14 },
  { name: "Refund Requests", count: 12 },
  { name: "Technical & App", count: 8 },
];

export const MOCK_SLA_METRICS: SlaSummaryItem[] = [
  {
    id: "first-response",
    label: "First Response Time",
    value: "14m 20s",
    tone: "success",
  },
  {
    id: "csat",
    label: "Customer Satisfaction (CSAT)",
    value: "4.8 / 5.0",
    tone: "warning",
    starIcon: true,
  },
  {
    id: "avg-res-time",
    label: "Average Resolution Time",
    value: "1h 42m",
    tone: "info",
  },
  {
    id: "escalation-rate",
    label: "Escalation Rate",
    value: "3.1%",
    tone: "error",
  },
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "tkt-01",
    ticketNumber: "TKT-8941",
    subject: "Package marked delivered but not received by recipient",
    customerName: "Amina Yusuf",
    customerRole: "Sender",
    priority: "Urgent",
    status: "Escalated",
    category: "Delivery Delay / Track",
    orderCode: "RAC-7821-LG",
    assignee: "Emmanuel A.",
    lastUpdated: "5 mins ago",
    createdAt: "2026-10-12 18:40",
  },
  {
    id: "tkt-02",
    ticketNumber: "TKT-8940",
    subject: "Payment authorized twice during checkout escrow",
    customerName: "Chinedu Okafor",
    customerRole: "Sender",
    priority: "High",
    status: "In Progress",
    category: "Payment & Escrow",
    orderCode: "RAC-6490-AB",
    assignee: "Sarah K.",
    lastUpdated: "18 mins ago",
    createdAt: "2026-10-12 17:15",
  },
  {
    id: "tkt-03",
    ticketNumber: "TKT-8939",
    subject: "Courier phone number unreachable for dropoff code handover",
    customerName: "Folake Adebayo",
    customerRole: "Recipient",
    priority: "High",
    status: "Open",
    category: "Traveler/Courier Comms",
    orderCode: "RAC-5512-VI",
    assignee: "Emmanuel A.",
    lastUpdated: "32 mins ago",
    createdAt: "2026-10-12 16:50",
  },
  {
    id: "tkt-04",
    ticketNumber: "TKT-8938",
    subject: "NIN document verification failed during traveler registration",
    customerName: "Babajide Davies",
    customerRole: "Traveler",
    priority: "Medium",
    status: "Waiting for Customer",
    category: "Identity Verification",
    orderCode: "-",
    assignee: "Ibrahim D.",
    lastUpdated: "1 hour ago",
    createdAt: "2026-10-12 15:30",
  },
  {
    id: "tkt-05",
    ticketNumber: "TKT-8937",
    subject: "Refund processing for damaged fragile luggage item",
    customerName: "Kemi Adeleke",
    customerRole: "Sender",
    priority: "High",
    status: "New",
    category: "Refund Requests",
    orderCode: "RAC-9943-IB",
    assignee: "Unassigned",
    lastUpdated: "2 hours ago",
    createdAt: "2026-10-12 14:10",
  },
  {
    id: "tkt-06",
    ticketNumber: "TKT-8936",
    subject: "GPS live tracking map not refreshing on iOS app",
    customerName: "Uche Nnamdi",
    customerRole: "Sender",
    priority: "Low",
    status: "Resolved / Closed",
    category: "Technical & App",
    orderCode: "RAC-4100-EN",
    assignee: "Dev Ops Support",
    lastUpdated: "Yesterday",
    createdAt: "2026-10-11 11:20",
  },
];

export const MOCK_LIVE_CHATS: LiveChatSession[] = [
  {
    id: "chat-01",
    customerName: "Emeka Obi",
    customerRole: "Traveler",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    orderCode: "RAC-7821-LG",
    lastMessage: "I arrived at the Lekki Phase 1 security gate, waiting for gate pass.",
    timestamp: "2m ago",
    unreadCount: 1,
    status: "Active",
    messages: [
      { id: "m1", sender: "customer", text: "Hello, I cannot reach the receiver on phone.", timestamp: "18:42" },
      { id: "m2", sender: "agent", text: "Hi Emeka! We are placing an internal relay call to the masked number now.", timestamp: "18:43" },
      { id: "m3", sender: "customer", text: "I arrived at the Lekki Phase 1 security gate, waiting for gate pass.", timestamp: "18:45" },
    ],
  },
  {
    id: "chat-02",
    customerName: "Grace Danjuma",
    customerRole: "Sender",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    orderCode: "RAC-6490-AB",
    lastMessage: "Can I increase the traveler's tip after successful delivery?",
    timestamp: "12m ago",
    unreadCount: 1,
    status: "Active",
    messages: [
      { id: "m1", sender: "customer", text: "Good evening support.", timestamp: "18:30" },
      { id: "m2", sender: "agent", text: "Good evening Grace, how may we assist you today?", timestamp: "18:31" },
      { id: "m3", sender: "customer", text: "Can I increase the traveler's tip after successful delivery?", timestamp: "18:33" },
    ],
  },
];

export const MOCK_SOS_ALERTS: SosAlert[] = [
  {
    id: "sos-01",
    reporterName: "Samuel Olatunji",
    role: "Courier",
    phoneMasked: "+234 803 ••• 9912",
    orderTrackingCode: "RAC-1099-IK",
    location: "Third Mainland Bridge (Inbound Lagos Island)",
    reason: "Motorbike breakdown and aggressive traffic disturbance near ramp",
    severity: "Critical",
    timestamp: "14 mins ago",
    status: "Escalated to Dispatch",
  },
  {
    id: "sos-02",
    reporterName: "David Balogun",
    role: "Traveler",
    phoneMasked: "+234 812 ••• 4481",
    orderTrackingCode: "RAC-8820-AB",
    location: "Abuja-Keffi Expressway Bypass",
    reason: "Severe vehicle tire burst in heavy rainstorm with perishable parcel",
    severity: "High",
    timestamp: "45 mins ago",
    status: "Under Review",
  },
];
