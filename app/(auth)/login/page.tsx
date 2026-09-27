"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("emmanuel@racvest.com");
  const [password, setPassword] = React.useState("••••••••••••");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sign-in transition
    setTimeout(() => {
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8F9FA]">
      {/* Left Pane - High Impact Courier Rider Photography */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-900">
        <Image
          src="/images/courier-login.jpg"
          alt="Racvest Courier Rider on Motorcycle"
          fill
          priority
          className="object-cover object-center brightness-95 contrast-105"
        />
        {/* Subtle Brand Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col justify-between p-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#0A3323] flex items-center justify-center text-amber-400 font-extrabold text-xl shadow-md border border-emerald-600/40">
              R
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              RAC<span className="text-emerald-400">VEST</span>
            </span>
          </div>

          <div className="max-w-md">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
              Operations & Dispatch Portal
            </p>
            <h2 className="text-3xl font-bold text-white leading-tight">
              Powering on-demand courier logistics and nationwide package delivery.
            </h2>
          </div>
        </div>
      </div>

      {/* Right Pane - Centered Auth Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to access your administrative operations dashboard
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Username or Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 tracking-wide"
              >
                Username or Email Address
              </label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 px-3 text-sm text-gray-900 border-gray-200 focus-visible:ring-[#0A3323]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 tracking-wide"
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
                  className="h-11 px-3 pr-10 text-sm text-gray-900 border-gray-200 focus-visible:ring-[#0A3323]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
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

            {/* Submit Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#0A3323] hover:bg-[#0E4430] text-white font-semibold rounded-lg shadow-sm transition-all text-sm mt-2"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Lost your password link */}
            <div className="text-center pt-2">
              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 hover:text-[#0A3323] transition-colors"
              >
                Lost your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
