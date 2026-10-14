"use client";

import * as React from "react";
import {
  MOCK_SENDERS,
  MOCK_TRAVELERS,
  MOCK_COURIERS,
} from "../data/mock-users";
import {
  DocumentPreviewDialog,
  CompareDocumentsDialog,
  SendMessageDialog,
  VerifyIdentityDialog,
  VerifyVehicleDialog,
  RequestReverificationDialog,
  DEFAULT_IDENTITY_REVERIFY_ITEMS,
  DEFAULT_VEHICLE_REVERIFY_ITEMS,
} from "@/components/shared";
import { toast } from "sonner";
import { useDialogManager } from "@/hooks";
import { UserDetailHeader } from "./user-detail-header";
import { UserProfileCard } from "./user-profile-card";
import { UserMetricCards } from "./user-metric-cards";
import { UserWalletCard } from "./user-wallet-card";
import { UserKycDocuments } from "./user-kyc-documents";
import { UserAccountActivity } from "./user-account-activity";
import { UserVehicleInfo } from "./user-vehicle-info";
import { UserDeliveryHistory } from "./user-delivery-history";

export interface UserDetailViewProps {
  userId?: string;
  initialRole?: "sender" | "traveler" | "courier";
  initialVerified?: boolean;
}

type DialogName =
  | "sendMessage"
  | "verifyIdentity"
  | "verifyDocuments"
  | "reverifyIdentity"
  | "reverifyVehicle"
  | "compare";

const DIALOG_NAMES: readonly DialogName[] = [
  "sendMessage",
  "verifyIdentity",
  "verifyDocuments",
  "reverifyIdentity",
  "reverifyVehicle",
  "compare",
] as const;

