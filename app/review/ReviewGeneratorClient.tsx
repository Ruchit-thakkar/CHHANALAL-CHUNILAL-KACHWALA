"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  RotateCcw,
  Star,
  Quote,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Building2,
} from "lucide-react";

const REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  "https://g.page/r/Cb0rH3r9Bma0EBM/review";

const QUICK_CHIPS = [
  "Excellent glass railing work & neat finishing",
  "Punctual and very polite installation team",
  "Custom LED mirror is gorgeous and top quality",
  "Smooth sliding aluminium windows & solid frames",
  "Honest pricing, quick turnaround & clean work",
];

const CARD_STYLES = [
  { label: "Option 1 • Balanced & Professional", badge: "Balanced" },
  { label: "Option 2 • Warm & Friendly", badge: "Friendly" },
  { label: "Option 3 • Crisp & Concise", badge: "Short" },
  { label: "Option 4 • Craft & Detail Focused", badge: "Detailed" },
];

export default function ReviewGeneratorClient() {
  const [experience, setExperience] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);

  const handleGenerate = async (textToUse?: string) => {
    const promptText = typeof textToUse === "string" ? textToUse : experience;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience: promptText }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Failed to generate reviews. Please try again."
        );
      }

      setReviews(data.reviews || []);
      setHasGeneratedOnce(true);

      // Smooth scroll to suggestions on mobile if needed
      setTimeout(() => {
        const resultsEl = document.getElementById("review-results");
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAndRedirect = async (text: string, index: number) => {
    try {
      // 1. Copy review text to clipboard
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedIndex(index);

      // 2. Open Google Review URL in a new tab
      if (typeof window !== "undefined") {
        window.open(REVIEW_URL, "_blank", "noopener,noreferrer");
      }

      // Reset copied state indicator after 4 seconds
      setTimeout(() => {
        setCopiedIndex((prev) => (prev === index ? null : prev));
      }, 4000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      // Still open the review URL even if copy errored
      window.open(REVIEW_URL, "_blank", "noopener,noreferrer");
    }
  };

  const handleSelectChip = (chip: string) => {
    setExperience((prev) => {
      if (!prev.trim()) return chip;
      return `${prev.trim()}, ${chip.toLowerCase()}`;
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#171717] selection:bg-[#B99A63]/30 flex flex-col justify-between">
      {/* Top Header Strip */}
      <header className="sticky top-0 z-40 bg-[#F5F2EC]/90 backdrop-blur-md border-b border-[#D9D4CB]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#171717] hover:text-[#B99A63] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Studio</span>
          </Link>

          <div className="text-right">
            <span className="font-heading text-xs sm:text-sm font-bold tracking-tight uppercase block text-[#171717]">
              Chhanalal Chunilal Kachwala
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-[#B99A63]">
              Glass • Aluminium • Mirror
            </span>
          </div>
        </div>
      </header>

      {/* Main Experience Hero & Generator Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#B99A63]/15 border border-[#B99A63]/30 text-[#9A7D4A] rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>AI-Assisted Experience Sharing</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171717] leading-tight mb-3">
            Share Your Experience
          </h1>
          <p className="text-sm sm:text-base text-[#66635E] font-light leading-relaxed">
            Tell us what you loved about our service, and our AI will help turn it
            into natural, genuine Google review suggestions you can edit or post.
          </p>
        </div>

        {/* Input & Form Card */}
        <div className="bg-white border border-[#D9D4CB] shadow-xs p-6 sm:p-8 mb-8 relative">
          <label
            htmlFor="customer-notes"
            className="block text-xs uppercase tracking-wider font-bold text-[#171717] mb-2"
          >
            A few words about your experience (optional)
          </label>
          <p className="text-xs text-[#66635E] mb-3 font-light">
            Mention the work done (e.g. glass railing, LED mirror, sliding window) or what you liked.
          </p>

          <textarea
            id="customer-notes"
            rows={3}
            maxLength={600}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. Good service, staff was friendly and work was completed quickly on our balcony railing..."
            className="w-full p-3.5 sm:p-4 text-sm sm:text-base bg-[#FAF8F5] border border-[#D9D4CB] text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#B99A63] focus:ring-1 focus:ring-[#B99A63] transition-colors resize-y leading-relaxed"
          />

          {/* Quick Idea Chips */}
          <div className="mt-3.5 pt-3.5 border-t border-[#D9D4CB]/60">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#66635E] block mb-2">
              Quick tap ideas:
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectChip(chip)}
                  className="text-xs px-2.5 py-1.5 bg-[#F5F2EC] hover:bg-[#EAE5DB] text-[#171717] border border-[#D9D4CB] transition-colors rounded-xs text-left"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mt-4 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#D9D4CB]/70">
            <span className="text-[11px] text-[#66635E]">
              {experience.length}/600 characters
            </span>

            <div className="flex items-center space-x-2">
              {experience && (
                <button
                  type="button"
                  onClick={() => setExperience("")}
                  disabled={loading}
                  className="px-3 py-2.5 text-xs uppercase tracking-wider text-[#66635E] hover:text-[#171717] transition-colors"
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#171717] hover:bg-[#B99A63] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-xs"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Crafting Suggestions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#B99A63]" />
                    <span>{hasGeneratedOnce ? "Regenerate Reviews" : "Generate Reviews"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton Indicator */}
        {loading && (
          <div className="bg-white border border-[#D9D4CB] p-8 text-center animate-pulse mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B99A63]/15 text-[#B99A63] mb-3">
              <Sparkles className="w-6 h-6 animate-spin text-[#B99A63]" />
            </div>
            <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-[#171717] mb-1">
              Generating Authentic Review Suggestions
            </h3>
            <p className="text-xs text-[#66635E] max-w-md mx-auto">
              Our AI is drafting 4 human, varied perspectives based on your experience and our architectural craft.
            </p>
          </div>
        )}

        {/* Results Section */}
        {reviews.length > 0 && !loading && (
          <div id="review-results" className="space-y-6 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-[#D9D4CB]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B99A63] block">
                  Select Your Favorite
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#171717]">
                  Review Suggestions
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleGenerate()}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#66635E] hover:text-[#171717] transition-colors"
                title="Generate fresh suggestions"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Try Another Batch</span>
              </button>
            </div>

            {/* Generated Review Cards Grid */}
            <div className="grid grid-cols-1 gap-5">
              {reviews.map((reviewText, idx) => {
                const styleMeta = CARD_STYLES[idx] || {
                  label: `Option ${idx + 1}`,
                  badge: "Natural",
                };
                const isCopied = copiedIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`bg-white border transition-all duration-300 p-6 sm:p-7 relative ${
                      isCopied
                        ? "border-[#B99A63] shadow-md ring-1 ring-[#B99A63]/40"
                        : "border-[#D9D4CB] hover:border-[#B99A63]/60 hover:shadow-xs"
                    }`}
                  >
                    {/* Header with tone badge and stars */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-[#FAF8F5] text-[#9A7D4A] border border-[#D9D4CB]">
                          {styleMeta.badge}
                        </span>
                        <span className="text-xs text-[#66635E] font-medium hidden sm:inline">
                          {styleMeta.label}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-[#B99A63]" aria-label="5 stars rating">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#B99A63]" />
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="relative pl-6 pr-2 mb-6">
                      <Quote className="w-4 h-4 text-[#B99A63]/60 absolute left-0 top-0.5" />
                      <p className="text-sm sm:text-base text-[#171717] font-normal leading-relaxed italic">
                        &ldquo;{reviewText}&rdquo;
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-[#D9D4CB]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[11px] text-[#66635E]">
                        Clicking copies text &amp; opens Google Review in a new tab.
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopyAndRedirect(reviewText, idx)}
                        className={`inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                          isCopied
                            ? "bg-[#25D366] text-white border border-[#25D366]"
                            : "bg-[#171717] hover:bg-[#B99A63] text-white border border-[#171717] hover:border-[#B99A63]"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Review Copied! Opening Google...</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Review</span>
                            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Copied Success Callout Banner */}
                    {isCopied && (
                      <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#B99A63]/40 text-xs text-[#171717] flex items-start space-x-2">
                        <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-[#171717]">Review copied to your clipboard!</strong>
                          <p className="text-[#66635E] mt-0.5">
                            Google has opened in your browser tab. Simply paste your review, pick your star rating, and click Google&apos;s Post button.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* How It Works Steps (Transparent & Simple UX) */}
        <section className="mt-14 pt-10 border-t border-[#D9D4CB]">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B99A63] block mb-1">
              Simple 3-Step Process
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-[#171717]">
              How Google Reviews Work
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#D9D4CB] p-5">
              <span className="font-heading text-xl font-black text-[#B99A63] block mb-2">
                01
              </span>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#171717] mb-1.5">
                Generate &amp; Choose
              </h4>
              <p className="text-xs text-[#66635E] leading-relaxed">
                Add a quick note or tap an idea above. AI writes 4 natural suggestions for you to review.
              </p>
            </div>

            <div className="bg-white border border-[#D9D4CB] p-5">
              <span className="font-heading text-xl font-black text-[#B99A63] block mb-2">
                02
              </span>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#171717] mb-1.5">
                Click &ldquo;Copy Review&rdquo;
              </h4>
              <p className="text-xs text-[#66635E] leading-relaxed">
                The exact text is copied to your device, and our Google Review page opens automatically in a new tab.
              </p>
            </div>

            <div className="bg-white border border-[#D9D4CB] p-5">
              <span className="font-heading text-xl font-black text-[#B99A63] block mb-2">
                03
              </span>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#171717] mb-1.5">
                Paste &amp; Submit on Google
              </h4>
              <p className="text-xs text-[#66635E] leading-relaxed">
                Paste the text into Google&apos;s review box, select your star rating, and click Submit. You remain in 100% control.
              </p>
            </div>
          </div>

          {/* Direct Link Fallback */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#66635E] mb-2 font-light">
              Prefer writing your own review directly on Google without AI assistance?
            </p>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#171717] hover:text-[#B99A63] underline underline-offset-4 transition-colors"
            >
              <span>Open Google Review Page Directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] text-white border-t border-[#2B2B2B] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-center sm:text-left">
            <span className="font-heading uppercase font-bold text-white tracking-tight">
              Chhanalal Chunilal Kachwala
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Glass, Aluminium &amp; Mirror Studio</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">•</span>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B99A63] transition-colors inline-flex items-center space-x-1"
            >
              <span>Google Page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
