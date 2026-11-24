"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { loginAction, loginInputSchema } from "@/features/auth";
import { useAuthStore } from "@/stores";

function LoginFormContent() {
  const setSession = useAuthStore((state) => state.setSession);

  // Nuqs URL query state: e.g. /login?callbackUrl=/deliveries&email=admin@racvest.xyz
  const [callbackUrl] = useQueryState(
    "callbackUrl",
    parseAsString.withDefault("/")
  );
  const [emailParam] = useQueryState(
    "email",
    parseAsString.withDefault("")
  );

  const [showPassword, setShowPassword] = React.useState(false);
  const [identifier, setIdentifier] = React.useState(() => emailParam);
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{
    identifier?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = loginInputSchema.safeParse({ identifier, password });
    if (!parsed.success) {
      const nextErrors: { identifier?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if ((key === "identifier" || key === "password") && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      toast.error(
        parsed.error.issues[0]?.message ?? "Please check your login details"
      );
      return;
    }

    const safeRedirect =
      callbackUrl &&
      callbackUrl.startsWith("/") &&
      !callbackUrl.startsWith("/.well-known") &&
      !callbackUrl.startsWith("/mfa") &&
      !callbackUrl.startsWith("/login")
        ? callbackUrl
        : "/";

    setIsLoading(true);
    try {
      // loginAction sets cookies then calls redirect() server-side.
      // On success it never returns — the redirect error propagates here.
      const result = await loginAction(parsed.data, safeRedirect);

      // Only reachable on explicit { success: false } returns (error path).
      if (!result.success) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        toast.error(result.error ?? "Invalid email or password");
        return;
      }

      // Belt-and-suspenders: sync user into client store in case the server
      // action returned without redirecting (should not happen in normal flow).
      if (result.user) {
        setSession(result.user, result.accessToken);
      }

      toast.success(
        result.message ?? "Welcome back! Redirecting to operations portal..."
      );
    } catch (err: unknown) {
      // Next.js redirect() throws a special signal — re-throw it so the
      // router picks it up and performs the navigation.
      if (isRedirectError(err)) throw err;
      toast.error("Unable to complete sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
      <form onSubmit={handleSignIn} className="space-y-4" noValidate>
        {/* Email Address / Identifier */}
        <div className="space-y-1.5">
          <label
            htmlFor="identifier"
            className="block text-xs font-semibold text-[#171713]"
          >
            Email Address
          </label>
          <Input
            id="identifier"
            type="text"
            placeholder="Enter Email Address"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (fieldErrors.identifier) {
                setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
              }
            }}
            autoComplete="username"
            disabled={isLoading}
            required
            aria-invalid={Boolean(fieldErrors.identifier)}
            className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg px-3 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
          />
          {fieldErrors.identifier && (
            <p className="text-[11px] font-medium text-[#EA3829]">
              {fieldErrors.identifier}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-[#171713]"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              autoComplete="current-password"
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 mt-1 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function LoginPage() {
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

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-[#F7F7F3]">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-6 flex justify-center">
          <Logo width={150} height={28} />
        </div>

        {/* Header Title */}
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#171713] tracking-tight font-primary text-center mb-6">
          Welcome Back
        </h1>

        {/* White Login Card wrapped in Suspense for Nuqs useSearchParams */}
        <React.Suspense
          fallback={
            <div className="w-full max-w-[360px] h-[256px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4] animate-pulse" />
          }
        >
          <LoginFormContent />
        </React.Suspense>

        {/* Lost your password link */}
        <div className="text-center mt-10">
          <Link
            href="/forgot-password"
            className="text-xs text-[#66665D] hover:text-[#171713] underline transition-colors"
          >
            Lost your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
