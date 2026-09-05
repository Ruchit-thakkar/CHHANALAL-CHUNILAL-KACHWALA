import React from "react";
import { Compass, Sparkles, CheckCircle2, Headphones } from "lucide-react";

export default function TrustBar() {
  const trustPoints = [
    {
      title: "Precision",
      description: "Custom fabrication tailored to your space.",
      icon: Compass,
    },
    {
      title: "Quality",
      description: "Reliable materials and careful finishing.",
      icon: Sparkles,
    },
    {
      title: "Experience",
      description: "Practical solutions for modern interiors.",
      icon: CheckCircle2,
    },
    {
      title: "Service",
      description: "From consultation to installation.",
      icon: Headphones,
    },
  ];

  return (
    <section className="bg-[#F5F2EC] border-b border-[#D9D4CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#D9D4CB]">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex flex-col justify-start ${
                  index !== 0 ? "lg:pl-8" : ""
                } ${index !== trustPoints.length - 1 ? "lg:pr-8" : ""}`}
              >
                <div className="flex items-center space-x-2.5 mb-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#B99A63]/15 flex items-center justify-center text-[#9A7D4A]">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-[#171717]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-[#66635E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
