"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from "lucide-react";

interface NavbarProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export default function Navbar({
  onOpenQuoteModal,
  mobileMenuOpen: controlledMobileMenuOpen,
  setMobileMenuOpen: setControlledMobileMenuOpen,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);

  const mobileMenuOpen = controlledMobileMenuOpen !== undefined ? controlledMobileMenuOpen : internalMobileMenuOpen;
  const setMobileMenuOpen = setControlledMobileMenuOpen || setInternalMobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-[#F5F2EC]/90 backdrop-blur-md shadow-xs border-b border-[#D9D4CB]/60 py-3.5"
            : "bg-transparent py-5 lg:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo / Business Name */}
            <Link
              href="#hero"
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63]"
              aria-label="Chhanalal Chunilal Kachwala - Back to top"
            >
              <span
                className={`font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase transition-colors duration-300 ${isScrolled ? "text-[#171717]" : "text-white lg:text-white"
                  }`}
              >
                Chhanalal Chunilal Kachwala
              </span>
              <span
                className={`text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${isScrolled ? "text-[#B99A63]" : "text-[#D4BD8E]"
                  }`}
              >
                Glass • Aluminium • Mirror Studio
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 hover:text-[#B99A63] ${isScrolled ? "text-[#171717]" : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B99A63] transition-all duration-300 hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right Action / CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className={`group inline-flex items-center justify-center text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-all duration-300 border ${isScrolled
                    ? "border-[#171717] bg-[#171717] text-white hover:bg-[#B99A63] hover:border-[#B99A63]"
                    : "border-white/80 bg-white/10 text-white backdrop-blur-xs hover:bg-white hover:text-[#171717] hover:border-white"
                  }`}
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => onOpenQuoteModal()}
                className={`text-xs px-3 py-1.5 font-medium uppercase tracking-wider border ${isScrolled
                    ? "border-[#171717] text-[#171717]"
                    : "border-white/80 text-white bg-black/20 backdrop-blur-xs"
                  }`}
              >
                Quote
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A63] ${isScrolled ? "text-[#171717]" : "text-white"
                  }`}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#111111]/95 backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col justify-between p-6 pt-24 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-5">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B99A63] font-semibold border-b border-white/10 pb-2">
            Navigation Menu
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-heading font-medium text-white/90 hover:text-[#B99A63] transition-colors py-1 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-5 h-5 text-white/40" />
            </Link>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 border border-white/15 text-white text-xs uppercase tracking-wider font-medium hover:bg-white/10"
            >
              <Phone className="w-4 h-4 text-[#B99A63]" />
              <span>Call Studio</span>
            </a>
            <a
              href="https://wa.me/919876543210?text=Hello%20Chhanalal%20Chunilal%20Kachwala,%20I%20would%20like%20to%20inquire%20about%20your%20glass%20and%20aluminium%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#B99A63] text-[#171717] text-xs uppercase tracking-wider font-semibold hover:bg-[#D4BD8E]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuoteModal();
            }}
            className="w-full py-3.5 bg-white text-[#171717] font-semibold text-xs uppercase tracking-widest text-center hover:bg-[#F5F2EC] transition-colors"
          >
            Request Custom Quote →
          </button>
        </div>
      </div>
    </>
  );
}
