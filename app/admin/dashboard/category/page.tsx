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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
            Category Management
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#171717] flex items-center gap-2.5">
            <Tags className="w-6 h-6 text-[#B99A63]" />
            Category Management
          </h1>
          <p className="text-xs sm:text-sm text-[#66635E] font-light mt-1">
            Create, edit, and organize project filter categories for the public Selected Work showcase.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#B99A63] text-[#FAF8F5] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#D9D4CB] shadow-xs">
          <Loader2 className="w-7 h-7 animate-spin text-[#B99A63]" />
          <p className="text-xs text-[#66635E] mt-3 uppercase tracking-wider">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-16 text-center bg-white border border-[#D9D4CB] shadow-xs">
          <p className="text-xs sm:text-sm text-[#66635E] font-light">No categories found.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 bg-[#171717] hover:bg-[#B99A63] text-[#FAF8F5] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Plus className="w-4 h-4" /> Create First Category
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#D9D4CB] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#D9D4CB] text-[11px] uppercase tracking-wider font-semibold text-[#66635E]">
                  <th className="py-3 px-4 w-16 text-center">Order</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Slug (Filter ID)</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D4CB]/60 text-xs text-[#171717]">
                {categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-[#9A7D4A] font-bold">
                      {cat.order}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#171717]">
                      {cat.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#66635E]">
                      <span className="bg-[#FAF8F5] px-2 py-0.5 border border-[#D9D4CB] text-[10px] uppercase font-semibold">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#66635E] max-w-xs truncate font-light">
                      {cat.description || "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-[#171717] hover:text-[#9A7D4A] hover:border-[#B99A63] border border-[#D9D4CB] bg-white transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          disabled={deletingId === cat._id}
                          className="p-1.5 text-red-600 hover:text-red-700 hover:border-red-300 border border-[#D9D4CB] bg-white transition-colors disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF8F5] border border-[#D9D4CB] w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D9D4CB] pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B99A63] block leading-none mb-0.5">
                  Category
                </span>
                <h2 className="text-base font-heading font-bold text-[#171717]">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#66635E] hover:text-[#171717] text-xs uppercase transition-colors"
              >
                Close
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#66635E] uppercase tracking-wider font-semibold mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Glass Railing"
                  className="w-full bg-white border border-[#D9D4CB] px-3 py-2 text-[#171717] placeholder:text-[#66635E]/60 focus:outline-none focus:border-[#B99A63] focus:ring-1 focus:ring-[#B99A63]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-[#66635E] uppercase tracking-wider font-semibold mb-1">
                  Slug (Filter Key)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. railing"
                  className="w-full bg-white border border-[#D9D4CB] px-3 py-2 text-[#171717] placeholder:text-[#66635E]/60 focus:outline-none focus:border-[#B99A63] focus:ring-1 focus:ring-[#B99A63]/30 font-mono text-[11px] transition-all"
                />
                <span className="text-[10px] text-[#66635E] mt-0.5 block">
                  Used for filtering Selected Work tab on public page.
                </span>
              </div>

              <div>
                <label className="block text-[#66635E] uppercase tracking-wider font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this category..."
                  className="w-full bg-white border border-[#D9D4CB] px-3 py-2 text-[#171717] placeholder:text-[#66635E]/60 focus:outline-none focus:border-[#B99A63] focus:ring-1 focus:ring-[#B99A63]/30 resize-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[#66635E] uppercase tracking-wider font-semibold mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-[#D9D4CB] px-3 py-2 text-[#171717] focus:outline-none focus:border-[#B99A63] focus:ring-1 focus:ring-[#B99A63]/30 transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D9D4CB]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#D9D4CB] text-[#66635E] hover:text-[#171717] hover:border-[#171717] uppercase tracking-wider text-[11px] bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-[#171717] hover:bg-[#B99A63] text-[#FAF8F5] px-5 py-2 font-semibold uppercase tracking-wider text-[11px] disabled:opacity-50 transition-colors"
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
