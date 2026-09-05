"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  AlertCircle,
  Upload,
  ExternalLink,
  X,
  Check,
  Image as ImageIcon,
} from "lucide-react";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface ProjectItem {
  _id: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  subtitle?: string;
  locationType?: string;
  aspectRatio?: string;
  specs?: string[];
  order?: number;
  createdAt?: string;
}

export default function SelectedWorkManagementPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form State (Required: Title, Category, Description. All others optional)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    categorySlug: "",
    description: "",
    image: "",
    subtitle: "",
    locationType: "",
    aspectRatio: "aspect-[4/5]",
    specsText: "", // comma or newline separated
    order: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, catRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/categories"),
      ]);

      const [projData, catData] = await Promise.all([projRes.json(), catRes.json()]);

      if (projData.success) {
        setProjects(projData.projects);
      } else {
        setError(projData.error || "Failed to load projects");
      }

      if (catData.success) {
        setCategories(catData.categories);
      }
    } catch (err: any) {
      setError("Network error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    const defaultCat = categories[0]?.name || "";
    const defaultSlug = categories[0]?.slug || "";
    setFormData({
      title: "",
      category: defaultCat,
      categorySlug: defaultSlug,
      description: "",
      image: "",
      subtitle: "",
      locationType: "",
      aspectRatio: "aspect-[4/5]",
      specsText: "",
      order: projects.length + 1,
    });
    setFormError(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      categorySlug: project.categorySlug,
      description: project.description,
      image: project.image || "",
      subtitle: project.subtitle || "",
      locationType: project.locationType || "",
      aspectRatio: project.aspectRatio || "aspect-[4/5]",
      specsText: (project.specs || []).join("\n"),
      order: project.order ?? 0,
    });
    setFormError(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const cat = categories.find((c) => c.name === selectedName);
    setFormData((prev) => ({
      ...prev,
      category: selectedName,
      categorySlug: cat ? cat.slug : selectedName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be under 10MB");
      return;
    }

    try {
      setUploadingImage(true);
      setUploadError(null);

      const body = new FormData();
      body.append("file", file);
      body.append("fileName", file.name);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "ImageKit upload failed");
      }

      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image to ImageKit");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields check: Title, Category, Description
    if (!formData.title.trim() || !formData.category.trim() || !formData.description.trim()) {
      setFormError("Title, Category, and Description are required.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const specs = formData.specsText
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        categorySlug: formData.categorySlug.trim() || formData.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: formData.description.trim(),
        image: formData.image.trim(),
        subtitle: formData.subtitle.trim(),
        locationType: formData.locationType.trim(),
        aspectRatio: formData.aspectRatio.trim() || "aspect-[4/5]",
        specs,
        order: Number(formData.order) || 0,
      };

      const url = editingProject ? `/api/projects/${editingProject._id}` : "/api/projects";
      const method = editingProject ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || "Failed to save project");
      } else {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to submit project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
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
            <Briefcase className="w-6 h-6 text-[#B99A63]" />
            Selected Work
          </h1>
          <p className="text-xs text-[#A3A3A3] mt-1 tracking-wide">
            Manage portfolio showcase items. Only <strong className="text-white">Title</strong>, <strong className="text-white">Category</strong>, and <strong className="text-white">Description</strong> are required.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 bg-[#B99A63] hover:bg-[#A38550] text-[#171717] px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#171717] border border-[#2A2A2A]">
          <Loader2 className="w-8 h-8 animate-spin text-[#B99A63]" />
          <p className="text-xs text-[#A3A3A3] mt-3 uppercase tracking-wider">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/30 border border-red-800 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center bg-[#171717] border border-[#2A2A2A]">
          <p className="text-sm text-[#A3A3A3]">No projects found in database.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 bg-[#B99A63] text-[#171717] px-4 py-2 text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-[#171717] border border-[#2A2A2A] hover:border-[#B99A63]/50 transition-colors flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Project Image Preview */}
                <div className="relative w-full h-48 bg-[#111111] overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A3A3A3]">
                      <ImageIcon className="w-8 h-8 opacity-30" />
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#111111]/90 backdrop-blur-sm text-[#D4BD8E] border border-[#B99A63]/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-heading font-bold text-white uppercase line-clamp-1">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <p className="text-[11px] text-[#A3A3A3] line-clamp-1 italic">
                      {proj.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.locationType && (
                    <div className="pt-2 text-[10px] text-[#B99A63] tracking-wider uppercase font-semibold">
                      {proj.locationType}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-[#2A2A2A] flex items-center justify-between bg-[#1B1B1B]/40">
                <span className="text-[10px] text-[#666666] font-mono">
                  Order: {proj.order ?? 0}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-[#A3A3A3] hover:text-[#B99A63] hover:bg-[#242424] transition-colors rounded"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    disabled={deletingId === proj._id}
                    className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors rounded disabled:opacity-50"
                    title="Delete Project"
                  >
                    {deletingId === proj._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Drawer/Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#171717] border border-[#2A2A2A] w-full max-w-2xl my-8 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3 sticky top-0 bg-[#171717] z-10">
              <h2 className="text-base font-heading font-bold text-white uppercase tracking-wider">
                {editingProject ? "Edit Selected Work" : "Add New Selected Work"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#A3A3A3] hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Image Upload with ImageKit */}
              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1 font-semibold">
                  Project Image (ImageKit)
                </label>

                {formData.image && (
                  <div className="relative mb-3 w-full h-40 bg-[#111111] border border-[#2A2A2A] overflow-hidden rounded">
                    <img
                      src={formData.image}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-black text-white rounded"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="imagekit-uploader"
                  />
                  <label
                    htmlFor="imagekit-uploader"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#242424] hover:bg-[#2A2A2A] text-white border border-white/10 cursor-pointer text-xs font-semibold uppercase tracking-wider transition-colors ${
                      uploadingImage ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#B99A63]" />
                        <span>Uploading to ImageKit...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#B99A63]" />
                        <span>Upload Image File</span>
                      </>
                    )}
                  </label>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or paste direct image URL (Unsplash, ImageKit, etc.)"
                    className="flex-1 bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63]"
                  />
                </div>

                {uploadError && (
                  <p className="text-[11px] text-red-400 mt-1">{uploadError}</p>
                )}
                <span className="text-[10px] text-[#A3A3A3] mt-1 block">
                  Supported formats: JPG, PNG, WebP (under 10MB). Uploads directly to ImageKit endpoint.
                </span>
              </div>

              {/* Title & Category (REQUIRED) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1 font-semibold">
                    Title <span className="text-[#B99A63]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern Balcony Installation"
                    className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63]"
                  />
                </div>

                <div>
                  <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1 font-semibold">
                    Category <span className="text-[#B99A63]">*</span>
                  </label>
                  {categories.length > 0 ? (
                    <select
                      value={formData.category}
                      onChange={handleCategorySelect}
                      required
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name} ({cat.slug})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                          categorySlug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        })
                      }
                      placeholder="e.g. Glass Railing"
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    />
                  )}
                </div>
              </div>

              {/* Description (REQUIRED) */}
              <div>
                <label className="block text-[#A3A3A3] uppercase tracking-wider mb-1 font-semibold">
                  Description <span className="text-[#B99A63]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed project description and architectural highlights..."
                  className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63] resize-none"
                />
              </div>

              {/* Optional Fields Section */}
              <div className="pt-2 border-t border-[#2A2A2A]">
                <span className="text-[10px] text-[#A3A3A3] font-semibold uppercase tracking-widest block mb-3">
                  Optional Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888888] uppercase tracking-wider mb-1">
                      Subtitle (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. Frameless Toughened Glass System"
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] uppercase tracking-wider mb-1">
                      Location / Space Type (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.locationType}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                      placeholder="e.g. Residential Terrace"
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888888] uppercase tracking-wider mb-1">
                      Aspect Ratio (Optional)
                    </label>
                    <select
                      value={formData.aspectRatio}
                      onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    >
                      <option value="aspect-[4/5]">Portrait (4:5)</option>
                      <option value="aspect-[3/4]">Tall (3:4)</option>
                      <option value="aspect-[4/3]">Standard (4:3)</option>
                      <option value="aspect-[16/10]">Wide (16:10)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#888888] uppercase tracking-wider mb-1">
                      Display Order (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-[#888888] uppercase tracking-wider mb-1">
                    Specifications (Optional, one per line or comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specsText}
                    onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
                    placeholder="12mm Toughened Clear Glass&#10;Heavy Anodized Base Track&#10;Slim Top Rail Protection"
                    className="w-full bg-[#111111] border border-[#2A2A2A] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#B99A63] resize-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2A2A2A]">
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
                  className="inline-flex items-center gap-2 bg-[#B99A63] hover:bg-[#A38550] text-[#171717] px-6 py-2.5 font-bold uppercase tracking-wider text-[11px] disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
