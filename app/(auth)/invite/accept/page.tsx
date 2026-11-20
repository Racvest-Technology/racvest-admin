"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsString } from "nuqs";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  acceptInvitationAction,
  acceptInvitationInputSchema,
  type AcceptInvitationInput,
} from "@/features/auth";

function AcceptInvitationFormContent() {
  const router = useRouter();

  // Read `?token=...` from URL (e.g. /invite/accept?token=275e4be9987342c7874a883054d5d55f)
  const [token] = useQueryState("token", parseAsString.withDefault(""));

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof AcceptInvitationInput, string>>
  >({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [registeredEmail, setRegisteredEmail] = React.useState<string | null>(
    null
  );
  const [isAccepted, setIsAccepted] = React.useState(false);

  const hasValidToken = token.trim().length > 0;

  const handleAcceptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = acceptInvitationInputSchema.safeParse({
      token,
      phoneNumber,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof AcceptInvitationInput, string>> =
        {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof AcceptInvitationInput | undefined;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      toast.error(
        parsed.error.issues[0]?.message ??
          "Please verify your registration details"
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await acceptInvitationAction(parsed.data);

      if (!result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        toast.error(
          result.error ?? "Unable to accept invitation. Link may have expired."
        );
        return;
      }

      setRegisteredEmail(result.data?.email ?? null);
      setIsAccepted(true);
      toast.success(
        result.message ?? "Invitation accepted! Redirecting to sign in..."
      );

      const loginUrl = result.data?.email
        ? `/login?email=${encodeURIComponent(result.data.email)}`
        : "/login";

      setTimeout(() => {
        router.push(loginUrl);
      }, 1500);
    } catch {
      toast.error("Unable to complete invitation acceptance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasValidToken) {
    return (
      <div className="w-full max-w-[390px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4] text-center space-y-4">
        <div className="w-11 h-11 rounded-full bg-[#FEF2F2] text-[#EA3829] flex items-center justify-center mx-auto">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#171713]">
            Missing Invitation Token
          </h2>
          <p className="text-xs text-[#66665D] leading-relaxed">
            This invitation link is incomplete or invalid. Please open the exact{" "}
            <span className="font-semibold text-[#171713]">
              Accept invitation
            </span>{" "}
            link from your invitation email.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full h-10 bg-[#014D21] hover:bg-[#01451E] text-white font-semibold rounded-lg text-xs cursor-pointer"
        >
          Go to Sign in
        </Button>
      </div>
    );
  }

  if (isAccepted) {
    const loginHref = registeredEmail
      ? `/login?email=${encodeURIComponent(registeredEmail)}`
      : "/login";

    return (
      <div className="w-full max-w-[390px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4] text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#ECFDF3] text-[#014D21] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-[#171713]">
            Welcome to the Team!
          </h2>
          <p className="text-xs text-[#66665D] leading-relaxed">
            Your Racvest admin credentials have been set up
            {registeredEmail ? (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-[#171713]">
                  {registeredEmail}
                </span>
              </>
            ) : null}
            . Redirecting you to sign in...
          </p>
        </div>
        <Button
          type="button"
          onClick={() => router.push(loginHref)}
          className="w-full h-10 bg-[#014D21] hover:bg-[#01451E] text-white font-semibold rounded-lg text-xs cursor-pointer"
        >
          Continue to Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
      <form onSubmit={handleAcceptSubmit} className="space-y-4" noValidate>
        {/* Phone Number */}
        <div className="space-y-1.5">
          <label
            htmlFor="phoneNumber"
            className="block text-xs font-semibold text-[#171713]"
          >
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+234 800 000 0000"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (fieldErrors.phoneNumber) {
                setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
              }
            }}
            autoComplete="tel"
            disabled={isLoading}
            required
            aria-invalid={Boolean(fieldErrors.phoneNumber)}
            className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg px-3 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
          />
          {fieldErrors.phoneNumber && (
            <p className="text-[11px] font-medium text-[#EA3829]">
              {fieldErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-[#171713]"
          >
            Create Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              autoComplete="new-password"
              disabled={isLoading}
              required
              aria-invalid={Boolean(fieldErrors.password)}
              className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg pl-3 pr-10 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#85857B] hover:text-[#171713] transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-[11px] font-medium text-[#EA3829]">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-semibold text-[#171713]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }
              }}
              autoComplete="new-password"
              disabled={isLoading}
              required
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg pl-3 pr-10 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#85857B] hover:text-[#171713] transition-colors p-1"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-[11px] font-medium text-[#EA3829]">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 mt-1 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Completing registration...</span>
            </>
          ) : (
            "Accept invitation & step in"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function AcceptInvitationPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#F7F7F3]">
      {/* Left Pane - Courier Motorcycle Rider Photography */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen overflow-hidden">
        <Image
          src="/images/login.webp"
          alt="Racvest Courier Rider"
          fill
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Pane - Invitation Onboarding Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-[#F7F7F3]">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-6 flex justify-center">
          <Logo width={150} height={28} />
        </div>

        {/* Invitation Pill Badge matching email template */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EC] text-[#014D21] text-[10px] font-bold tracking-wider uppercase mb-3">
          <span>YOU&apos;VE BEEN INVITED</span>
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Header Title & Subtitle */}
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#171713] tracking-tight font-primary text-center mb-1.5">
          Accept Your Invitation
        </h1>
        <p className="text-xs text-[#66665D] text-center max-w-xs mb-6 leading-relaxed">
          Set your password and phone number to complete your Racvest admin
          registration.
        </p>

        {/* White Card wrapped in Suspense for Nuqs useSearchParams */}
        <React.Suspense
          fallback={
            <div className="w-full max-w-[390px] h-[320px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4] animate-pulse" />
          }
        >
          <AcceptInvitationFormContent />
        </React.Suspense>

        {/* Back to sign in link */}
        <div className="text-center mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#66665D] hover:text-[#171713] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
