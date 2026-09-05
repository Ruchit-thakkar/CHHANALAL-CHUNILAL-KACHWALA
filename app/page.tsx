"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import PremiumCTA from "@/components/PremiumCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import ProjectModal from "@/components/ProjectModal";
import FloatingActions from "@/components/FloatingActions";
import { ServiceItem } from "@/data/services";
import { ProjectItem } from "@/data/projects";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleSelectServiceFromCard = (service: ServiceItem) => {
    handleOpenQuoteModal(service.title);
  };

  const handleSelectProjectFromGrid = (project: ProjectItem) => {
    setSelectedProjectForModal(project);
  };

  const handleRequestQuoteForProject = (project: ProjectItem) => {
    setSelectedProjectForModal(null);
    handleOpenQuoteModal(`${project.category} - ${project.title}`);
  };

  return (
    <main className="relative min-h-screen bg-[#F5F2EC] text-[#171717] overflow-x-hidden selection:bg-[#B99A63]/25">
      {/* Sticky Architectural Navbar */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        mobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Dramatic Full-width Hero Section */}
      <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Trust & Assurance Horizontal Strip */}
      <TrustBar />

      {/* Editorial Architectural Manifesto Strip */}
      <section className="py-14 sm:py-20 bg-[#F5F2EC] border-b border-[#D9D4CB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B99A63] block mb-3">
                Architectural Studio &amp; Supply
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#171717] uppercase leading-[0.98]">
                Glass.<br />
                Aluminium.<br />
                Mirror.
              </h2>
            </div>
            <div className="max-w-md lg:pb-2">
              <p className="text-base sm:text-lg text-[#66635E] font-light leading-relaxed border-l-2 border-[#B99A63] pl-4 sm:pl-5">
                Precision-crafted solutions for contemporary residential, commercial and
                interior design spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section (6 Cards) */}
      <Services onSelectService={handleSelectServiceFromCard} />

      {/* Featured Projects Architectural Masonry Portfolio */}
      <FeaturedProjects onSelectProject={handleSelectProjectFromGrid} />

      {/* About & Craftsmanship Section */}
      <About />

      {/* Why Choose Us (Dark Charcoal Aesthetic) */}
      <WhyChooseUs />

      {/* 4-Step Process Section */}
      <Process />

      {/* Striking Architectural CTA Section */}
      <PremiumCTA onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Contact & Inquiry Section */}
      <Contact />

      {/* Dark Footer */}
      <Footer />

      {/* Interactive Modal Lightboxes */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedService={selectedServiceForQuote}
      />

      <ProjectModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onRequestQuoteForProject={handleRequestQuoteForProject}
      />

      {/* Floating Quick Action Contact Widget */}
      <FloatingActions
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </main>
  );
}
