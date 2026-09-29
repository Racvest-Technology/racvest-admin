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
    trackNo: "RCV-29842",
    packageType: "Clothing",
    sender: {
      name: "Ronald Richards",
      initials: "RR",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Jane Cooper",
      initials: "JC",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
    },
    from: "Lagos",
    destination: "Lagos",
    status: "In transit",
    lastUpdated: "2 mins",
    amount: 4500,
  },
  {
    id: "2",
    trackNo: "RCV-29843",
    packageType: "Furniture",
    sender: {
      name: "Cameron Williamson",
      initials: "CW",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Floyd Miles",
      initials: "FM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    from: "Abuja",
    destination: "Ekiti",
    status: "Delivered",
    lastUpdated: "8 mins",
    amount: 18500,
  },
  {
    id: "3",
    trackNo: "RCV-29847",
    packageType: "Sports Equipment",
    sender: {
      name: "Marvin McKinney",
      initials: "MM",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Bessie Cooper",
      initials: "BC",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
    },
    from: "Akure",
    destination: "Abuja",
    status: "Picked Up",
    lastUpdated: "15mins",
    amount: 8200,
  },
  {
    id: "4",
    trackNo: "RCV-29846",
    packageType: "Beauty Products",
    sender: {
      name: "Floyd Miles",
      initials: "FM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Darlene Robertson",
      initials: "DR",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
    },
    from: "Osun",
    destination: "Kano",
    status: "Delivered",
    lastUpdated: "22 mins",
    amount: 3200,
  },
  {
    id: "5",
    trackNo: "RCV-29845",
    packageType: "Books",
    sender: {
      name: "Darlene Robertson",
      initials: "DR",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Jacob Jones",
      initials: "JJ",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80",
    },
    from: "Abia",
    destination: "Benin",
    status: "Pending",
    lastUpdated: "50 mins",
    amount: 2500,
  },
  {
    id: "6",
    trackNo: "RCV-29844",
    packageType: "Groceries",
    sender: {
      name: "Savannah Nguyen",
      initials: "SN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
    },
    assignedTo: {
      name: "Leslie Alexander",
      initials: "LA",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80",
    },
    from: "Ebonyi",
    destination: "Calabar",
    status: "Disputed",
    lastUpdated: "10 hr ago",
    amount: 6700,
  },
];

// Recharts 7-Day Revenue Trend data (matching Figma values & curves)
export const revenueChartData = [
  { day: "Mon", revenue: 1800 },
  { day: "Tue", revenue: 2900 },
  { day: "Wed", revenue: 2950 },
  { day: "Thu", revenue: 2700 },
  { day: "Fri", revenue: 2200 },
  { day: "Sat", revenue: 3100 },
  { day: "Sun", revenue: 5400 },
];

// Recharts 7-Day Delivery Trend data (matching Figma values & curves)
export const deliveryChartData = [
  { day: "Mon", deliveries: 1900 },
  { day: "Tue", deliveries: 2800 },
  { day: "Wed", deliveries: 3900 },
  { day: "Thu", deliveries: 3800 },
  { day: "Fri", deliveries: 2700 },
  { day: "Sat", deliveries: 3200 },
  { day: "Sun", deliveries: 5300 },
];

// Recharts Monthly User Growth (2025) matching Figma
export const userGrowthData = [
  { month: "Jan", users: 580 },
  { month: "Feb", users: 420 },
  { month: "Mar", users: 1100 },
  { month: "Apr", users: 780 },
  { month: "May", users: 500 },
  { month: "Jun", users: 820 },
  { month: "Jul", users: 600 },
  { month: "Aug", users: 1250, isHighlight: true },
  { month: "Sept", users: 720 },
  { month: "Oct", users: 1100 },
  { month: "Nov", users: 950 },
  { month: "Dec", users: 1080 },
];

// Delivery Status Donut Data matching Figma exactly
export const deliveryStatusData = [
  { name: "Delivered", value: 22137, color: "#7A4A1E", percentage: "26.27%" },
  { name: "In transit", value: 11191, color: "#8B572A", percentage: "13.28%" },
  { name: "Pending", value: 5663, color: "#A76E3C", percentage: "6.72%" },
  { name: "Picked Up", value: 44864, color: "#C68B59", percentage: "53.24%" },
  { name: "Cancelled", value: 1449, color: "#DFB088", percentage: "1.72%" },
];
