import React from "react";
import Link from "next/link";
import { MessageSquare, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

            <div className="flex items-center space-x-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-[#B99A63] text-[#171717] hover:bg-[#D4BD8E] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Studio</span>
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
                <span>Call Now</span>
              </a>
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

          {/* Studio Details */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B99A63] block mb-5">
              Studio Details
            </span>
            <div className="space-y-4 text-xs sm:text-sm text-white/70">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#B99A63] shrink-0 mt-0.5" />
                <p className="font-light leading-relaxed">
                  Glass &amp; Aluminium Market, Main Road. Serving Regional Interior &amp; Architectural Projects.
                </p>
              </div>
              <p className="font-light text-white/50 text-xs">
                Mon - Sat: 9:30 AM - 8:00 PM<br />
                Sunday: On-Site Site Consultation by Appointment
              </p>
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
