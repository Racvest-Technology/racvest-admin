"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your registered email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Password reset instructions sent to your email!");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F7F7F3]">
      {/* Left Pane - Courier Motorcycle Rider Photography */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-screen overflow-hidden">
        <Image
          src="/images/auth-rider.png"
          alt="Racvest Courier Rider"
          fill
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/* Right Pane - Reset Password Card */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-[#F7F7F3]">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-6 flex justify-center">
          <Logo width={150} height={28} />
        </div>

        {/* Header Title */}
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#171713] tracking-tight font-primary text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-xs text-[#85857B] text-center max-w-xs mb-6">
          Enter your administrative email to receive a password recovery link
        </p>

        {/* White Reset Card */}
        <div className="w-full max-w-[360px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
          {submitted ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#ECFDF3] text-[#15803D] flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h3 className="text-sm font-semibold text-[#171713]">
                Check your inbox
              </h3>
              <p className="text-xs text-[#66665D]">
                We sent a password reset link to{" "}
                <span className="font-semibold text-[#171713]">{email}</span>.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSubmitted(false)}
                className="w-full h-10 text-xs text-[#171713] border-[#E3E3DC] rounded-lg mt-2"
              >
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-semibold text-[#171713]"
                >
                  Email Address
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="admin@racvest.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg px-3 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 mt-1 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm transition-colors cursor-pointer"
              >
                {isLoading ? "Sending link..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>

        {/* Back to sign in link */}
        <div className="text-center mt-10">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#66665D] hover:text-[#171713] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
