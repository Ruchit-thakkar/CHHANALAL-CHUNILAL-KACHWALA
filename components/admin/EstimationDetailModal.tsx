"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Calendar,
  Layers,
  FileText,
  Save,
  Loader2,
  Trash2,
  Building,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { EstimationStatus } from "@/lib/models/Estimation";

export interface EstimationItem {
  _id: string;
  estimationId: string;
  name: string;
  phone: string;
  service: string;
  projectType: string;
  dimensionsNotes: string;
  status: EstimationStatus;
  adminNotes?: string;
  contactedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface EstimationDetailModalProps {
  estimation: EstimationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EstimationDetailModal({
  estimation,
  isOpen,
  onClose,
  onUpdate,
}: EstimationDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState<EstimationStatus>("not_contacted");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (estimation) {
      setCurrentStatus(estimation.status);
      setAdminNotes(estimation.adminNotes || "");
    }
  }, [estimation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !estimation) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(estimation.phone);
    setCopied(true);
    showToast("Phone number copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = async (newStatus: EstimationStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/estimations/${estimation._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentStatus(newStatus);
        showToast("Status updated successfully.");
        onUpdate();
      } else {
        showToast(data.error || "Failed to update status");
      }
    } catch {
      showToast("Error updating status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/estimations/${estimation._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Admin notes saved successfully.");
        onUpdate();
      } else {
        showToast(data.error || "Failed to save notes");
      }
    } catch {
      showToast("Error saving notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete estimation ${estimation.estimationId}?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/estimations/${estimation._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onUpdate();
        onClose();
      } else {
        showToast(data.error || "Failed to delete estimation");
      }
    } catch {
      showToast("Error deleting estimation");
    } finally {
      setIsDeleting(false);
    }
  };

  const cleanPhone = estimation.phone.replace(/[^0-9]/g, "");
  const formattedWAPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer / Modal Container */}
      <div className="relative w-full max-w-2xl h-full bg-[#FAF8F5] border-l border-[#D9D4CB] shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#F5F2EC] border-b border-[#D9D4CB] px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A63] block leading-none mb-0.5">
                Direct Estimation
              </span>
              <span className="font-heading text-lg font-bold text-[#171717]">
                {estimation.estimationId}
              </span>
            </div>
            <StatusBadge status={currentStatus} />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-[#66635E] hover:text-red-600 transition-colors"
              title="Delete estimation"
              aria-label="Delete estimation"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#66635E] hover:text-[#171717] transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success / Alert Toast */}
        {toastMessage && (
          <div className="bg-[#171717] text-white text-xs px-6 py-2.5 flex items-center justify-between animate-fadeIn">
            <span>{toastMessage}</span>
            <Check className="w-3.5 h-3.5 text-[#B99A63]" />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Quick Contact Bar */}
          <div className="bg-white border border-[#D9D4CB] p-5 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B99A63] block mb-2">
              Customer Information
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#171717]">
                  {estimation.name}
                </h3>
                <p className="text-sm text-[#66635E] font-medium">{estimation.phone}</p>
                <p className="text-xs text-[#9A7D4A] mt-0.5">
                  Direct Estimation Quote Request
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${estimation.phone}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A63] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>

                <a
                  href={`https://wa.me/${formattedWAPhone}?text=Hello%20${encodeURIComponent(
                    estimation.name
                  )},%20this%20is%20Chhanalal%20Chunilal%20Kachwala%20regarding%20your%20Direct%20Estimation%20quote%20request%20${encodeURIComponent(
                    estimation.estimationId
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white border border-[#D9D4CB] text-[#171717] text-xs font-semibold uppercase tracking-wider hover:border-[#171717] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#66635E]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="bg-white border border-[#D9D4CB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B99A63] block">
                Status Management
              </span>
              {isUpdatingStatus && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9A7D4A]" />
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { label: "Not Contacted", value: "not_contacted" },
                { label: "Contacted", value: "contacted" },
                { label: "Follow Up", value: "follow_up" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleStatusChange(item.value as EstimationStatus)}
                  disabled={isUpdatingStatus}
                  className={`py-2 px-2.5 text-xs font-semibold text-center border transition-all ${
                    currentStatus === item.value
                      ? "border-[#171717] bg-[#171717] text-white shadow-xs"
                      : "border-[#D9D4CB] bg-[#FAF8F5] text-[#66635E] hover:border-[#171717] hover:text-[#171717]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project & Estimation Details */}
          <div className="bg-white border border-[#D9D4CB] p-5 shadow-xs space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B99A63] block">
              Direct Estimation Specifications
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-[#66635E] block font-medium mb-1">
                  Service Required:
                </span>
                <div className="inline-flex items-center space-x-2 text-sm font-heading font-bold text-[#171717]">
                  <Layers className="w-4 h-4 text-[#9A7D4A]" />
                  <span>{estimation.service}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#66635E] block font-medium mb-1">
                  Project Type:
                </span>
                <div className="inline-flex items-center space-x-2 text-sm font-heading font-bold text-[#171717]">
                  <Building className="w-4 h-4 text-[#9A7D4A]" />
                  <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#D9D4CB] text-xs uppercase font-semibold">
                    {estimation.projectType}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-[#66635E] block font-medium mb-1.5">
                Approximate Dimensions / Description / Notes:
              </span>
              <div className="bg-[#FAF8F5] border border-[#D9D4CB] p-4 text-xs sm:text-sm text-[#171717] leading-relaxed whitespace-pre-wrap min-h-[60px]">
                {estimation.dimensionsNotes || (
                  <span className="text-[#66635E]/60 italic">No additional dimensions or notes specified by client.</span>
                )}
              </div>
            </div>
          </div>

          {/* Private Admin Notes */}
          <div className="bg-white border border-[#D9D4CB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#B99A63] block">
                Private Admin Notes
              </span>
              <span className="text-[10px] text-[#66635E]/80">Never shown to customer</span>
            </div>

            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Quoted ₹12,500 for toughened glass railing. Site visit scheduled for Saturday."
              className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#D9D4CB] text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] transition-colors"
            />

            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A63] transition-colors disabled:opacity-50"
              >
                {isSavingNotes ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Metadata Footer */}
          <div className="text-[11px] text-[#66635E] border-t border-[#D9D4CB] pt-4 space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-[#9A7D4A]" />
              <span>
                Received: {new Date(estimation.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            {estimation.contactedAt && (
              <div className="flex items-center space-x-2 text-blue-700">
                <FileText className="w-3.5 h-3.5" />
                <span>
                  First Contacted: {new Date(estimation.contactedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
