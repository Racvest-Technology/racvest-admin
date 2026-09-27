import { DeliveryItem, DashboardStats } from "@/types/delivery";

export const initialDashboardStats: DashboardStats = {
  totalUsers: 84267,
  totalUsersTrend: "+8.4%",
  activeDeliveries: 1000,
  activeDeliveriesTrend: "+12.4%",
  pendingVerification: 345,
  pendingVerificationTrend: "+12.4%",
  openDisputes: 67,
  sosAlerts: 14,
  supportTickets: 44,
};

export const mockDeliveries: DeliveryItem[] = [
  {
    id: "1",
    trackNo: "RCV-28142",
    packageType: "Clothing",
    sender: { name: "Samuel Jackson", initials: "SJ" },
    assignedTo: { name: "Jane Cooper", initials: "JC" },
    from: "Lagos",
    destination: "Lagos",
    status: "Delivered",
    lastUpdated: "2 mins",
    amount: 4500,
  },
  {
    id: "2",
    trackNo: "RCV-28143",
    packageType: "Furniture",
    sender: { name: "Cameron Williams", initials: "CW" },
    assignedTo: { name: "Floyd Miles", initials: "FM" },
    from: "Abuja",
    destination: "Ekiti",
    status: "In transit",
    lastUpdated: "5 mins",
    amount: 18500,
  },
  {
    id: "3",
    trackNo: "RCV-28144",
    packageType: "Sports Equipment",
    sender: { name: "Marvin McKinney", initials: "MM" },
    assignedTo: { name: "Bessie Cooper", initials: "BC" },
    from: "Osun",
    destination: "Abuja",
    status: "Delivered",
    lastUpdated: "12 mins",
    amount: 8200,
  },
  {
    id: "4",
    trackNo: "RCV-28145",
    packageType: "Beauty Products",
    sender: { name: "Floyd Miles", initials: "FM" },
    assignedTo: { name: "Darlene Robertson", initials: "DR" },
    from: "Kano",
    destination: "Kano",
    status: "In transit",
    lastUpdated: "22 mins",
    amount: 3200,
  },
  {
    id: "5",
    trackNo: "RCV-28146",
    packageType: "Books",
    sender: { name: "Darlene Robertson", initials: "DR" },
    assignedTo: { name: "Jacob Jones", initials: "JJ" },
    from: "Abia",
    destination: "Benin",
    status: "Pending",
    lastUpdated: "52 mins",
    amount: 2500,
  },
  {
    id: "6",
    trackNo: "RCV-28147",
    packageType: "Groceries",
    sender: { name: "Savannah Nguyen", initials: "SN" },
    assignedTo: { name: "Leslie Alexander", initials: "LA" },
    from: "Borno",
    destination: "Calabar",
    status: "Picked Up",
    lastUpdated: "1 hr ago",
    amount: 6700,
  },
  {
    id: "7",
    trackNo: "RCV-28148",
    packageType: "Electronics",
    sender: { name: "Guy Hawkins", initials: "GH" },
    assignedTo: { name: "Kristin Watson", initials: "KW" },
    from: "Lagos",
    destination: "Ibadan",
    status: "In transit",
    lastUpdated: "1 hr ago",
    amount: 12000,
  },
  {
    id: "8",
    trackNo: "RCV-28149",
    packageType: "Documents",
    sender: { name: "Courtney Henry", initials: "CH" },
    assignedTo: { name: "Devon Lane", initials: "DL" },
    from: "Port Harcourt",
    destination: "Enugu",
    status: "Cancelled",
    lastUpdated: "3 hrs ago",
    amount: 4000,
  },
];

// Recharts 7-Day Revenue Trend data
export const revenueChartData = [
  { day: "Sun", revenue: 1.1 },
  { day: "Mon", revenue: 1.3 },
  { day: "Tue", revenue: 1.6 },
  { day: "Wed", revenue: 1.7 },
  { day: "Thu", revenue: 1.65 },
  { day: "Fri", revenue: 1.85 },
  { day: "Sat", revenue: 1.95 },
];

// Recharts 7-Day Delivery Trend data
export const deliveryChartData = [
  { day: "Sun", deliveries: 850 },
  { day: "Mon", deliveries: 940 },
  { day: "Tue", deliveries: 1080 },
  { day: "Wed", deliveries: 1100 },
  { day: "Thu", deliveries: 1020 },
  { day: "Fri", deliveries: 1190 },
  { day: "Sat", deliveries: 1250 },
];

// Recharts Monthly User Growth (2026)
export const userGrowthData = [
  { month: "Jan", users: 450 },
  { month: "Feb", users: 520 },
  { month: "Mar", users: 610 },
  { month: "Apr", users: 780 },
  { month: "May", users: 890 },
  { month: "Jun", users: 950 },
  { month: "Jul", users: 1120 },
  { month: "Aug", users: 1050 },
  { month: "Sep", users: 1180 },
  { month: "Oct", users: 1240 },
  { month: "Nov", users: 1310 },
  { month: "Dec", users: 1420 },
];

// Delivery Status Donut Data
export const deliveryStatusData = [
  { name: "Picked Up", value: 44584, color: "#F59E0B", percentage: "52.84%" },
  { name: "Delivered", value: 22187, color: "#10B981", percentage: "26.27%" },
  { name: "In transit", value: 11191, color: "#111827", percentage: "13.26%" },
  { name: "Pending", value: 5663, color: "#F97316", percentage: "6.71%" },
  { name: "Cancelled", value: 1449, color: "#EF4444", percentage: "1.72%" },
];
