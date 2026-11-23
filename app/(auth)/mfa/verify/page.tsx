import * as React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { AUTH_COOKIES } from "@/config/constants";
import { MfaVerifyForm } from "@/features/auth/components/mfa-verify-form";

/**
 * MFA Verify Page — /mfa/verify
 *
 * Reached on subsequent logins when POST /auth/login returns
 * status: "MFA_REQUIRED". The user enters their TOTP code here.
 * The mfa session cookie must be present (set during the initial login).
 */
export default async function MfaVerifyPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIES.mfaSession)?.value;

  if (!sessionId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F7F3] px-6 py-12">
      <div className="mb-8">
        <Logo width={150} height={28} />
      </div>

      <div className="w-full max-w-[380px] bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
        <MfaVerifyForm />
      </div>

      <div className="text-center mt-8">
        <Link
          href="/login"
          className="text-xs text-[#66665D] hover:text-[#171713] underline transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
