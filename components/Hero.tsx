"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldCheck, PenTool, Award } from "lucide-react";

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#111111]"
    >
      {/* Background Architectural Image with Subtle Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2200&auto=format&fit=crop"
          alt="Modern architectural glass facade, frameless glass railing, and precision aluminium framing"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Editorial Multi-layer Gradient & Scrim for Pristine Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-44 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Champagne Gold Uppercase Subtitle */}
          <div className="inline-flex items-center space-x-3 mb-5 sm:mb-6 animate-fadeIn">
            <span className="h-[1px] w-8 bg-[#B99A63]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[#D4BD8E] uppercase">
              Glass • Aluminium • Mirror
            </span>
          </div>

          {/* Large Architectural Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6">
            Crafting Modern Spaces{" "}
            <span className="block font-normal text-white/90 italic">
              With Glass, Aluminium & Mirror.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mb-9">
            Custom fabrication, premium materials and precise installation for homes,
            businesses and architectural spaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onOpenQuoteModal}
              className="group inline-flex items-center justify-center bg-[#B99A63] text-[#171717] px-7 py-4 text-xs font-bold uppercase tracking-wider hover:bg-[#D4BD8E] transition-all duration-300 shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            <Link
              href="#work"
              className="group inline-flex items-center justify-center border border-white/40 bg-white/5 backdrop-blur-xs text-white px-7 py-4 text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-[#171717] hover:border-white transition-all duration-300"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Information Strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10 text-white/90">
            <div className="flex items-center space-x-3 sm:pr-4 pt-2 sm:pt-0">
              <PenTool className="w-4 h-4 text-[#B99A63] shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold block text-white">
                  Custom Fabrication
                </span>
                <span className="text-[11px] text-white/60 font-light">
                  Tailored exact dimensions & cuts
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:px-6 pt-3 sm:pt-0">
              <ShieldCheck className="w-4 h-4 text-[#B99A63] shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold block text-white">
                  Professional Installation
                </span>
                <span className="text-[11px] text-white/60 font-light">
                  Safe, structural & flawless finishing
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:pl-6 pt-3 sm:pt-0">
              <Award className="w-4 h-4 text-[#B99A63] shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold block text-white">
                  Quality Materials
                </span>
                <span className="text-[11px] text-white/60 font-light">
                  Certified toughened glass & heavy extrusions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
