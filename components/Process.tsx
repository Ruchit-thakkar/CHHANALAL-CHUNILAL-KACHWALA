import React from "react";
import { MessageSquare, PenTool, Cog, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      step: "01",
      title: "CONSULT",
      headline: "Requirement & On-Site Survey",
      description: "Understand your requirements, dimensions and design.",
      icon: MessageSquare,
    },
    {
      step: "02",
      title: "DESIGN",
      headline: "Material & Profile Selection",
      description: "Recommend suitable materials, profiles, glass and finishes.",
      icon: PenTool,
    },
    {
      step: "03",
      title: "FABRICATE",
      headline: "Precision Studio Crafting",
      description: "Precisely fabricate the required glass, aluminium or mirror solution.",
      icon: Cog,
    },
    {
      step: "04",
      title: "INSTALL",
      headline: "Structural Mounting & Finishing",
      description: "Complete installation and finishing at your location.",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F5F2EC] border-t border-[#D9D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-2 h-2 bg-[#B99A63]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63]">
              Workflow
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-5">
            Straightforward Process. Flawless Execution.
          </h2>
          <p className="text-base sm:text-lg text-[#66635E] font-light leading-relaxed">
            From preliminary measurement to final silicone bead, we ensure predictable
            timelines and uncompromising build quality.
          </p>
        </div>

        {/* 4 Steps with Connecting Line */}
        <div className="relative">
          {/* Thin Horizontal Connecting Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[1px] bg-[#D9D4CB] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col">
                  {/* Step Icon & Number Badge */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-14 h-14 bg-white border border-[#D9D4CB] flex items-center justify-center text-[#171717] shadow-xs">
                      <span className="font-heading text-base font-bold text-[#9A7D4A]">
                        {item.step}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">
                      {item.title}
                    </span>
                  </div>

                  {/* Step Description */}
                  <div className="bg-white border border-[#D9D4CB] p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-base font-bold text-[#171717] mb-2">
                        {item.headline}
                      </h3>
                      <p className="text-sm text-[#66635E] leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#D9D4CB]/60 flex items-center justify-between text-xs text-[#9A7D4A] font-medium">
                      <span>Phase {index + 1} of 4</span>
                      <Icon className="w-4 h-4 text-[#B99A63]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
