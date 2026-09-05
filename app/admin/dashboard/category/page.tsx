"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Tags, Check, AlertCircle } from "lucide-react";

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  createdAt?: string;
}

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      } else {
        setError(data.error || "Failed to load categories");
      }
    } catch (err: any) {
      setError("Network error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      order: categories.length + 1,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      order: cat.order ?? 0,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingCategory
        ? prev.slug
        : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Category name is required");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const url = editingCategory ? `/api/categories/${editingCategory._id}` : "/api/categories";
      const method = editingCategory ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || "Failed to save category");
      } else {
        setIsModalOpen(false);
        fetchCategories();
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to submit category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.error || "Failed to delete category");
      }
    } catch (err) {
      alert("Error deleting category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2.5">
            <Tags className="w-6 h-6 text-[#B99A63]" />
            Category Management
          </h1>
          <p className="text-xs text-[#A3A3A3] mt-1 tracking-wide">
            Create, edit, and organize project filter categories for the public Selected Work showcase.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-[#B99A63] hover:bg-[#A38550] text-[#171717] px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#171717] border border-[#2A2A2A]">
          <Loader2 className="w-8 h-8 animate-spin text-[#B99A63]" />
          <p className="text-xs text-[#A3A3A3] mt-3 uppercase tracking-wider">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/30 border border-red-800 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center bg-[#171717] border border-[#2A2A2A]">
          <p className="text-sm text-[#A3A3A3]">No categories found.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 bg-[#B99A63] text-[#171717] px-4 py-2 text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Create First Category
          </button>
        </div>
      ) : (
        <div className="bg-[#171717] border border-[#2A2A2A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2A2A2A] bg-[#1B1B1B] text-[11px] uppercase tracking-wider text-[#A3A3A3] font-semibold">
                  <th className="py-3 px-4 w-16 text-center">Order</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Slug (Filter ID)</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A] text-xs">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-[#B99A63] font-bold">
                      {cat.order}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#A3A3A3]">
                      <span className="bg-[#242424] px-2 py-0.5 rounded border border-white/5">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A3A3A3] max-w-xs truncate">
                      {cat.description || "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-[#A3A3A3] hover:text-[#B99A63] hover:bg-[#242424] transition-colors rounded"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          disabled={deletingId === cat._id}
                          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors rounded disabled:opacity-50"
                          title="Delete Category"
                        >
                          {deletingId === cat._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#171717] border border-[#2A2A2A] w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A3A3A3] hover:text-white text-xs uppercase"
              >
                Close
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Glass Railing"
                  className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63]"
                />
              </div>

              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1">
                  Slug (Filter Key)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. railing"
                  className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63] font-mono text-[11px]"
                />
                <span className="text-[10px] text-[#A3A3A3] mt-0.5 block">
                  Used for filtering Selected Work tab on public page.
                </span>
              </div>

              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this category..."
                  className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63] resize-none"
                />
              </div>

              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#2A2A2A] text-[#A3A3A3] hover:text-white uppercase tracking-wider text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#B99A63] hover:bg-[#A38550] text-[#171717] px-5 py-2 font-bold uppercase tracking-wider text-[11px] disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
