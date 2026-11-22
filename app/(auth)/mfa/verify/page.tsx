import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

/**
 * MFA Verification Page
 *
 * Reached when the backend returns status: "MFA_REQUIRED".
 * The sessionId is stored in the `racvest_mfa_session` httpOnly cookie.
 *
 * TODO: Implement TOTP code entry and verification using the
 *       sessionId cookie and the backend MFA verify endpoints.
 */
export default function MfaVerifyPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F7F3] px-6 py-12">
      <div className="mb-8">
        <Logo width={150} height={28} />
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4] text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto">
          <svg
            className="w-6 h-6 text-[#014D21]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-[#171713]">
          Two-Factor Verification
        </h1>
        <p className="text-sm text-[#66665D]">
          Enter the code from your authenticator app to continue.
        </p>
        <p className="text-xs text-[#A7A79D]">
          MFA verification flow coming soon.
        </p>

        <Link
          href="/login"
          className="inline-block mt-2 text-xs text-[#014D21] font-semibold underline hover:text-[#01451E] transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

