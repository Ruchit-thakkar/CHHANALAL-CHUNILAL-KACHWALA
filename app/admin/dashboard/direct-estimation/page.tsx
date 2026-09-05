"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Eye,
  RefreshCw,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Calculator,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import EstimationDetailModal, { EstimationItem } from "@/components/admin/EstimationDetailModal";
import { EstimationStatus } from "@/lib/models/Estimation";

export default function AdminDirectEstimationPage() {
  const [estimations, setEstimations] = useState<EstimationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [selectedEstimation, setSelectedEstimation] = useState<EstimationItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchEstimations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (selectedStatus && selectedStatus !== "all") params.set("status", selectedStatus);
      params.set("sort", sortOrder);
      params.set("page", String(page));
      params.set("limit", "20");

      const res = await fetch(`/api/estimations?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setEstimations(data.estimations || []);
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          setTotalCount(data.pagination.total);
        }
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus, sortOrder, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEstimations();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchEstimations]);

  const handleOpenDetail = (estimation: EstimationItem) => {
    setSelectedEstimation(estimation);
    setIsDetailOpen(true);
  };

  const statusFilters: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Not Contacted", value: "not_contacted" },
    { label: "Contacted", value: "contacted" },
    { label: "Follow Up", value: "follow_up" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
            Direct Estimation
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#171717]">
            Direct Estimation Requests
          </h1>
          <p className="text-xs sm:text-sm text-[#66635E] font-light mt-1">
            Manage custom quote requests and project estimations. Total: <strong>{totalCount}</strong>
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => fetchEstimations()}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 bg-white border border-[#D9D4CB] hover:border-[#171717] text-[#171717] text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D9D4CB] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 lg:col-span-7 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by customer name, phone, service or estimation ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D9D4CB] text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#171717] transition-colors"
            />
            <Search className="w-4 h-4 text-[#9A7D4A] absolute left-3.5 top-3" />
          </div>

          {/* Sort Order */}
          <div className="md:col-span-3 lg:col-span-2">
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="w-full py-2.5 px-3 bg-[#FAF8F5] border border-[#D9D4CB] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#171717] cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>

          {/* Current Counter Badge */}
          <div className="md:col-span-3 lg:col-span-3 flex items-center justify-end">
            <span className="text-xs text-[#66635E] font-medium">
              Showing {estimations.length} of {totalCount} requests
            </span>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#D9D4CB]/60">
          <span className="text-xs text-[#66635E] mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            <span>Filter Status:</span>
          </span>

          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              type="button"
              onClick={() => {
                setSelectedStatus(sf.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedStatus === sf.value
                  ? "bg-[#171717] text-white"
                  : "bg-[#FAF8F5] text-[#66635E] border border-[#D9D4CB] hover:border-[#171717] hover:text-[#171717]"
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Estimations Table & List */}
      <div className="bg-white border border-[#D9D4CB] shadow-xs">
        {loading ? (
          <div className="p-16 text-center text-xs text-[#66635E]">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#9A7D4A]" />
            <span>Loading direct estimations...</span>
          </div>
        ) : estimations.length === 0 ? (
          <div className="p-16 text-center">
            <Calculator className="w-12 h-12 text-[#D9D4CB] mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold text-[#171717] mb-1">
              No Direct Estimations Found
            </h3>
            <p className="text-xs sm:text-sm text-[#66635E] font-light max-w-sm mx-auto">
              {search || selectedStatus !== "all"
                ? "Try adjusting your search criteria or status filter."
                : "Customer custom quote requests will appear here after someone submits the Direct Estimation form."}
            </p>
          </div>
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#D9D4CB] text-[11px] uppercase tracking-wider font-semibold text-[#66635E]">
                    <th className="py-3 px-4 sm:px-6">Estimation ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Service Required</th>
                    <th className="py-3 px-4">Project Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9D4CB]/60 text-xs text-[#171717]">
                  {estimations.map((est) => {
                    const cleanPhone = est.phone.replace(/[^0-9]/g, "");
                    const waPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

                    return (
                      <tr
                        key={est._id}
                        className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                        onClick={() => handleOpenDetail(est)}
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-heading font-bold text-[#171717]">
                          {est.estimationId}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#171717]">
                          {est.name}
                        </td>
                        <td className="py-3.5 px-4 text-[#66635E]">
                          {est.phone}
                        </td>
                        <td className="py-3.5 px-4 text-[#171717]">
                          {est.service}
                        </td>
                        <td className="py-3.5 px-4 text-[#66635E]">
                          <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#D9D4CB] text-[10px] uppercase font-semibold text-[#9A7D4A]">
                            {est.projectType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#66635E] font-light">
                          {new Date(est.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={est.status as EstimationStatus} />
                        </td>
                        <td
                          className="py-3.5 px-4 sm:px-6 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end space-x-2">
                            <a
                              href={`tel:${est.phone}`}
                              className="p-1.5 text-[#171717] hover:text-[#9A7D4A] border border-[#D9D4CB] bg-white transition-colors"
                              title="Call"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <a
                              href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(
                                est.name
                              )},%20this%20is%20Chhanalal%20Chunilal%20Kachwala%20regarding%20your%20Direct%20Estimation%20request%20${encodeURIComponent(
                                est.estimationId
                              )}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-[#25D366] hover:bg-[#25D366]/10 border border-[#D9D4CB] bg-white transition-colors"
                              title="WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleOpenDetail(est)}
                              className="p-1.5 text-[#171717] hover:text-[#9A7D4A] border border-[#D9D4CB] bg-white transition-colors"
                              title="View full estimation details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-[#D9D4CB] flex items-center justify-between text-xs text-[#66635E]">
                <span>
                  Page {page} of {totalPages}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 border border-[#D9D4CB] disabled:opacity-30 hover:border-[#171717] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 border border-[#D9D4CB] disabled:opacity-30 hover:border-[#171717] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal Inspector */}
      <EstimationDetailModal
        estimation={selectedEstimation}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={fetchEstimations}
      />
    </div>
  );
}
