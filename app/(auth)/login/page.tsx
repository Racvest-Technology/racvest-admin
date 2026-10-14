"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [identity, setIdentity] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim() || !password.trim()) {
      toast.error("Please enter your username/email and password");
      return;
    }

    setIsLoading(true);
    toast.success("Welcome back! Redirecting to operations portal...");
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

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

        {/* White Login Card */}
        <div className="w-full max-w-[360px] bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#EBEBE4]">
          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Username or Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-[#171713]"
              >
                Username or Email Adress
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter Username or Email Address"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                autoComplete="username"
                required
                className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg px-3 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
              />
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
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-10 text-xs sm:text-sm text-[#171713] placeholder:text-[#A7A79D] border-[#E3E3DC] rounded-lg pl-3 pr-10 focus-visible:ring-1 focus-visible:ring-[#014D21] focus-visible:border-[#014D21]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-1 bg-[#014D21] hover:bg-[#01451E] active:bg-[#013A19] text-white font-semibold rounded-lg shadow-none text-sm transition-colors cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

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
