import * as React from "react";
import { UserDetailView } from "@/features/users";

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: "sender" | "traveler" | "courier" }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <UserDetailView
      userId={resolvedParams.id}
      initialRole={resolvedSearchParams.role || "sender"}
    />
  );
}
