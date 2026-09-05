"use client";

import React, { useState, useEffect } from "react";
import { X, Check, MessageSquare, ArrowRight, Shield } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  preselectedService,
}: QuoteModalProps) {
  const [service, setService] = useState<string>("Glass Railing");
  const [projectType, setProjectType] = useState<string>("Residential");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const serviceOptions = [
    "Glass Railing",
    "Aluminium Windows & Doors",
    "Aluminium Profile Work",
    "LED Mirrors",
    "Custom Mirror Designs",
    "Toughened Glass & Merchant Supply",
  ];

  const handleWhatsAppQuote = () => {
    const text = `*Custom Quote Request*%0A*Business:* Chhanalal Chunilal Kachwala%0A%0A*Name:* ${encodeURIComponent(
      name || "Inquirer"
    )}%0A*Phone:* ${encodeURIComponent(phone || "Not specified")}%0A*Service:* ${encodeURIComponent(
      service
    )}%0A*Project Type:* ${encodeURIComponent(
      projectType
    )}%0A*Dimensions / Notes:* ${encodeURIComponent(notes || "Please advise on specs")}`;

    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative bg-[#F5F2EC] border border-[#D9D4CB] w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 z-10 text-[#171717]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#66635E] hover:text-[#171717] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B99A63]"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A] mx-auto mb-4">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-2">Quote Request Sent</h3>
            <p className="text-sm text-[#66635E] font-light max-w-sm mx-auto">
              Our estimation team is calculating material and installation costs for your{" "}
              <strong>{service}</strong> request. We will contact you at <strong>{phone}</strong> shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
                Direct Estimation
              </span>
              <h3 id="quote-modal-title" className="font-heading text-2xl font-bold text-[#171717]">
                Request a Custom Quote
              </h3>
              <p className="text-xs text-[#66635E] font-light mt-1">
                Specify your glass, aluminium, or mirror project requirements for an accurate estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Selection Pills */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  1. Select Service
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {serviceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setService(opt)}
                      className={`p-2.5 text-left border transition-colors ${
                        service === opt
                          ? "border-[#171717] bg-[#171717] text-white font-medium"
                          : "border-[#D9D4CB] bg-white text-[#66635E] hover:border-[#171717]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                  2. Project Type
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {["Residential", "Commercial", "Interior Design"].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`py-2 text-center border transition-colors ${
                        projectType === type
                          ? "border-[#B99A63] bg-[#B99A63]/15 text-[#9A7D4A] font-semibold"
                          : "border-[#D9D4CB] bg-white text-[#66635E] hover:border-[#B99A63]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions or Notes */}
              <div>
                <label
                  htmlFor="modal-notes"
                  className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1"
                >
                  3. Approximate Dimensions / Description
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 50 running feet balcony glass railing or 4x7 ft sliding window frame"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4CB] text-xs text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717]"
                />
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4CB] text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-1"
                  >
                    Phone / Mobile *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4CB] text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B99A63] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Submit For Estimation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3 border border-[#25D366] bg-[#25D366]/10 text-[#075E54] text-xs uppercase tracking-wider font-semibold hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Spec to WhatsApp Instant</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#66635E] font-light pt-1">
                <Shield className="w-3 h-3 text-[#9A7D4A]" />
                <span>Zero spam guarantee. Practical solutions directly from our fabrication team.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
