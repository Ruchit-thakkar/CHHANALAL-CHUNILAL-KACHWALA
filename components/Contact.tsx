"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Glass Railing",
    details: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
    "Glass Railing",
    "Aluminium Fabrication & Windows",
    "Aluminium Profile Work",
    "LED Mirrors",
    "Custom Mirror Designs",
    "Glass Merchant & Toughened Glass",
    "Other Custom Architectural Work",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+ -]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project or requirement.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppSend = () => {
    if (!validate()) return;

    const messageText = `*New Inquiry for Chhanalal Chunilal Kachwala*%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Service:* ${encodeURIComponent(
      formData.service
    )}%0A*Project Scope:* ${encodeURIComponent(
      formData.details || "Not specified"
    )}%0A*Message:* ${encodeURIComponent(formData.message)}`;

    window.open(`https://wa.me/919876543210?text=${messageText}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F2EC] border-t border-[#D9D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2.5 mb-3">
                <span className="w-2 h-2 bg-[#B99A63]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63]">
                  Let&apos;s Talk
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-5">
                Start Your Project Consultation.
              </h2>

              <p className="text-base sm:text-lg text-[#66635E] font-light leading-relaxed mb-10">
                Tell us what you&apos;re looking for and we&apos;ll help you find the right solution.
                Bring your floor plan, preliminary sizes, or design references for an accurate estimate.
              </p>

              {/* Information Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-0.5">
                      Phone
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="font-heading text-base font-bold text-[#171717] hover:text-[#9A7D4A] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <span className="text-xs text-[#66635E] block font-light mt-0.5">
                      Direct line for site visits &amp; workshop inquiries
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-0.5">
                      WhatsApp
                    </span>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20Chhanalal%20Chunilal%20Kachwala,%20I%20would%20like%20to%20send%20my%20glass%20project%20drawings."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-base font-bold text-[#171717] hover:text-[#9A7D4A] transition-colors"
                    >
                      +91 98765 43210
                    </a>
                    <span className="text-xs text-[#66635E] block font-light mt-0.5">
                      Quick drawing &amp; photo estimates
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-0.5">
                      Location / Studio
                    </span>
                    <p className="font-heading text-base font-bold text-[#171717]">
                      Glass &amp; Aluminium Market, Main Road
                    </p>
                    <span className="text-xs text-[#66635E] block font-light mt-0.5">
                      Serving Residential &amp; Commercial Projects Across the Region
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-0.5">
                      Business Hours
                    </span>
                    <p className="font-heading text-sm font-bold text-[#171717]">
                      Monday – Saturday: 9:30 AM – 8:00 PM
                    </p>
                    <span className="text-xs text-[#66635E] block font-light mt-0.5">
                      Sunday: By Prior Appointment for On-Site Measurement
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 pt-6 border-t border-[#D9D4CB] text-xs text-[#66635E] font-light">
              <span className="font-medium text-[#171717]">Architects &amp; Contractors:</span> We welcome
              tender drawings, CAD measurements, and custom alloy extrusion specifications.
            </div>
          </div>

          {/* Right Column: Premium Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#D9D4CB] p-8 sm:p-10 shadow-xs relative">
              <div className="mb-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
                  Online Inquiry
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#171717]">
                  Tell Us About Your Project
                </h3>
                <p className="text-xs sm:text-sm text-[#66635E] font-light mt-1">
                  No login required. We respect your privacy and respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center bg-[#F5F2EC] border border-[#D9D4CB]">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D4A] mx-auto mb-4" />
                  <h4 className="font-heading text-2xl font-bold text-[#171717] mb-2">
                    Enquiry Received
                  </h4>
                  <p className="text-sm text-[#66635E] font-light max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-[#171717]">{formData.name}</strong>. Our fabrication
                    specialist will review your requirements for <strong>{formData.service}</strong> and contact
                    you at <strong className="text-[#171717]">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        service: "Glass Railing",
                        details: "",
                        message: "",
                      });
                    }}
                    className="text-xs uppercase tracking-wider font-semibold underline text-[#171717] hover:text-[#9A7D4A]"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Ramesh Patel"
                        className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${
                          errors.name ? "border-red-500" : "border-[#D9D4CB]"
                        }`}
                      />
                      {errors.name && (
                        <p className="flex items-center text-xs text-red-600 mt-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="e.g. +91 98250 12345"
                        className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${
                          errors.phone ? "border-red-500" : "border-[#D9D4CB]"
                        }`}
                      />
                      {errors.phone && (
                        <p className="flex items-center text-xs text-red-600 mt-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                    >
                      Service Required *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F5F2EC]/60 border border-[#D9D4CB] text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus:bg-white transition-colors cursor-pointer"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                    >
                      Project Details / Approximate Dimensions (Optional)
                    </label>
                    <input
                      id="details"
                      type="text"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="e.g. Balcony glass railing (approx. 40 running feet) or 3x6 ft LED mirror"
                      className="w-full px-4 py-3 bg-[#F5F2EC]/60 border border-[#D9D4CB] text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                    >
                      Message / Specific Requirements *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Share details regarding your timeline, design preferences, site location or questions..."
                      className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${
                        errors.message ? "border-red-500" : "border-[#D9D4CB]"
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center text-xs text-red-600 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 group inline-flex items-center justify-center bg-[#171717] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#B99A63] transition-all duration-300 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Send Enquiry"}</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="inline-flex items-center justify-center border border-[#25D366] bg-[#25D366]/10 text-[#075E54] px-6 py-4 text-xs font-semibold uppercase tracking-wider hover:bg-[#25D366] hover:text-white transition-all duration-300"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Send on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
