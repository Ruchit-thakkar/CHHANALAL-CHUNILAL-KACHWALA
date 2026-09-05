import React from "react";
import Image from "next/image";
import { Check, Ruler, Eye, Wrench } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F2EC] border-t border-[#D9D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Workshop / Fabrication Craftsmanship Image */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden border border-[#D9D4CB] bg-[#171717]">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"
                  alt="Precision glass cutting, aluminium profile fitting, and workshop craftsmanship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Architectural Framing Detail / Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white border border-[#D9D4CB] p-5 sm:p-6 shadow-sm max-w-[240px] hidden sm:block">
                <div className="flex items-center space-x-2 text-[#9A7D4A] mb-1.5">
                  <Ruler className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717]">
                    Tolerances
                  </span>
                </div>
                <p className="text-xs text-[#66635E] font-light leading-relaxed">
                  Engineered with millimeter precision for flush architectural finishes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Story & Capabilities */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Small Label */}
            <div className="inline-flex items-center space-x-2.5 mb-3">
              <span className="w-2 h-2 bg-[#B99A63]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63]">
                About Chhanalal Chunilal Kachwala
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717] leading-[1.18] mb-6">
              Built Around Quality, Precision &amp; Craftsmanship.
            </h2>

            {/* Body */}
            <div className="space-y-4 text-base sm:text-lg text-[#66635E] font-light leading-relaxed mb-10">
              <p>
                Chhanalal Chunilal Kachwala provides glass, aluminium and mirror solutions
                for modern spaces. From material selection and fabrication to finishing and
                installation, every project is approached with attention to detail and
                practical craftsmanship.
              </p>
              <p className="text-sm sm:text-base text-[#66635E]/90">
                Whether you are a homeowner curating custom vanity mirrors, an architect
                designing minimal slimline windows, or an interior designer executing
                bespoke partitions, we ensure every cut, miter, and glass edge matches your
                vision with durable reliability.
              </p>
            </div>

            {/* Stat Row - strictly strictly factual capability pillars without invented years or fake metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-b border-[#D9D4CB] py-6 sm:py-8 mb-8">
              <div>
                <span className="block font-heading text-2xl sm:text-3xl font-bold text-[#171717] mb-1">
                  01
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block">
                  Glass &amp; Mirror
                </span>
                <span className="text-[11px] text-[#66635E]/80 font-light mt-0.5 block">
                  Supply &amp; Processing
                </span>
              </div>

              <div className="border-l border-[#D9D4CB] pl-4 sm:pl-6">
                <span className="block font-heading text-2xl sm:text-3xl font-bold text-[#171717] mb-1">
                  02
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block">
                  Aluminium
                </span>
                <span className="text-[11px] text-[#66635E]/80 font-light mt-0.5 block">
                  Profile Fabrication
                </span>
              </div>

              <div className="border-l border-[#D9D4CB] pl-4 sm:pl-6">
                <span className="block font-heading text-2xl sm:text-3xl font-bold text-[#171717] mb-1">
                  03
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#66635E] block">
                  Custom Design
                </span>
                <span className="text-[11px] text-[#66635E]/80 font-light mt-0.5 block">
                  End-to-End Execution
                </span>
              </div>
            </div>

            {/* Ethos bullet highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#171717] font-medium">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Certified toughened safety glass</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>High-grade architectural alloys</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>On-site dimensional surveys</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Neat, clean site handover</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
