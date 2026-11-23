"use client";

import * as React from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mfaVerifyAction } from "@/features/auth/actions/mfa-actions";

export function MfaVerifyForm() {
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter your 6-digit authenticator code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await mfaVerifyAction(code);
      // mfaVerifyAction calls redirect() on success — if we get here it errored.
      if (!result.success) {
        setError(result.error ?? "Invalid or expired code. Please try again.");
      }
    } catch (err: unknown) {
      if (isRedirectError(err)) throw err;
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="w-11 h-11 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-5 h-5 text-[#014D21]" />
        </div>
        <h1 className="text-xl font-bold text-[#171713]">
          Two-Factor Authentication
        </h1>
        <p className="text-sm text-[#66665D]">
          Open your authenticator app and enter the 6-digit code for Racvest
          Admin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label
            htmlFor="totp-code"
            className="block text-xs font-semibold text-[#171713]"
          >
            Authenticator Code
          </label>
          <Input
            id="totp-code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={code}
            onChange={handleCodeChange}
            disabled={isLoading}
            maxLength={6}
            autoComplete="one-time-code"
            autoFocus
            aria-invalid={Boolean(error)}
            className="h-12 text-center text-2xl tracking-[0.5em] font-mono text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
          />
          {error && (
            <p className="text-[11px] font-medium text-[#EA3829]">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="w-full h-10 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify & Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-[#A7A79D]">
        Lost access to your authenticator?{" "}
        <a
          href="/login"
          className="text-[#66665D] hover:text-[#171713] underline transition-colors"
        >
          Back to Sign In
        </a>
      </p>
    </div>
  );
}

