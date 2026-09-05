"use client";

import React, { useEffect } from "react";
import { Phone, MessageSquare, X } from "lucide-react";

interface ContactPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: "call" | "whatsapp";
}

export default function ContactPickerModal({
  isOpen,
  onClose,
  actionType,
}: ContactPickerModalProps) {
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

  if (!isOpen) return null;

  const contacts = [
    {
      name: "Girish bhai",
      phone: "+91 92276 26898",
      rawNumber: "919227626898",
      tel: "tel:+919227626898",
    },
    {
      name: "Dhaval bhai",
      phone: "+91 97243 16898",
      rawNumber: "919724316898",
      tel: "tel:+919724316898",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-[#F5F2EC] border border-[#D9D4CB] w-full max-w-sm p-6 shadow-2xl z-10 text-[#171717] animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#66635E] hover:text-[#171717] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-11 h-11 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A] mx-auto mb-2.5">
            {actionType === "whatsapp" ? (
              <MessageSquare className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            ) : (
              <Phone className="w-5 h-5 text-[#9A7D4A]" />
            )}
          </div>
          <h3 className="font-heading text-lg font-bold text-[#171717]">
            {actionType === "whatsapp" ? "Chat on WhatsApp" : "Call Studio"}
          </h3>
          <p className="text-xs text-[#66635E] mt-0.5">
            Choose who you would like to connect with:
          </p>
        </div>

        <div className="space-y-3">
          {contacts.map((contact) => {
            const linkHref =
              actionType === "whatsapp"
                ? `https://wa.me/${contact.rawNumber}?text=Hello%20${encodeURIComponent(
                    contact.name
                  )},%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services.`
                : contact.tel;

            return (
              <a
                key={contact.name}
                href={linkHref}
                target={actionType === "whatsapp" ? "_blank" : undefined}
                rel={actionType === "whatsapp" ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 bg-white border border-[#D9D4CB] hover:border-[#B99A63] hover:bg-[#FAF8F5] transition-all group"
              >
                <div>
                  <span className="font-heading text-sm font-bold text-[#171717] block group-hover:text-[#9A7D4A] transition-colors">
                    {contact.name}
                  </span>
                  <span className="text-xs text-[#66635E] font-medium block">
                    {contact.phone}
                  </span>
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    actionType === "whatsapp"
                      ? "bg-[#25D366]/15 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white"
                      : "bg-[#171717] text-white group-hover:bg-[#B99A63]"
                  } transition-colors`}
                >
                  {actionType === "whatsapp" ? (
                    <MessageSquare className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
