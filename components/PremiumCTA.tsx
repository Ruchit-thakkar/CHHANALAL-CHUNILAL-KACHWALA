"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare, ArrowRight } from "lucide-react";

interface PremiumCTAProps {
  onOpenQuoteModal: () => void;
}

export default function PremiumCTA({ onOpenQuoteModal }: PremiumCTAProps) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#111111] text-white">
      {/* Background Architectural Glass Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=2200&auto=format&fit=crop"
          alt="Modern glass architecture and frameless glass balustrades"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-75 scale-100"
        />
        {/* Architectural Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gold Label */}
        <div className="inline-flex items-center space-x-2.5 mb-4">
          <span className="w-8 h-[1px] bg-[#B99A63]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4BD8E]">
            Start A Collaboration
          </span>
          <span className="w-8 h-[1px] bg-[#B99A63]" />
        </div>

        {/* Big Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Have a Project in Mind?
        </h2>

        {/* Supporting sentence */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Let&apos;s create the right glass, aluminium or mirror solution for your space.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#B99A63] text-[#171717] px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#D4BD8E] transition-all duration-300 shadow-md group"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="https://wa.me/919876543210?text=Hello%20Chhanalal%20Chunilal%20Kachwala,%20I%20have%20an%20upcoming%20project%20and%20would%20like%20to%20consult%20on%20glass%20and%20aluminium."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/40 bg-white/10 backdrop-blur-xs text-white px-8 py-4 text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-[#171717] hover:border-white transition-all duration-300 group"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-[#D4BD8E] group-hover:text-[#171717]" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
