"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Loader2,
} from "lucide-react";

interface AdminSidebarProps {
  unreadCount?: number;
}

export default function AdminSidebar({ unreadCount: propUnreadCount }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(propUnreadCount || 0);

  // Fetch unread count if not provided
  useEffect(() => {
    if (propUnreadCount !== undefined) {
      setUnreadCount(propUnreadCount);
    } else {
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.stats) {
            setUnreadCount(data.stats.not_contacted);
          }
        })
        .catch(() => {});
    }
  }, [propUnreadCount, pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Online Inquiries",
      href: "/admin/dashboard/inquiries",
      icon: Inbox,
      active: pathname.startsWith("/admin/dashboard/inquiries"),
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#111111] text-white px-4 py-3.5 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <Link href="/admin/dashboard" className="flex flex-col">
          <span className="font-heading text-sm font-bold tracking-tight uppercase">
            Chhanalal Chunilal Kachwala
          </span>
          <span className="text-[10px] text-[#B99A63] tracking-widest uppercase">
            Admin CRM
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white hover:text-[#B99A63]"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#111111] text-white border-r border-[#2A2A2A] flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10">
            <h1 className="font-heading text-base font-bold tracking-tight uppercase leading-tight text-white">
              Chhanalal<br />
              Chunilal Kachwala
            </h1>
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#D4BD8E] block mt-1">
              Studio Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-colors ${
                    item.active
                      ? "bg-[#B99A63] text-[#171717]"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        item.active
                          ? "bg-[#171717] text-white"
                          : "bg-[#B99A63] text-[#171717]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Site & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider"
          >
            <span className="font-medium">Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B99A63]" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors uppercase tracking-wider font-semibold disabled:opacity-50 text-left"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}
    </>
  );
}
