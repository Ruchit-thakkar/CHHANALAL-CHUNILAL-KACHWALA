"use client";

import React from "react";
import {
  Layers,
  Frame,
  Maximize2,
  ShieldCheck,
  Sparkles,
  Component,
  ArrowRight,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  // Map icon names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case "Layers":
        return Layers;
      case "Frame":
        return Frame;
      case "Maximize2":
        return Maximize2;
      case "ShieldCheck":
        return ShieldCheck;
      case "Sparkles":
        return Sparkles;
      case "Component":
      default:
        return Component;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <span className="w-2 h-2 bg-[#B99A63]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63]">
              What We Do
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171717] mb-5">
            Complete Glass, Aluminium &amp; Mirror Solutions.
          </h2>
          <p className="text-base sm:text-lg text-[#66635E] font-light leading-relaxed">
            From everyday glass requirements to custom architectural installations,
            we create solutions designed around your space.
          </p>
        </div>

        {/* 6 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="group relative bg-white border border-[#D9D4CB] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#B99A63] hover:-translate-y-1 hover:shadow-sm cursor-pointer"
              >
                {/* Top Row: Index Number & Minimal Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-sm font-semibold tracking-widest text-[#B99A63]">
                      {service.number}
                    </span>
                    <span className="p-2.5 bg-[#F5F2EC] text-[#171717] group-hover:bg-[#B99A63]/15 group-hover:text-[#9A7D4A] transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading text-xl font-bold text-[#171717] mb-3 tracking-tight group-hover:text-[#9A7D4A] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm text-[#66635E] leading-relaxed mb-6 font-light">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Bottom Row: Capabilities pills & interactive arrow */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[#D9D4CB]/60">
                    {service.highlights.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-[#66635E] bg-[#F5F2EC] px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#171717] group-hover:text-[#9A7D4A] transition-colors">
                      Inquire Specs
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#D9D4CB] flex items-center justify-center text-[#171717] group-hover:border-[#B99A63] group-hover:bg-[#B99A63] group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
