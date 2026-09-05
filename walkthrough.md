# Walkthrough: Chhanalal Chunilal Kachwala Landing Page

A modern, architectural, premium landing page website created for **Chhanalal Chunilal Kachwala** (Glass Merchant, Aluminium Fabrication & Mirror Studio).

## Highlights & Design System

The website adheres strictly to the requested editorial architectural aesthetic:
- **Palette**:
  - Warm Ivory: `#F5F2EC` (primary background)
  - Deep Charcoal: `#171717` (primary headings & text)
  - Dark Contrast Sections: `#111111` (Why Choose Us, Footer, Hero)
  - Secondary Text: `#66635E`
  - Border Accents: `#D9D4CB`
  - Muted Champagne Accent: `#B99A63` (used thoughtfully for badges, dividers, icons, active states)
- **Typography**:
  - Headings: `DM Sans` (bold, architectural letter spacing)
  - Body: `Inter` (crisp, readable line heights)
- **Architecture**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React icons.

---

## Key Sections & Features Implemented

### 1. Sticky Editorial Navbar
- **Dynamic Scroll Effect**: Starts transparent over the hero and smoothly transitions into a frosted warm ivory backdrop blur (`#F5F2EC`/90) with subtle border on scroll.
- **Brand Identity**: Left-aligned business name and uppercase subtitle.
- **Desktop Navigation**: Anchor links with animated underline micro-interactions + "Get a Quote" button.
- **Mobile Drawer**: Responsive full-screen slide-down drawer with Call and WhatsApp quick triggers.

### 2. Full-Height Dramatic Hero (90–96vh)
- High-resolution architectural photography with multi-layer readability gradients.
- Gold uppercase badge: `GLASS • ALUMINIUM • MIRROR`.
- Architectural headline: *"Crafting Modern Spaces With Glass, Aluminium & Mirror."*
- Primary CTAs: **Get a Quote →** and **Explore Our Work**.
- Bottom trust bar: Custom Fabrication, Professional Installation, and Quality Materials.

### 3. Trust & Assurance Strip
- 4 core pillars: **Precision**, **Quality**, **Experience**, and **Service** separated by thin vertical dividers on desktop.

### 4. Complete Services Section (6 Premium Cards)
- Section header: *"What We Do - Complete Glass, Aluminium & Mirror Solutions."*
- 6 interactive service cards:
  1. **Glass Merchant** (Toughened, Laminated, Tinted & Low-Iron Glass)
  2. **Aluminium Fabrication** (Doors, Windows, Sliding & Casement)
  3. **Profile Work** (Slimline profiles, modular kitchen shutters, partitions)
  4. **Glass Railing** (Balcony base channels, spigot fittings, toughened railings)
  5. **LED Mirrors** (Backlit vanity mirrors, defogger pads, touch dimmers)
  6. **Custom Mirror Designs** (Organic shapes, beveled edges, antique tint)
- Micro-interactions: Cards lift by `4px` with subtle shadow and champagne border transition on hover.

### 5. Selected Work (Editorial Asymmetric Masonry Gallery)
- Categorized architectural portfolio with filter pills (*All Works*, *Glass Railing*, *Aluminium*, *Designer Mirrors*, *Custom Glass*).
- Asymmetric grid with varying aspect ratios (`col-span-7`, `col-span-5`, etc.) mimicking architectural monographs.
- Hover states with smooth image zoom, dark scrim, and interactive detail view modal.

### 6. About & Craftsmanship Section
- Two-column magazine layout pairing workshop fabrication photography with an authentic brand narrative.
- 3 factual capability indicators:
  - **01** Glass & Mirror (Supply & Processing)
  - **02** Aluminium (Profile Fabrication)
  - **03** Custom Design (End-to-End Execution)
- Strict adherence to prompt rules: zero fake years of experience, fake customer metrics, or artificial awards.

### 7. Why Clients Choose Us (Dark Charcoal Aesthetic `#111111`)
- Deep contrast section with 4 feature cards:
  - Quality Materials
  - Custom Solutions
  - Precise Fabrication
  - Professional Installation
- Minimal line iconography with champagne accents.

### 8. 4-Step Process Section
- Visual roadmap: **01 CONSULT** → **02 DESIGN** → **03 FABRICATE** → **04 INSTALL** connected by a thin horizontal alignment guide.

### 9. Striking Architectural CTA
- Full-width glass architecture background with direct action buttons: **Request a Quote** and **WhatsApp Us**.

### 10. Studio Contact & Accessible Enquiry Form
- **Left Column**: Direct phone link (`+91 98765 43210`), WhatsApp click-to-chat, studio address, and operating hours.
- **Right Column**: Interactive enquiry form with client-side validation for name, phone number, service selection, and project requirements.
- **Instant WhatsApp Generation**: Allows user to immediately export their form data directly into an organized WhatsApp message for quick quotation.

### 11. Interactive Quote & Project Lightbox Modals
- Global **QuoteModal**: Lets visitors select service type, residential vs. commercial scope, and dimensions.
- Global **ProjectModal**: Displays high-resolution photography, technical specs, and request similar quote action.
- Floating quick-contact widget for fast mobile/desktop reachability.

### 12. SEO & Schema.org LocalBusiness
- OpenGraph metadata, descriptive title, keywords, and `HomeAndConstructionBusiness` JSON-LD structured data.

---

## Verification Results

### Production Build
```bash
npm run build
```
- **Result**: Success (`Exit Code 0`)
- **Turbopack Compilation**: 3.3s
- **TypeScript Typecheck**: 0 errors
- **Static Page Generation**: `app/page.tsx` and `app/layout.tsx` pre-rendered cleanly without hydration or missing import issues.
