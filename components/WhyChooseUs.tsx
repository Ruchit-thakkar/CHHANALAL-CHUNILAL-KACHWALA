import React from "react";
import { ShieldCheck, Sliders, Ruler, HardHat } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Quality Materials",
      description: "Reliable materials selected for the application.",
      detail:
        "High-density aluminium profiles, defect-free float glass, and safety-rated laminates built to withstand environmental stresses and daily use.",
      icon: ShieldCheck,
      number: "01",
    },
    {
      title: "Custom Solutions",
      description: "Designed around your dimensions, style and requirements.",
      detail:
        "Every project is customized to your exact room geometry, interior color palette, hardware preference, and architectural intent.",
      icon: Sliders,
      number: "02",
    },
    {
      title: "Precise Fabrication",
      description: "Careful measurements, fabrication and finishing.",
      detail:
        "Computer-guided miter cutting, smooth beveled polishing, and clean silicone jointing executed with meticulous attention to detail.",
      icon: Ruler,
      number: "03",
    },
    {
      title: "Professional Installation",
      description: "A complete process from fabrication to final installation.",
      detail:
        "Experienced technicians manage delivery, anchoring, structural alignment, and pristine site clean-up for ready-to-use handover.",
      icon: HardHat,
      number: "04",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-2 h-2 bg-[#B99A63]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4BD8E]">
              Our Difference
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Why Clients Choose Us
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            We bridge the gap between technical fabrication rigor and refined interior aesthetics,
            ensuring each installation performs seamlessly for years.
          </p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-[#1A1A1A] border border-[#2B2B2B] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#B99A63]/70 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-xs font-bold text-[#B99A63] tracking-widest">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4BD8E] group-hover:border-[#B99A63] group-hover:bg-[#B99A63]/20 transition-all duration-300">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#D4BD8E] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#B99A63] uppercase tracking-wider mb-3">
                    {item.description}
                  </p>

                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center space-x-2 text-[11px] text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63]" />
                  <span>Verified fabrication standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
