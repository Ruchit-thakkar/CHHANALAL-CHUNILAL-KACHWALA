import React from "react";
import { InquiryStatus } from "@/lib/models/Inquiry";

interface StatusBadgeProps {
  status: InquiryStatus | string;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  switch (status) {
    case "not_contacted":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-amber-100 text-amber-900 border border-amber-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
          Not Contacted
        </span>
      );
    case "contacted":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-blue-100 text-blue-900 border border-blue-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
          Contacted
        </span>
      );
    case "follow_up":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-purple-100 text-purple-900 border border-purple-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5" />
          Follow Up
        </span>
      );
    case "completed":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5" />
          Completed
        </span>
      );
    case "cancelled":
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-stone-100 text-stone-700 border border-stone-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mr-1.5" />
          Cancelled
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800 border border-gray-300 ${className}`}
        >
          {status}
        </span>
      );
  }
}
