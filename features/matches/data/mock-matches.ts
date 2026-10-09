export type MatchStatus =
  | "Awaiting Decision"
  | "Matched"
  | "Withdrawn"
  | "Accepted"
  | "Unmatched Request";

export type MatchType = "Traveler offer" | "Trip Request" | "Courier offer";

export interface BidParticipant {
  name: string;
  role: "Sender" | "Courier" | "Traveler";
  avatar: string;
  isVerified: boolean;
}

export interface ActivityTimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type?: "submitted" | "waiting" | "accepted" | "declined" | "countered";
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  reason: string;
  timestamp: string;
}

export interface BidMatchItem {
  id: string; // e.g. "BID-10231"
  displayId: string; // e.g. "#BID-10231"
  deliveryId: string; // e.g. "#RCV-29842"
  deliveryIdRaw: string; // e.g. "RCV-29842"
  sender: BidParticipant;
  courier: BidParticipant;
  bidAmount: number;
  senderBudget: number;
  originalAmount?: number;
  negotiatedAmount?: number;
  status: MatchStatus;
  type: MatchType;
  route: string;
  packageDetails: string;
  deliveryDate: string;
  createdTime: string;
  timeWaiting: string;
  latestActivity: string;
  activityTimeline: ActivityTimelineItem[];
  auditLogs: AuditLogItem[];
}

export interface MatchesStats {
  activeMatching: {
    count: number;
    trend: string;
  };
  successfulMatches: {
    count: number;
    trend: string;
  };
  awaitingDecision: {
    count: string;
    trend: string;
  };
  negotiating: {
    count: string;
    trend: string;
  };
  withdrawn: number;
  avgTimeToMatch: string;
  unmatchedRequests: number;
}

export const MATCHES_STATS: MatchesStats = {
  activeMatching: {
    count: 16,
    trend: "+8.4%",
  },
  successfulMatches: {
    count: 24,
    trend: "+5.7%",
  },
  awaitingDecision: {
    count: "06",
    trend: "+6.4%",
  },
  negotiating: {
    count: "03",
    trend: "+8.4%",
  },
  withdrawn: 10,
  avgTimeToMatch: "347s",
  unmatchedRequests: 94,
};

