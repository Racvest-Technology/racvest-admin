import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

/**
 * MFA Enrollment Page
 *
 * Reached when the backend returns status: "MFA_ENROLLMENT_REQUIRED".
 * The sessionId is stored in the `racvest_mfa_session` httpOnly cookie.
 *
 * TODO: Implement TOTP / authenticator-app enrollment flow using the
 *       sessionId cookie and the backend MFA enrollment endpoints.
 */
export default function MfaEnrollPage() {
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-[#171713]">
          Set Up Two-Factor Authentication
        </h1>
        <p className="text-sm text-[#66665D]">
          Your account requires multi-factor authentication enrollment before
          you can access the Racvest admin portal.
        </p>
        <p className="text-xs text-[#A7A79D]">
          MFA enrollment flow coming soon. Contact your administrator if you
          need immediate access.
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

