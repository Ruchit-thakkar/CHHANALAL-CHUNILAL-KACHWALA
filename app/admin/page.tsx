"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace("/admin/dashboard");
        } else {
          setCheckingAuth(false);
        }
      })
      .catch(() => setCheckingAuth(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!adminId.trim() || !password) {
      setError("Please enter both Admin ID and Password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid Admin ID or Password");
      }

      // Successful authentication -> redirect to dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#9A7D4A] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Bar Link back to Public Site */}
      <div className="max-w-md w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#66635E] hover:text-[#171717] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Studio Website</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white border border-[#D9D4CB] p-8 sm:p-10 shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B99A63] block mb-1.5">
            Internal Studio Portal
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] uppercase">
            Admin Login
          </h1>
          <p className="text-xs text-[#66635E] mt-2 font-light">
            Sign in to manage customer project inquiries and follow-ups.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="adminId"
              className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
            >
              Admin ID
            </label>
            <div className="relative">
              <input
                id="adminId"
                type="text"
                autoComplete="username"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#D9D4CB] text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] transition-colors"
              />
              <User className="w-4 h-4 text-[#9A7D4A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#D9D4CB] text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] transition-colors"
              />
              <Lock className="w-4 h-4 text-[#9A7D4A] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full group inline-flex items-center justify-center bg-[#171717] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#B99A63] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-[#66635E] font-light">
        <p>© 2026 Chhanalal Chunilal Kachwala. Authorized Personnel Only.</p>
      </div>
    </div>
  );
}