export const MOCK_BIDS: BidMatchItem[] = [
  {
    id: "BID-10231",
    displayId: "#BID-10231",
    deliveryId: "#RCV-29842",
    deliveryIdRaw: "RCV-29842",
    sender: {
      name: "Ronald Richards",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Jane Cooper",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 8500,
    senderBudget: 9000,
    originalAmount: 9000,
    negotiatedAmount: 8500,
    status: "Awaiting Decision",
    type: "Traveler offer",
    route: "Lagos → Abuja",
    packageDetails: "Documents · 0.5kg",
    deliveryDate: "2026-10-04",
    createdTime: "2026-10-02, 07:12",
    timeWaiting: "2h 30m",
    latestActivity: "Offer submitted. Waiting for a response.",
    activityTimeline: [
      {
        id: "act-1",
        time: "1:05 pm",
        title: "Offer Submitted",
        subtitle: "Jane Cooper · ₦8,500",
        type: "submitted",
      },
      {
        id: "act-2",
        time: "1:10 pm",
        title: "Waiting for participant action",
        subtitle: "Waiting for a decision from the participants",
        type: "waiting",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10232",
    displayId: "#BID-10232",
    deliveryId: "#RCV-29843",
    deliveryIdRaw: "RCV-29842",
    sender: {
      name: "Ronald Richards",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Jane Cooper",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 14200,
    senderBudget: 15000,
    originalAmount: 15000,
    negotiatedAmount: 14200,
    status: "Awaiting Decision",
    type: "Traveler offer",
    route: "Lagos → Abuja",
    packageDetails: "Documents · 0.5kg",
    deliveryDate: "2026-10-04",
    createdTime: "2026-10-02, 07:12",
    timeWaiting: "2h 30m",
    latestActivity: "Offer submitted. Waiting for a response.",
    activityTimeline: [
      {
        id: "act-201",
        time: "1:05 pm",
        title: "Offer Submitted",
        subtitle: "Jane Cooper · ₦8,500",
        type: "submitted",
      },
      {
        id: "act-202",
        time: "1:10 pm",
        title: "Waiting for participant action",
        subtitle: "Waiting for a decision from the participants",
        type: "waiting",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10233",
    displayId: "#BID-10233",
    deliveryId: "#RCV-29847",
    deliveryIdRaw: "RCV-29847",
    sender: {
      name: "Marvin McKinney",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Bessie Cooper",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 6300,
    senderBudget: 6000,
    originalAmount: 6000,
    negotiatedAmount: 6300,
    status: "Withdrawn",
    type: "Courier offer",
    route: "Ibadan → Lagos",
    packageDetails: "Electronics · 1.2kg",
    deliveryDate: "2026-10-05",
    createdTime: "2026-10-01, 14:20",
    timeWaiting: "Withdrawn after 45m",
    latestActivity: "Bid withdrawn by courier due to schedule conflict.",
    activityTimeline: [
      {
        id: "act-301",
        time: "2:20 pm",
        title: "Offer Submitted",
        subtitle: "Bessie Cooper · ₦6,300",
        type: "submitted",
      },
      {
        id: "act-302",
        time: "3:05 pm",
        title: "Offer Withdrawn",
        subtitle: "Courier cancelled offer before acceptance",
        type: "declined",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10234",
    displayId: "#BID-10234",
    deliveryId: "#RCV-29846",
    deliveryIdRaw: "RCV-29846",
    sender: {
      name: "Floyd Miles",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Darlene Robertson",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 11750,
    senderBudget: 12000,
    originalAmount: 12000,
    negotiatedAmount: 11750,
    status: "Accepted",
    type: "Courier offer",
    route: "Port Harcourt → Owerri",
    packageDetails: "Fragile items · 2.0kg",
    deliveryDate: "2026-10-03",
    createdTime: "2026-10-02, 11:15",
    timeWaiting: "Matched in 12m",
    latestActivity: "Offer accepted by sender. Courier assigned.",
    activityTimeline: [
      {
        id: "act-401",
        time: "11:15 am",
        title: "Offer Submitted",
        subtitle: "Darlene Robertson · ₦11,750",
        type: "submitted",
      },
      {
        id: "act-402",
        time: "11:27 am",
        title: "Offer Accepted",
        subtitle: "Sender confirmed terms and funded escrow",
        type: "accepted",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10235",
    displayId: "#BID-10235",
    deliveryId: "#RCV-29845",
    deliveryIdRaw: "RCV-29845",
    sender: {
      name: "Darlene Robertson",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Jacob Jones",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 4900,
    senderBudget: 5200,
    originalAmount: 5200,
    negotiatedAmount: 4900,
    status: "Awaiting Decision",
    type: "Trip Request",
    route: "Enugu → Asaba",
    packageDetails: "Clothing · 0.8kg",
    deliveryDate: "2026-10-06",
    createdTime: "2026-10-03, 09:30",
    timeWaiting: "1h 15m",
    latestActivity: "Trip request open. Waiting for counter-confirmation.",
    activityTimeline: [
      {
        id: "act-501",
        time: "9:30 am",
        title: "Trip Request Logged",
        subtitle: "Jacob Jones requested parcel match",
        type: "submitted",
      },
      {
        id: "act-502",
        time: "9:45 am",
        title: "Waiting for participant action",
        subtitle: "Awaiting response from Darlene Robertson",
        type: "waiting",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10236",
    displayId: "#BID-10236",
    deliveryId: "#RCV-29844",
    deliveryIdRaw: "RCV-29844",
    sender: {
      name: "Savannah Nguyen",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Leslie Alexander",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 19000,
    senderBudget: 13500,
    originalAmount: 13500,
    negotiatedAmount: 19000,
    status: "Unmatched Request",
    type: "Courier offer",
    route: "Abuja → Kano",
    packageDetails: "Medical Supplies · 3.5kg",
    deliveryDate: "2026-10-07",
    createdTime: "2026-10-03, 16:45",
    timeWaiting: "Expired after 4h",
    latestActivity: "Budget gap exceeded threshold. No agreement reached.",
    activityTimeline: [
      {
        id: "act-601",
        time: "4:45 pm",
        title: "Offer Submitted",
        subtitle: "Leslie Alexander · ₦19,000",
        type: "submitted",
      },
      {
        id: "act-602",
        time: "8:45 pm",
        title: "Request Expired Unmatched",
        subtitle: "Offer price exceeded sender ceiling",
        type: "declined",
      },
    ],
    auditLogs: [],
  },
  // Additional items for pages 2 & 3
  {
    id: "BID-10237",
    displayId: "#BID-10237",
    deliveryId: "#RCV-29848",
    deliveryIdRaw: "RCV-29848",
    sender: {
      name: "Eleanor Pena",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Guy Hawkins",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 7800,
    senderBudget: 8000,
    originalAmount: 8000,
    negotiatedAmount: 7800,
    status: "Matched",
    type: "Traveler offer",
    route: "Lagos → Ibadan",
    packageDetails: "Fashion wear · 1.5kg",
    deliveryDate: "2026-10-05",
    createdTime: "2026-10-03, 10:12",
    timeWaiting: "Matched in 18m",
    latestActivity: "Match finalized. Pickup scheduled.",
    activityTimeline: [
      {
        id: "act-701",
        time: "10:12 am",
        title: "Offer Submitted",
        subtitle: "Guy Hawkins · ₦7,800",
        type: "submitted",
      },
    ],
    auditLogs: [],
  },
  {
    id: "BID-10238",
    displayId: "#BID-10238",
    deliveryId: "#RCV-29849",
    deliveryIdRaw: "RCV-29849",
    sender: {
      name: "Kristin Watson",
      role: "Sender",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    courier: {
      name: "Cody Fisher",
      role: "Courier",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&auto=format&fit=crop&q=80",
      isVerified: true,
    },
    bidAmount: 12500,
    senderBudget: 12500,
    originalAmount: 12500,
    negotiatedAmount: 12500,
    status: "Accepted",
    type: "Trip Request",
    route: "Benin City → Warri",
    packageDetails: "Automotive Parts · 4.0kg",
    deliveryDate: "2026-10-06",
    createdTime: "2026-10-03, 12:00",
    timeWaiting: "Matched in 25m",
    latestActivity: "Accepted and waiting for departure.",
    activityTimeline: [],
    auditLogs: [],
  },
];
