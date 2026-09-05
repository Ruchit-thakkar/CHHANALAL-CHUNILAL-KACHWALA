"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone } from "lucide-react";

interface FloatingActionsProps {
  onOpenQuoteModal: () => void;
  isMobileMenuOpen?: boolean;
}

export default function FloatingActions({
  onOpenQuoteModal,
  isMobileMenuOpen = false,
}: FloatingActionsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after scrolling down 200px
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When mobile menu is open or not scrolled enough, hide floating actions
  if (!visible || isMobileMenuOpen) return null;

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-30 flex items-center space-x-2 sm:space-x-2.5 transition-all duration-300 animate-fadeIn"
    >
      {/* Phone Call Button - Visible on both Mobile & Desktop */}
      <a
        href="tel:+919876543210"
        className="flex items-center space-x-1.5 sm:space-x-2 bg-white/95 backdrop-blur-md text-[#171717] border border-[#D9D4CB] shadow-lg px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-full sm:rounded-none hover:border-[#171717] transition-all duration-300 text-xs font-semibold uppercase tracking-wider"
        aria-label="Call studio"
      >
        <Phone className="w-3.5 h-3.5 text-[#9A7D4A]" />
        <span>Call</span>
      </a>

      {/* Instant WhatsApp Quick Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Chhanalal%20Chunilal%20Kachwala,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1.5 sm:space-x-2 bg-[#25D366] text-white shadow-lg px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full sm:rounded-none transition-all duration-300 hover:bg-[#1EBE5D] hover:shadow-xl text-xs font-bold uppercase tracking-wider"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden xs:inline sm:inline">WhatsApp</span>
      </a>

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
