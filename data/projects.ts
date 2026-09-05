export interface ProjectItem {
  id: string;
  category: string;
  categorySlug: "all" | "railing" | "aluminium" | "mirror" | "glass";
  title: string;
  subtitle: string;
  locationType: string;
  aspectRatio: string;
  image: string;
  specs: string[];
  description: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "glass-railing-balcony",
    category: "GLASS RAILING",
    categorySlug: "railing",
    title: "Modern Balcony Installation",
    subtitle: "Frameless Toughened Glass System with Concealed Base Channel",
    locationType: "Residential Terrace",
    aspectRatio: "aspect-[4/5]",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    specs: ["12mm Toughened Clear Glass", "Heavy Anodized Base Track", "Slim Top Rail Protection"],
    description:
      "A seamless frameless glass railing system designed for an expansive modern balcony, ensuring uninterrupted skyline views while maintaining maximum wind-load resistance and safety.",
  },
  {
    id: "aluminium-windows-villa",
    category: "ALUMINIUM WINDOWS",
    categorySlug: "aluminium",
    title: "Minimalist Slimline Glazing",
    subtitle: "Floor-to-Ceiling Thermal Break Aluminium Profiles",
    locationType: "Architectural Villa",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    specs: ["Matte Charcoal Powder Coat", "Double-Glazed Acoustic Units", "Concealed Multipoint Hardware"],
    description:
      "Custom engineered floor-to-ceiling aluminium sliding window systems maximizing natural daylight, featuring slim 20mm interlocking sightlines and weather-tight sealing.",
  },
  {
    id: "designer-mirror-foyer",
    category: "DESIGNER MIRROR",
    categorySlug: "mirror",
    title: "Organic Statement Mirror",
    subtitle: "Bespoke Asymmetric Mirror with Beveled Contour",
    locationType: "Luxury Living Foyer",
    aspectRatio: "aspect-[4/5]",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    specs: ["6mm Extra-Clear Glass", "Custom Waterjet Organic Cut", "Champagne Brass Floating Mount"],
    description:
      "Artisanal custom-cut organic mirror functioning as a central design accent in an architectural entryway, reflecting ambient illumination and expanding spatial depth.",
  },
  {
    id: "led-mirror-suite",
    category: "LED MIRROR",
    categorySlug: "mirror",
    title: "Ambient Backlit Vanity Suite",
    subtitle: "Front & Reverse Perimeter LED with Smart Defogger",
    locationType: "Master Bathroom",
    aspectRatio: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    specs: ["CRI 95+ Warm-to-Cool Dimming", "Automatic Steam Demister", "Corrosion-Proof Backing"],
    description:
      "Precision-crafted architectural LED vanity mirror featuring soft rear perimeter glow and high-CRI front illumination for true-to-life reflections without glare.",
  },
  {
    id: "aluminium-door-partition",
    category: "ALUMINIUM DOOR",
    categorySlug: "aluminium",
    title: "Slim Profile Sliding Doors",
    subtitle: "Acoustic Glass with Narrow Sightline Aluminium Grid",
    locationType: "Contemporary Interior",
    aspectRatio: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop",
    specs: ["Heavy-Duty Top-Hung Track", "Zero Bottom Floor Recess", "Fluted & Clear Dual Panes"],
    description:
      "Modern interior space partition featuring slimline aluminium framing and whisper-quiet roller bearings, creating seamless fluid division between living spaces.",
  },
  {
    id: "custom-glass-installation",
    category: "CUSTOM GLASS INSTALLATION",
    categorySlug: "glass",
    title: "Architectural Glass Facade & Partition",
    subtitle: "Custom Structural Toughened Glazing System",
    locationType: "Commercial & Retail Space",
    aspectRatio: "aspect-[16/10]",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    specs: ["15mm Low-Iron Monolithic Glass", "Flush Patch Hardware", "Silicon Butted Clear Joints"],
    description:
      "High-precision architectural glass installation featuring expansive low-iron panes and flush concealed structural fittings for a pristine transparent aesthetic.",
  },
];
