"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { Loader2, Copy, Check, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mfaEnrollConfirmAction } from "@/features/auth/actions/mfa-actions";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Step = "qr" | "recovery";

interface MfaEnrollFormProps {
  secret: string;
  otpauthUri: string;
}

export function MfaEnrollForm({ secret, otpauthUri }: MfaEnrollFormProps) {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("qr");
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = React.useState<string[]>([]);
  const [copiedSecret, setCopiedSecret] = React.useState(false);
  const [copiedCodes, setCopiedCodes] = React.useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits, max 6
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    if (error) setError(null);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the 6-digit code from your authenticator app.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await mfaEnrollConfirmAction(code);
      if (!result.success) {
        setError(result.error ?? "Invalid code. Please try again.");
        return;
      }
      setRecoveryCodes(result.recoveryCodes ?? []);
      setStep("recovery");
      toast.success("Authenticator app connected successfully!");
    } catch (err: unknown) {
      if (isRedirectError(err)) throw err;
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = async () => {
    await navigator.clipboard.writeText(secret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const copyRecoveryCodes = async () => {
    await navigator.clipboard.writeText(recoveryCodes.join("\n"));
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
    toast.success("Recovery codes copied to clipboard.");
  };

  // ── Step 1: Scan QR + enter code ──────────────────────────────────────────
  if (step === "qr") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-11 h-11 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-5 h-5 text-[#014D21]" />
          </div>
          <h1 className="text-xl font-bold text-[#171713]">
            Set Up Authenticator
          </h1>
          <p className="text-sm text-[#66665D]">
            Scan this QR code with Google Authenticator, Authy, or any TOTP
            app. Then enter the 6-digit code to confirm.
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-xl border border-[#E3E3DC] inline-block">
            <QRCode
              value={otpauthUri}
              size={180}
              fgColor="#171713"
              bgColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Manual entry */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#171713]">
            Can&apos;t scan? Enter this key manually:
          </p>
          <div className="flex items-center gap-2 bg-[#F7F7F3] border border-[#E3E3DC] rounded-lg px-3 py-2">
            <code className="flex-1 text-xs font-mono text-[#171713] break-all">
              {secret}
            </code>
            <button
              type="button"
              onClick={copySecret}
              className="shrink-0 text-[#85857B] hover:text-[#014D21] transition-colors p-1"
              aria-label="Copy secret key"
            >
              {copiedSecret ? (
                <Check className="w-4 h-4 text-[#014D21]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Code entry */}
        <form onSubmit={handleConfirm} className="space-y-3">
          <div className="space-y-1.5">
            <label
              htmlFor="totp-code"
              className="block text-xs font-semibold text-[#171713]"
            >
              6-Digit Code
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
              aria-invalid={Boolean(error)}
              className="h-10 text-center text-lg tracking-[0.4em] font-mono text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
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
              "Confirm & Continue"
            )}
          </Button>
        </form>
      </div>
    );
  }

  // ── Step 2: Show recovery codes ───────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <div className="w-11 h-11 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-5 h-5 text-[#014D21]" />
        </div>
        <h1 className="text-xl font-bold text-[#171713]">Save Recovery Codes</h1>
        <p className="text-sm text-[#66665D]">
          These codes can be used to access your account if you lose your
          authenticator. Store them somewhere safe —{" "}
          <strong className="text-[#171713]">they will not be shown again.</strong>
        </p>
      </div>

      {/* Recovery code grid */}
      <div className="bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl p-4">
        <div className="grid grid-cols-2 gap-2">
          {recoveryCodes.map((code) => (
            <code
              key={code}
              className="text-xs font-mono text-[#171713] text-center bg-white border border-[#E3E3DC] rounded-md px-2 py-1.5"
            >
              {code}
            </code>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={copyRecoveryCodes}
          className="w-full h-10 border-[#E3E3DC] text-[#171713] hover:bg-[#F7F7F3] font-semibold rounded-lg text-sm flex items-center justify-center gap-2"
        >
          {copiedCodes ? (
            <>
              <Check className="w-4 h-4 text-[#014D21]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Codes</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          onClick={() => {
            router.replace("/");
            router.refresh();
          }}
          className="w-full h-10 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm cursor-pointer"
        >
          I&apos;ve Saved My Codes — Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

