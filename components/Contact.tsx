"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Glass Railing",
    projectDetails: "",
    preferredContact: "Phone Call",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [assignedInquiryId, setAssignedInquiryId] = useState<string>("");

  const servicesList = [
    "Glass Merchant",
    "Aluminium Fabrication",
    "Aluminium Profile Work",
    "Glass Railing",
    "LED Mirror",
    "Mirror Design Work",
    "Custom Glass Work",
    "Other",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\s\-()]{7,16}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service required.";
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Please enter your project details and requirements.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      // Success
      setAssignedInquiryId(data.inquiryId || "");
      setSubmitted(true);
      // Clear form after successful submission
      setFormData({
        name: "",
        phone: "",
        service: "Glass Railing",
        projectDetails: "",
        preferredContact: "Phone Call",
      });
      setErrors({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
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
                Have a glass, aluminium or mirror project in mind? Tell us what you need
                and our team will get in touch with you. Bring your floor plan, preliminary
                sizes, or design references for an accurate estimate.
              </p>

              {/* Information Cards */}
              <div className="space-y-6">
                {/* Direct Call Options */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-2">
                      Direct Call (Choose Person)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="tel:+919227626898"
                        className="p-2.5 bg-[#F5F2EC] hover:bg-[#B99A63]/20 border border-[#D9D4CB] transition-colors block"
                      >
                        <span className="text-[11px] text-[#9A7D4A] font-semibold block uppercase tracking-wider">
                          Girish bhai
                        </span>
                        <span className="font-heading text-sm font-bold text-[#171717]">
                          +91 92276 26898
                        </span>
                      </a>

                      <a
                        href="tel:+919724316898"
                        className="p-2.5 bg-[#F5F2EC] hover:bg-[#B99A63]/20 border border-[#D9D4CB] transition-colors block"
                      >
                        <span className="text-[11px] text-[#9A7D4A] font-semibold block uppercase tracking-wider">
                          Dhaval bhai
                        </span>
                        <span className="font-heading text-sm font-bold text-[#171717]">
                          +91 97243 16898
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Options */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#25D366] shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-2">
                      WhatsApp Chat &amp; Drawing Estimates
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="https://wa.me/919227626898?text=Hello%20Girish%20bhai,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#F5F2EC] hover:bg-[#25D366]/10 border border-[#D9D4CB] hover:border-[#25D366] transition-colors block"
                      >
                        <span className="text-[11px] text-[#25D366] font-semibold block uppercase tracking-wider">
                          Girish bhai
                        </span>
                        <span className="font-heading text-sm font-bold text-[#171717]">
                          +91 92276 26898
                        </span>
                      </a>

                      <a
                        href="https://wa.me/919724316898?text=Hello%20Dhaval%20bhai,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#F5F2EC] hover:bg-[#25D366]/10 border border-[#D9D4CB] hover:border-[#25D366] transition-colors block"
                      >
                        <span className="text-[11px] text-[#25D366] font-semibold block uppercase tracking-wider">
                          Dhaval bhai
                        </span>
                        <span className="font-heading text-sm font-bold text-[#171717]">
                          +91 97243 16898
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location with Google Map Link */}
                <div className="flex items-start space-x-4 p-4 bg-white border border-[#D9D4CB]">
                  <div className="p-2.5 bg-[#F5F2EC] text-[#9A7D4A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block mb-1">
                      Studio &amp; Workshop Address
                    </span>
                    <p className="font-heading text-sm sm:text-base font-bold text-[#171717] leading-relaxed mb-2">
                      D 68, shree vivekanand industrial estate Nr sheetal cinema, Gomtipur Rd, Rakhial, Ahmedabad, Gujarat 380021
                    </p>
                    <a
                      href="https://maps.app.goo.gl/3AWbjd1VD8qc4NGr8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-[#B99A63] hover:text-[#9A7D4A] underline underline-offset-4"
                    >
                      View on Google Maps →
                    </a>
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

          {/* Right Column: Online Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#D9D4CB] p-8 sm:p-10 shadow-xs relative">
              <div className="mb-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63] block mb-1">
                  Online Inquiry
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#171717]">
                  Tell Us About Your Project
                </h3>
                <p className="text-xs sm:text-sm text-[#66635E] font-light mt-2 leading-relaxed">
                  Have a glass, aluminium or mirror project in mind? Tell us what you need
                  and our team will get in touch with you.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center bg-[#FAF8F5] border border-[#D9D4CB] animate-fadeIn">
                  <CheckCircle2 className="w-14 h-14 text-[#9A7D4A] mx-auto mb-4" />
                  {assignedInquiryId && (
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#B99A63] block mb-1">
                      Inquiry Reference: {assignedInquiryId}
                    </span>
                  )}
                  <h4 className="font-heading text-2xl font-bold text-[#171717] mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-[#66635E] font-light max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for contacting <strong>Chhanalal Chunilal Kachwala</strong>.
                    We&apos;ve received your project details and will get in touch with you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-wider font-semibold underline text-[#171717] hover:text-[#9A7D4A] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {apiError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Rahul Patel"
                        className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${errors.name ? "border-red-500" : "border-[#D9D4CB]"
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
                        placeholder="e.g. 9876543210"
                        className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${errors.phone ? "border-red-500" : "border-[#D9D4CB]"
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
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: "" });
                      }}
                      className="w-full px-4 py-3 bg-[#F5F2EC]/60 border border-[#D9D4CB] text-sm text-[#171717] focus:outline-none focus:border-[#171717] focus:bg-white transition-colors cursor-pointer"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="flex items-center text-xs text-red-600 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="projectDetails"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, projectDetails: e.target.value });
                        if (errors.projectDetails) setErrors({ ...errors, projectDetails: "" });
                      }}
                      placeholder="Tell us about your project, requirements, approximate dimensions, design preferences, etc."
                      className={`w-full px-4 py-3 bg-[#F5F2EC]/60 border text-sm text-[#171717] placeholder-[#66635E]/60 focus:outline-none focus:border-[#171717] focus:bg-white transition-colors ${errors.projectDetails ? "border-red-500" : "border-[#D9D4CB]"
                        }`}
                    />
                    {errors.projectDetails && (
                      <p className="flex items-center text-xs text-red-600 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        {errors.projectDetails}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2.5">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Phone Call", "WhatsApp"].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setFormData({ ...formData, preferredContact: method })}
                          className={`p-3 text-xs uppercase tracking-wider font-semibold border text-center transition-all ${formData.preferredContact === method
                              ? "border-[#171717] bg-[#171717] text-white"
                              : "border-[#D9D4CB] bg-[#F5F2EC]/40 text-[#66635E] hover:border-[#171717]"
                            }`}
                        >
                          {method === "WhatsApp" ? "WhatsApp" : "Phone Call"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group inline-flex items-center justify-center bg-[#171717] text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#B99A63] transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
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
