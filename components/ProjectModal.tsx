"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, Check, MapPin } from "lucide-react";
import { ProjectItem } from "@/data/projects";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuoteForProject: (project: ProjectItem) => void;
}

export default function ProjectModal({
  project,
  onClose,
  onRequestQuoteForProject,
}: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative bg-[#F5F2EC] border border-[#D9D4CB] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl z-10 text-[#171717]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#B99A63]"
          aria-label="Close project preview"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Showcase */}
          <div className="md:col-span-7 relative h-[320px] sm:h-[420px] md:h-auto min-h-[380px] bg-[#171717]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#D4BD8E] bg-black/50 px-2.5 py-1 border border-white/10 inline-block mb-1">
                {project.category}
              </span>
            </div>
          </div>

          {/* Details & Specifications */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs text-[#66635E] mb-2">
                <MapPin className="w-3.5 h-3.5 text-[#9A7D4A]" />
                <span className="font-medium">{project.locationType}</span>
              </div>

              <h3 id="project-modal-title" className="font-heading text-2xl font-bold text-[#171717] mb-2 leading-tight">
                {project.title}
              </h3>

              <p className="text-xs uppercase tracking-wider text-[#B99A63] font-semibold mb-4">
                {project.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#66635E] font-light leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Technical Specs */}
              <div className="border-t border-b border-[#D9D4CB] py-4 mb-6">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#171717] block mb-2.5">
                  Key Specifications
                </span>
                <ul className="space-y-2">
                  {project.specs.map((spec, i) => (
                    <li key={i} className="flex items-center text-xs text-[#66635E]">
                      <div className="w-4 h-4 rounded-full bg-[#B99A63]/20 flex items-center justify-center text-[#9A7D4A] mr-2 shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action */}
            <div>
              <button
                onClick={() => onRequestQuoteForProject(project)}
                className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B99A63] transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Request Similar Installation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
