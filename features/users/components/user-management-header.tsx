"use client";

import * as React from "react";
import { UserTab } from "../types";
import { PageHeader } from "@/components/shared";

interface UserManagementHeaderProps {
  currentTab: UserTab;
  onRefresh?: () => void;
}

const titles: Record<UserTab, { title: string; subtitle: string }> = {
  all: {
    title: "User Management",
    subtitle: "Manage user accounts, monitor activity, verify identities, and oversee them.",
  },
  sender: {
    title: "Sender",
    subtitle: "Manage sender accounts, monitor activity, verify identities, and oversee Senders.",
  },
  traveler: {
    title: "Traveler",
    subtitle: "Manage traveler accounts, monitor activity, verify identities, and oversee travelers.",
  },
  courier: {
    title: "Courier",
    subtitle: "Manage user accounts, monitor activity, verify identities, and oversee Couriers.",
  },
};

export function UserManagementHeader({
  currentTab,
  onRefresh,
}: UserManagementHeaderProps) {
  const { title, subtitle } = titles[currentTab];

  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      onRefresh={onRefresh}
    />
  );
}
