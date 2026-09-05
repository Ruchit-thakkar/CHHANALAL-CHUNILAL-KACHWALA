export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  description: string;
  highlights: string[];
  iconName: string;
  applications: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "glass-merchant",
    number: "01",
    title: "Glass Merchant",
    shortDesc: "All types of glass for residential, commercial and interior applications.",
    description:
      "Comprehensive glass supply offering toughened, laminated, tinted, frosted, fluted, clear float, and acoustic glass sourced to exact industry standards.",
    highlights: ["Toughened & Laminated Safety Glass", "Fluted & Textured Architectural Glass", "Clear Float & Extra-Clear Low Iron", "Tinted & Solar Control Glass"],
    iconName: "Layers",
    applications: ["Partitions", "Table Tops", "Facade Glazing", "Shower Enclosures"],
  },
  {
    id: "aluminium-fabrication",
    number: "02",
    title: "Aluminium Fabrication",
    shortDesc: "Custom aluminium doors, windows, frames and fabrication solutions.",
    description:
      "Precision-engineered aluminium solutions built with heavy-gauge extrusions, seamless miter joints, durable powder coating, and anodized architectural finishes.",
    highlights: ["Sliding & Casement Windows", "Heavy-Duty Slide & Fold Doors", "Aluminium Entrance Louvers", "Powder-Coated & Anodized Finishes"],
    iconName: "Frame",
    applications: ["Residential Villas", "Commercial Storefronts", "Balcony Enclosures"],
  },
  {
    id: "profile-work",
    number: "03",
    title: "Profile Work",
    shortDesc: "Precision aluminium profile solutions for modern architectural applications.",
    description:
      "Slimline architectural profile systems designed for minimalist aesthetic lines, kitchen cabinet glass shutters, wardrobe partitions, and interior framing.",
    highlights: ["Slim Minimalist Sightlines", "Concealed Hardware Integration", "Custom Gasket & Weatherseals", "Anodized Champagne & Black Finishes"],
    iconName: "Maximize2",
    applications: ["Wardrobe Shutters", "Modular Kitchen Glass", "Slim Room Dividers"],
  },
  {
    id: "glass-railing",
    number: "04",
    title: "Glass Railing",
    shortDesc: "Elegant and durable glass railing systems for balconies, staircases and interiors.",
    description:
      "Structural glass railings combining unhindered panoramic views with uncompromising safety. Engineered with heavy aluminium base channels or stainless steel spigots.",
    highlights: ["Frameless Continuous Base Channel", "Side-Mounted Spigot Railings", "Laminated Toughened Glass", "Sleek Stainless Steel Handrails"],
    iconName: "ShieldCheck",
    applications: ["Balconies & Terraces", "Staircases", "Mezzanines", "Pool Perimeters"],
  },
  {
    id: "led-mirrors",
    number: "05",
    title: "LED Mirrors",
    shortDesc: "Contemporary LED mirror solutions combining functionality with modern design.",
    description:
      "State-of-the-art backlit and front-lit vanity mirrors with integrated ambient lighting, demister heating pads, touch dimmers, and custom color temperatures.",
    highlights: ["Defogger & Demister Technology", "Dual/Tri-Color Temperature LED", "Touch & Wave Motion Sensor", "High-CRI Glare-Free Illumination"],
    iconName: "Sparkles",
    applications: ["Luxury Bathrooms", "Dressing Rooms", "Vanity Consoles", "Hotel Suites"],
  },
  {
    id: "custom-mirror-designs",
    number: "06",
    title: "Custom Mirror Designs",
    shortDesc: "Designer mirrors, decorative mirrors and custom shapes created for your space.",
    description:
      "Artisanal decorative mirrors crafted in organic arches, beveled geometric shapes, antique-wash tinting, and bespoke metal or wooden profile surrounds.",
    highlights: ["Organic Asymmetric Silhouettes", "Deep Beveled Edge Detailing", "Tinted Bronze, Rose & Grey Mirrors", "Full-Length Floor & Wall Mounting"],
    iconName: "Component",
    applications: ["Living Foyers", "Dining Feature Walls", "Master Suites", "Boutique Showrooms"],
  },
];
