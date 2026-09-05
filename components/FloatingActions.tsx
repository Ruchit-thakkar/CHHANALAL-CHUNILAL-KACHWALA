"use client";

import React, { useState } from "react";
import { MessageSquare, Phone } from "lucide-react";

interface FloatingActionsProps {
  onOpenQuoteModal: () => void;
  isMobileMenuOpen?: boolean;
  onOpenCallPicker?: () => void;
  onOpenWhatsAppPicker?: () => void;
}

export default function FloatingActions({
  onOpenQuoteModal,
  isMobileMenuOpen = false,
  onOpenCallPicker,
  onOpenWhatsAppPicker,
}: FloatingActionsProps) {
  const [visible, setVisible] = useState(false);
  const [showCallDropdown, setShowCallDropdown] = useState(false);
  const [showWADropdown, setShowWADropdown] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || isMobileMenuOpen) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-30 flex items-center space-x-2 sm:space-x-2.5 transition-all duration-300 animate-fadeIn"
    >
      {/* Phone Call Button with choice popover */}
      <div className="relative">
        {showCallDropdown && (
          <div
            className="absolute bottom-full mb-2 right-0 bg-[#F5F2EC] border border-[#D9D4CB] shadow-xl p-2 rounded-sm w-48 space-y-1.5 z-40 animate-fadeIn"
            onMouseLeave={() => setShowCallDropdown(false)}
          >
            <span className="text-[10px] font-bold text-[#66635E] uppercase tracking-wider block px-2 pt-1">
              Select to Call
            </span>
            <a
              href="tel:+919227626898"
              onClick={() => setShowCallDropdown(false)}
              className="flex items-center justify-between p-2 bg-white hover:bg-[#B99A63]/15 text-xs text-[#171717] font-semibold transition-colors"
            >
              <span>Girish bhai</span>
              <span className="text-[10px] text-[#9A7D4A]">Call</span>
            </a>
            <a
              href="tel:+919724316898"
              onClick={() => setShowCallDropdown(false)}
              className="flex items-center justify-between p-2 bg-white hover:bg-[#B99A63]/15 text-xs text-[#171717] font-semibold transition-colors"
            >
              <span>Dhaval bhai</span>
              <span className="text-[10px] text-[#9A7D4A]">Call</span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (onOpenCallPicker) {
              onOpenCallPicker();
            } else {
              setShowCallDropdown(!showCallDropdown);
              setShowWADropdown(false);
            }
          }}
          className="flex items-center space-x-1.5 sm:space-x-2 bg-white/95 backdrop-blur-md text-[#171717] border border-[#D9D4CB] shadow-lg px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-full sm:rounded-none hover:border-[#171717] transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
          aria-label="Call studio"
        >
          <Phone className="w-3.5 h-3.5 text-[#9A7D4A]" />
          <span>Call</span>
        </button>
      </div>

      {/* WhatsApp Button with choice popover */}
      <div className="relative">
        {showWADropdown && (
          <div
            className="absolute bottom-full mb-2 right-0 bg-[#F5F2EC] border border-[#D9D4CB] shadow-xl p-2 rounded-sm w-52 space-y-1.5 z-40 animate-fadeIn"
            onMouseLeave={() => setShowWADropdown(false)}
          >
            <span className="text-[10px] font-bold text-[#66635E] uppercase tracking-wider block px-2 pt-1">
              Select WhatsApp Chat
            </span>
            <a
              href="https://wa.me/919227626898?text=Hello%20Girish%20bhai,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowWADropdown(false)}
              className="flex items-center justify-between p-2 bg-white hover:bg-[#25D366]/10 text-xs text-[#171717] font-semibold transition-colors"
            >
              <span>Girish bhai</span>
              <span className="text-[10px] text-[#25D366] font-bold">Chat</span>
            </a>
            <a
              href="https://wa.me/919724316898?text=Hello%20Dhaval%20bhai,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowWADropdown(false)}
              className="flex items-center justify-between p-2 bg-white hover:bg-[#25D366]/10 text-xs text-[#171717] font-semibold transition-colors"
            >
              <span>Dhaval bhai</span>
              <span className="text-[10px] text-[#25D366] font-bold">Chat</span>
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (onOpenWhatsAppPicker) {
              onOpenWhatsAppPicker();
            } else {
              setShowWADropdown(!showWADropdown);
              setShowCallDropdown(false);
            }
          }}
          className="flex items-center space-x-1.5 sm:space-x-2 bg-[#25D366] text-white shadow-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full sm:rounded-none transition-all duration-300 hover:bg-[#1EBE5D] hover:shadow-xl text-xs font-bold uppercase tracking-wider"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden xs:inline sm:inline">WhatsApp</span>
        </button>
      </div>

      {/* Quick Quote Button */}
      <button
        onClick={onOpenQuoteModal}
        className="flex items-center space-x-1 bg-[#171717] text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 border border-[#171717] shadow-lg rounded-full sm:rounded-none hover:bg-[#B99A63] hover:border-[#B99A63] transition-all duration-300 text-xs font-bold uppercase tracking-wider"
        aria-label="Open quote request"
      >
        <span>Quote</span>
      </button>
    </aside>
  );
}
