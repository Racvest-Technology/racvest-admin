"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  UserTab,
  UserManagementHeader,
  UserTabNav,
  AllUsersView,
  RoleUsersView,
} from "@/features/users";

function UsersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as UserTab;
  const currentTab: UserTab =
    tabParam && ["all", "sender", "traveler", "courier"].includes(tabParam)
      ? tabParam
      : "all";

  const handleTabChange = (tab: UserTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/users?${params.toString()}`);
  };

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      {/* 1. Header with dynamic title, date picker, refresh, and download report */}
      <UserManagementHeader currentTab={currentTab} />

      {/* 2. Sub-navigation tabs: All Users, Sender, Traveler, Courier */}
      <UserTabNav currentTab={currentTab} onTabChange={handleTabChange} />

      {/* 3. View Content */}
      {currentTab === "all" && <AllUsersView />}
      {currentTab === "sender" && <RoleUsersView role="sender" />}
      {currentTab === "traveler" && <RoleUsersView role="traveler" />}
      {currentTab === "courier" && <RoleUsersView role="courier" />}
    </div>
  );
}

export default function UsersPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 rounded-full border-2 border-[#014D21] border-t-transparent animate-spin" />
        </div>
      }
    >
      <UsersPageContent />
    </React.Suspense>
  );
}
