import * as React from "react";
import { UserDetailView } from "@/features/users";

export default async function UserDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ role?: "sender" | "traveler" | "courier"; verified?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const initialVerified =
    resolvedSearchParams.verified !== undefined
      ? resolvedSearchParams.verified === "true"
      : undefined;

  return (
    <UserDetailView
      userId={resolvedParams.id}
      initialRole={resolvedSearchParams.role || "sender"}
      initialVerified={initialVerified}
    />
  );
}
