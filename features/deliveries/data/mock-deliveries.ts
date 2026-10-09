export interface DeliveryParty {
  name: string;
  id: string;
  role: "sender" | "courier";
  location: string;
  phone: string;
  avatar: string;
}

export interface DeliveryProgressStep {
  id: string;
  label: string;
  timestamp: string;
  subtext?: string;
  status: "completed" | "current" | "pending";
}

export interface DeliveryTimelineEvent {
  time: string;
  title: string;
  description?: string;
  status: "completed" | "current" | "pending";
}

export interface DeliveryDetailData {
  trackingId: string;
  status: "In transit" | "Delivered" | "Picked Up" | "Pending" | "Disputed" | "Cancelled";
  createdDate: string;
  lastUpdated: string;
  progressSteps: DeliveryProgressStep[];
  sender: DeliveryParty;
  courier: DeliveryParty;
  pickupLocation: {
    address: string;
    landmark: string;
  };
  destination: {
    address: string;
    landmark: string;
  };
  recipient: {
    name: string;
    phone: string;
  };
  liveTracking: {
    lastUpdated: string;
    currentLocation: string;
    estimatedArrival: string;
    distanceRemaining: string;
    courierDistanceText: string;
  };
  timeline: DeliveryTimelineEvent[];
  issue?: {
    id: string;
    count: number;
    reporter: string;
    summary: string;
    description: string;
    timestamp: string;
    status: "Open" | "Resolved";
  };
  payment: {
    fee: string;
    status: "Paid" | "Pending" | "Refunded";
    method: string;
    transactionId: string;
    lastUpdated: string;
  };
  packageDetails: {
    type: string;
    weight: string;
    quantity: string;
    fragile: boolean;
    perishable: boolean;
    photos: string[];
  };
  proofOfDelivery?: {
    isDelivered: boolean;
    photoUrl?: string;
    signedBy?: string;
    deliveredAt?: string;
  };
}

export const MOCK_DELIVERY_DETAIL: DeliveryDetailData = {
  trackingId: "RCV-29842",
  status: "In transit",
  createdDate: "Sep 30, 12:50 pm",
  lastUpdated: "Sep 30, 3:05 pm",
  progressSteps: [
    {
      id: "created",
      label: "Created",
      timestamp: "Sep 30, 12:50 pm",
      status: "completed",
    },
    {
      id: "assigned",
      label: "Assigned",
      timestamp: "Jane accepted, 1:15 pm",
      status: "completed",
    },
    {
      id: "picked_up",
      label: "Picked up",
      timestamp: "Confirmed 2:18 pm",
      status: "completed",
    },
    {
      id: "in_transit",
      label: "In Transit",
      timestamp: "Ikeja, Moving",
      status: "current",
    },
    {
      id: "delivered",
      label: "Delivered",
      timestamp: "Expected 4:30 pm",
      status: "pending",
    },
  ],
  sender: {
    name: "Sophia Chen",
    id: "RCV-29842",
    role: "sender",
    location: "Lagos, Nigeria",
    phone: "+234 801 234 5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
  },
  courier: {
    name: "Ava Carter",
    id: "COU-29842",
    role: "courier",
    location: "Lagos, Nigeria",
    phone: "+234 801 564 2548",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
  },
  pickupLocation: {
    address: "4 Water Corporation Dr, Victoria Island, Lagos 101251",
    landmark: "LANDMARK LAGOS",
  },
  destination: {
    address: "Obafemi Awolowo Way, Alausa, Ojodu, Lagos 101233",
    landmark: "Ikeja City Mall",
  },
  recipient: {
    name: "Michael Johnson",
    phone: "+234 803 987 6543",
  },
  liveTracking: {
    lastUpdated: "LIVE 2mins ago",
    currentLocation: "Ikeja, Lagos",
    estimatedArrival: "Today, 4:30 pm",
    distanceRemaining: "7.2 km ~24 min",
    courierDistanceText: "Ava Carter • 7.2 km left",
  },
  timeline: [
    {
      time: "1:05 pm",
      title: "Matched",
      description: "Offer was accepted.",
      status: "completed",
    },
    {
      time: "1:05 pm",
      title: "Payment",
      description: "Payment are secured with RACVEST",
      status: "completed",
    },
    {
      time: "1:05 pm",
      title: "Traveler En Route",
      description: "Traveler is heading to the agreed meeting point.",
      status: "completed",
    },
    {
      time: "1:05 pm",
      title: "Arrived at Meetup location",
      status: "completed",
    },
    {
      time: "1:05 pm",
      title: "Package Handed Over",
      description: "Traveler has received your package.",
      status: "completed",
    },
    {
      time: "1:05 pm",
      title: "In transit to destination",
      description: "Your package is on the way to the destination.",
      status: "current",
    },
    {
      time: "1:05 pm",
      title: "Arrive at destination",
      description: "Traveler has reached the destination.",
      status: "pending",
    },
    {
      time: "1:05 pm",
      title: "Delivered item",
      description: "Package handed to the recipient.",
      status: "pending",
    },
  ],
  issue: {
    id: "ISSUE-9281",
    count: 1,
    reporter: "Sender",
    summary: "Sender sent a report",
    description: "Sender noted courier delayed past initial estimated arrival window by 15 minutes due to heavy traffic around Third Mainland Bridge.",
    timestamp: "Sep 30, 2:45 pm",
    status: "Open",
  },
  payment: {
    fee: "₦4,500",
    status: "Paid",
    method: "Card",
    transactionId: "#TXN-982734",
    lastUpdated: "Sep 30, 3:05 pm",
  },
  packageDetails: {
    type: "Clothing",
    weight: "4.5kg",
    quantity: "2 items",
    fragile: false,
    perishable: false,
    photos: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    ],
  },
  proofOfDelivery: {
    isDelivered: false,
  },
};
