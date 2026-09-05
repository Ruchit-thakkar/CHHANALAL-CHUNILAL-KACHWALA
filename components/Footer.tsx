import React from "react";
import Link from "next/link";
import { MessageSquare, Phone, MapPin, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenCallPicker?: () => void;
  onOpenWhatsAppPicker?: () => void;
}

export default function Footer({ onOpenCallPicker, onOpenWhatsAppPicker }: FooterProps) {
  return (
    <footer className="bg-[#111111] text-white border-t border-[#2B2B2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Identity */}
          <div className="lg:col-span-5">
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight uppercase leading-tight mb-2 text-white">
              Chhanalal<br />
              Chunilal Kachwala
            </h3>
            <p className="text-xs uppercase tracking-[0.24em] text-[#D4BD8E] font-medium mb-6">
              Glass • Aluminium • Mirror
            </p>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-sm mb-8">
              Precision-crafted glass supply, architectural aluminium fabrication, and
              bespoke mirror installations for discerning residential, commercial, and
              interior design clients.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {onOpenWhatsAppPicker ? (
                <button
                  type="button"
                  onClick={onOpenWhatsAppPicker}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Studio</span>
                </button>
              ) : (
                <a
                  href="https://wa.me/919227626898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Studio</span>
                </a>
              )}

              {onOpenCallPicker ? (
                <button
                  type="button"
                  onClick={onOpenCallPicker}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>Call Us</span>
                </button>
              ) : (
                <a
                  href="tel:+919227626898"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>Call Us</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="lg:col-span-2 md:col-span-1">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B99A63] block mb-5">
              Navigation
            </span>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="#hero" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-white transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Taxonomy */}
          <div className="lg:col-span-2 md:col-span-1">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B99A63] block mb-5">
              Services
            </span>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Glass
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Aluminium Fabrication
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Glass Railing
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  LED Mirrors
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Mirror Designs
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Workshop Location */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B99A63] block mb-5">
              Studio &amp; Workshop
            </span>
            <div className="space-y-4 text-xs sm:text-sm text-white/70">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#B99A63] shrink-0 mt-0.5" />
                <div>
                  <p className="font-light leading-relaxed">
                    D 68, shree vivekanand industrial estate Nr sheetal cinema, Gomtipur Rd, Rakhial, Ahmedabad, Gujarat 380021
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3AWbjd1VD8qc4NGr8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-[#D4BD8E] hover:underline mt-1.5"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <p className="text-xs text-white/90">
                  <span className="text-[#B99A63] font-medium">Girish bhai:</span>{" "}
                  <a href="tel:+919227626898" className="hover:text-white">+91 92276 26898</a>
                </p>
                <p className="text-xs text-white/90">
                  <span className="text-[#B99A63] font-medium">Dhaval bhai:</span>{" "}
                  <a href="tel:+919724316898" className="hover:text-white">+91 97243 16898</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-light gap-4">
          <p>© 2026 Chhanalal Chunilal Kachwala. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="text-white/40">Architectural Fabrication Studio</span>
            <a
              href="#hero"
              className="inline-flex items-center space-x-1 text-white/70 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
