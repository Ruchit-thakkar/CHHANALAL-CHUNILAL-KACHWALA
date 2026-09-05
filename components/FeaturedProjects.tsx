"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projects";

interface FeaturedProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { label: "All Works", value: "all" },
    { label: "Glass Railing", value: "railing" },
    { label: "Aluminium", value: "aluminium" },
    { label: "Designer Mirrors", value: "mirror" },
    { label: "Custom Glass", value: "glass" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.categorySlug === activeFilter);

  return (
    <section id="work" className="py-20 sm:py-28 bg-[#EAE5DB]/40 border-t border-[#D9D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2.5 mb-3">
              <span className="w-2 h-2 bg-[#B99A63]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B99A63]">
                Selected Work
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171717]">
              Made for the Space. Built to Last.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`text-xs uppercase tracking-wider px-3.5 py-2 transition-all duration-200 font-medium ${
                  activeFilter === tab.value
                    ? "bg-[#171717] text-white"
                    : "bg-white text-[#66635E] border border-[#D9D4CB] hover:border-[#171717] hover:text-[#171717]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            // Asymmetric column spans to achieve architectural magazine aesthetic
            // 0: span 7, 1: span 5, 2: span 5, 3: span 7, 4: span 6, 5: span 6
            let colSpan = "lg:col-span-6";
            if (idx === 0) colSpan = "lg:col-span-7";
            if (idx === 1) colSpan = "lg:col-span-5";
            if (idx === 2) colSpan = "lg:col-span-5";
            if (idx === 3) colSpan = "lg:col-span-7";
            if (idx === 4) colSpan = "lg:col-span-6";
            if (idx === 5) colSpan = "lg:col-span-6";

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative overflow-hidden bg-[#171717] cursor-pointer border border-[#D9D4CB] transition-all duration-300 hover:border-[#B99A63] ${colSpan}`}
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.category} - ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge: Category & Arrow */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold text-[#D4BD8E] bg-black/40 backdrop-blur-xs px-3 py-1 border border-white/10">
                      {project.category}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white group-hover:bg-[#B99A63] group-hover:border-[#B99A63] group-hover:text-[#171717] transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom Info: Title, Subtitle, Location */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-10 text-white transform transition-transform duration-300">
                    <div className="text-[11px] uppercase tracking-wider text-white/60 mb-1 font-medium">
                      {project.locationType}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white group-hover:text-[#D4BD8E] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Subtext / Inquiry note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#66635E]">
            Looking for a custom finish, specific glass thickness, or custom profile?{" "}
            <a
              href="#contact"
              className="font-semibold text-[#171717] underline decoration-[#B99A63] underline-offset-4 hover:text-[#9A7D4A] transition-colors"
            >
              Discuss your architectural blueprint with us →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
