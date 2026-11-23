import * as React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { AUTH_COOKIES } from "@/config/constants";
import { mfaEnrollBeginAction } from "@/features/auth/actions/mfa-actions";
import { MfaEnrollForm } from "@/features/auth/components/mfa-enroll-form";

/**
 * MFA Enrollment Page — /mfa/enroll
 *
 * Reached when POST /auth/login returns status: "MFA_ENROLLMENT_REQUIRED".
 * Server-side: reads the mfa session cookie and calls enroll/begin to get
 * the QR code data, then hands off to the client MfaEnrollForm.
 */
export default async function MfaEnrollPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(AUTH_COOKIES.mfaSession)?.value;

  if (!sessionId) {
    redirect("/login");
  }

  const result = await mfaEnrollBeginAction();

  if (!result.success || !result.otpauthUri || !result.secret) {
    // Couldn't start enrollment — send back to login with an error hint.
    redirect("/login?error=mfa_setup_failed");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F7F3] px-6 py-12">
      <div className="mb-8">
        <Logo width={150} height={28} />
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
        <MfaEnrollForm
          secret={result.secret}
          otpauthUri={result.otpauthUri}
        />
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
