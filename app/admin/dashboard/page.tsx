"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Inbox,
  AlertCircle,
  PhoneCall,
  Clock,
  CheckCircle2,
  Eye,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import InquiryDetailModal, { InquiryItem } from "@/components/admin/InquiryDetailModal";

interface StatsData {
  total: number;
  not_contacted: number;
  contacted: number;
  follow_up: number;
  completed: number;
  cancelled: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    not_contacted: 0,
    contacted: 0,
    follow_up: 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, inquiriesRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/inquiries?limit=8&sort=newest"),
      ]);

      const statsData = await statsRes.json();
      const inquiriesData = await inquiriesRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      if (inquiriesData.success) {
        setRecentInquiries(inquiriesData.inquiries || []);
      }
    } catch {
      // Handle fetch error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDetail = (inquiry: InquiryItem) => {
    setSelectedInquiry(inquiry);
    setIsDetailOpen(true);
  };

  const statCards = [
    {
      label: "Total Inquiries",
      value: stats.total,
      icon: Inbox,
      color: "text-[#171717]",
      bgColor: "bg-white",
      borderColor: "border-[#D9D4CB]",
    },
    {
      label: "Not Contacted",
      value: stats.not_contacted,
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-200",
      highlight: stats.not_contacted > 0,
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: PhoneCall,
      color: "text-blue-600",
      bgColor: "bg-blue-50/50",
      borderColor: "border-blue-200",
    },
    {
      label: "Follow Up",
      value: stats.follow_up,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50/50",
      borderColor: "border-purple-200",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
            Overview
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#171717]">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#66635E] font-light mt-1">
            Manage customer project inquiries, direct estimations, and follow-ups.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchData()}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 bg-white border border-[#D9D4CB] hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/dashboard/inquiries"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 bg-white border border-[#D9D4CB] hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Online Inquiries</span>
          </Link>

          <Link
            href="/admin/dashboard/direct-estimation"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-[#171717] text-white hover:bg-[#B99A63] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Direct Estimations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Live KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`p-5 border transition-all ${card.bgColor} ${card.borderColor} shadow-2xs relative`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E]">
                  {card.label}
                </span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>

              <div className="font-heading text-3xl font-bold text-[#171717]">
                {loading ? "..." : card.value}
              </div>

              {card.highlight && (
                <div className="mt-2 flex items-center space-x-1 text-[10px] text-amber-700 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span>Requires immediate attention</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white border border-[#D9D4CB] shadow-xs">
        <div className="p-5 sm:p-6 border-b border-[#D9D4CB] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-[#171717]">
              Recent Online Inquiries
            </h2>
            <p className="text-xs text-[#66635E] font-light">
              Latest client submissions sorted newest first.
            </p>
          </div>

          <Link
            href="/admin/dashboard/inquiries"
            className="text-xs uppercase tracking-wider font-semibold text-[#B99A63] hover:text-[#9A7D4A] transition-colors"
          >
            View All Inquiries →
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-[#66635E]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#9A7D4A]" />
            <span>Loading inquiries from database...</span>
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="w-10 h-10 text-[#D9D4CB] mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold text-[#171717] mb-1">
              No Inquiries Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#66635E] font-light max-w-sm mx-auto">
              Customer project requests will appear here after someone submits the
              online inquiry form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#D9D4CB] text-[11px] uppercase tracking-wider font-semibold text-[#66635E]">
                  <th className="py-3 px-4 sm:px-6">Inquiry ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D4CB]/60 text-xs text-[#171717]">
                {recentInquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(inquiry)}
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-heading font-bold text-[#171717]">
                      {inquiry.inquiryId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#171717]">
                      {inquiry.name}
                    </td>
                    <td className="py-3.5 px-4 text-[#66635E]">
                      {inquiry.phone}
                    </td>
                    <td className="py-3.5 px-4 text-[#171717]">
                      {inquiry.service}
                    </td>
                    <td className="py-3.5 px-4 text-[#66635E] font-light">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={inquiry.status} />
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(inquiry)}
                        className="inline-flex items-center space-x-1 text-xs font-semibold text-[#B99A63] hover:text-[#9A7D4A] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal Inspector */}
      <InquiryDetailModal
        inquiry={selectedInquiry}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={fetchData}
      />
    </div>
  );
}