export function UserDetailView({
  userId,
  initialRole = "sender",
  initialVerified,
}: UserDetailViewProps) {
  const isCourier = initialRole === "courier";
  const isTraveler = initialRole === "traveler";
  const isSender = initialRole === "sender";

  const matchedUser = React.useMemo(() => {
    if (!userId) return null;
    const pool = isCourier ? MOCK_COURIERS : isTraveler ? MOCK_TRAVELERS : MOCK_SENDERS;
    return pool.find((u) => u.id === userId) || null;
  }, [userId, isCourier, isTraveler]);

  // Verification state
  const [isVerified, setIsVerified] = React.useState<boolean>(() => {
    if (initialVerified !== undefined) return initialVerified;
    if (matchedUser) return matchedUser.verification === "Verified";
    return false;
  });

  const [vehicleVerifiedOverride, setVehicleVerifiedOverride] =
    React.useState<boolean | null>(null);
  const vehicleVerified =
    vehicleVerifiedOverride !== null ? vehicleVerifiedOverride : isVerified;

  const handleToggleVerification = (val: boolean) => {
    setIsVerified(val);
    setVehicleVerifiedOverride(val);
  };

  // Dialog management
  const dialogs = useDialogManager<DialogName>(DIALOG_NAMES);

  // Document preview state
  const [previewDoc, setPreviewDoc] = React.useState<{
    image: string;
    title: string;
    isNationalIdCard?: boolean;
    showCompare?: boolean;
  } | null>(null);

  // Derived user fields
  const userName = matchedUser?.name || (isCourier ? "Samuel Adeyemi" : isTraveler ? "Lara O. Ibrahim" : "Liam Johnson");
  const userEmail = matchedUser?.email || (isCourier ? "samueladeyemi@gmail.com" : isTraveler ? "laraoibrahim@gmail.com" : "liam.johnson@gmail.com");
  const userPhone = isCourier ? "+2348135894306" : isTraveler ? "+2348195804406" : "+2348136804206";
  const userAvatar = matchedUser?.avatar || (isCourier
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
    : isTraveler
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80");
  const livenessPhoto = isCourier
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80";
  const reviewedBy = isCourier ? "Adam Bello" : "Liam Johnson";
  const roleLabel = isCourier ? "Courier · Lagos, Nigeria" : isTraveler ? "Traveler · Lagos, Nigeria" : "Sender · Lagos, Nigeria";
  const backLink = isCourier ? "/users?tab=courier" : isTraveler ? "/users?tab=traveler" : "/users?tab=sender";
  const backLabel = isCourier ? "Back to Courier" : isTraveler ? "Back to Traveler" : "Back to senders";

  // Action handlers
  const handleVerifyIdentity = () => {
    setIsVerified(true);
    setVehicleVerifiedOverride(true);
    toast.success("User identity verified successfully! Account status updated.");
  };

  const handleVerifyDocuments = () => {
    setVehicleVerifiedOverride(true);
    toast.success("Vehicle documents verified successfully!");
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-16 font-body">

      {/* 1. Top Bar */}
      <UserDetailHeader
        backLink={backLink}
        backLabel={backLabel}
        isVerified={isVerified}
        onToggleVerification={handleToggleVerification}
        onSendMessage={() => dialogs.open("sendMessage")}
      />

      {/* 2. Profile Card + Health Deck */}
      <UserProfileCard
        userName={userName}
        userEmail={userEmail}
        userPhone={userPhone}
        userAvatar={userAvatar}
        roleLabel={roleLabel}
        isCourier={isCourier}
        isVerified={isVerified}
      />

      {/* 3. Metrics + Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8">
          <UserMetricCards isSender={isSender} isVerified={isVerified} />
        </div>
        <UserWalletCard isSender={isSender} isVerified={isVerified} />
      </div>

      {/* 4. KYC Docs + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <UserKycDocuments
          isVerified={isVerified}
          livenessPhoto={livenessPhoto}
          reviewedBy={reviewedBy}
          onPreviewDocument={setPreviewDoc}
          onRequestReverification={() => dialogs.open("reverifyIdentity")}
          onVerifyIdentity={() => dialogs.open("verifyIdentity")}
        />
        <UserAccountActivity isVerified={isVerified} isSender={isSender} />
      </div>

      {/* 5. Vehicle Info (Courier only) */}
      {isCourier && (
        <UserVehicleInfo
          isVerified={vehicleVerified}
          userAvatar={userAvatar}
          onPreviewDocument={setPreviewDoc}
          onRequestReverification={() => dialogs.open("reverifyVehicle")}
          onVerifyDocuments={() => dialogs.open("verifyDocuments")}
        />
      )}

      {/* 6. Delivery History */}
      <UserDeliveryHistory isSender={isSender} isVerified={isVerified} />

      {/* ─── Dialogs ─────────────────────────────── */}
      {previewDoc && (
        <DocumentPreviewDialog
          isOpen={Boolean(previewDoc)}
          onClose={() => setPreviewDoc(null)}
          image={previewDoc.image}
          title={previewDoc.title}
          isNationalIdCard={previewDoc.isNationalIdCard}
          showCompareButton={previewDoc.showCompare !== false}
          onCompare={() => {
            setPreviewDoc(null);
            dialogs.open("compare");
          }}
        />
      )}

      <CompareDocumentsDialog
        isOpen={dialogs.isOpen("compare")}
        onClose={() => dialogs.close("compare")}
        livenessImage={livenessPhoto}
        idCardImage={livenessPhoto}
        userName={userName}
        onApprove={handleVerifyIdentity}
        onRequestReverification={() => dialogs.open("reverifyIdentity")}
      />

      <SendMessageDialog
        isOpen={dialogs.isOpen("sendMessage")}
        onClose={() => dialogs.close("sendMessage")}
        recipient={{ name: userName, role: roleLabel, email: userEmail, avatar: userAvatar }}
        defaultSubject={!isVerified ? "Verification Update Required" : ""}
        defaultMessage={
          !isVerified
            ? `Hi ${userName.split(" ")[0]},\n\nWe noticed that your identity verification is incomplete. Please log in to your Racvest account and complete the required verification steps to become an active and available Racvest user.`
            : ""
        }
        onMessageSent={({ method }) => {
          toast.success(`Message sent to ${userName} via ${method === "email" ? "email" : "push notification"}!`);
        }}
      />

      <VerifyIdentityDialog
        isOpen={dialogs.isOpen("verifyIdentity")}
        onClose={() => dialogs.close("verifyIdentity")}
        userName={userName}
        items={[
          { id: "liveness", label: "Liveness Check" },
          { id: "governmentId", label: "Government ID" },
        ]}
        onVerified={handleVerifyIdentity}
      />

      <VerifyVehicleDialog
        isOpen={dialogs.isOpen("verifyDocuments")}
        onClose={() => dialogs.close("verifyDocuments")}
        userName={userName}
        onVerified={handleVerifyDocuments}
      />

      <RequestReverificationDialog
        isOpen={dialogs.isOpen("reverifyIdentity")}
        onClose={() => dialogs.close("reverifyIdentity")}
        userName={userName}
        items={DEFAULT_IDENTITY_REVERIFY_ITEMS}
        onRequestSent={({ selectedItems }) => {
          toast.success(`Re-verification request sent to ${userName} for ${selectedItems.length} items.`);
        }}
      />

      <RequestReverificationDialog
        isOpen={dialogs.isOpen("reverifyVehicle")}
        onClose={() => dialogs.close("reverifyVehicle")}
        userName={userName}
        items={DEFAULT_VEHICLE_REVERIFY_ITEMS}
        defaultReason="The vehicle plate number in your submitted documents does not match the vehicle information on your account. Please update and resubmit the correct document."
        onRequestSent={({ selectedItems }) => {
          toast.success(`Vehicle re-verification request sent to ${userName} for ${selectedItems.length} items.`);
        }}
      />
    </div>
  );
}
