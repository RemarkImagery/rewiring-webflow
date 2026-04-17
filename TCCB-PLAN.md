# TCC Business Group — "The 25% Electric Challenge"

## Component Naming: `Tccb` prefix (This Car Can Business)
## Directory: `src/components/TccBusiness/`

---

## Components (11 total, 6 build agents)

### Agent A: TccbHero + TccbFooterCta
1. **TccbHero** — Hero with bold headline, subhead, CTA button, organic yellow shape treatment, optional animated pledge counter
2. **TccbFooterCta** — Full-width yellow banner CTA with two buttons + social sharing

### Agent B: TccbWhy + TccbBenefits
3. **TccbWhy** — Punchy copy block + 3 stat callouts (150k vehicles, 60% business, 25%=22,500 BEVs) with squiggle border boxes
4. **TccbBenefits** — Grid of 4-6 benefit cards with organic border style, icons, short paragraphs

### Agent C: TccbCalculator (complex — standalone)
5. **TccbCalculator** — Interactive fleet savings calculator with slider input, stat tiles (yellow box treatment), animated donut chart (9,173 vs 26,000 target)

### Agent D: TccbTimeline + TccbPledge
6. **TccbTimeline** — Second-hand market narrative, timeline graphic (fleet→household in 2-4yrs), policy levers callout
7. **TccbPledge** — 3-step visual (Commit→Act→Report), CTA form/signup, digital badge preview

### Agent E: TccbSupport + TccbFaq
8. **TccbSupport** — Accordion/two-column layout: Advocacy, Resources, Promotion, Deals, Monitoring
9. **TccbFaq** — Accordion addressing range, cost, charging, greenwashing objections

### Agent F: TccbTestimonials + TccbPartners
10. **TccbTestimonials** — Business case study quotes in yellow box treatment, carousel or grid
11. **TccbPartners** — Logo grid of collaborators + optional leaderboard/progress tracker

---

## Design System

### Colors
- Primary dark: #1a3c3c (headings)
- Primary mid: #2d5c5a (buttons, accents)
- Text muted: #5a7a78
- Yellow/warm: #FFFCF0 (background), organic yellow shapes
- White: #ffffff

### Typography
- Font: 'Rubik', sans-serif (400, 600, 700)
- Headings: clamp responsive sizing
- Body: 1rem–1.15rem

### Patterns
- useId() scoped class names (Shadow DOM safe)
- `declareComponent` in .webflow.tsx files
- `options: { ssr: false }` for interactive components
- Props via `@webflow/data-types`
- Inline `<style>` blocks with uid-scoped classes
- Organic shapes: .one/.box yellow treatment for headlines
- Squiggle borders: .squiggle / .squiggle_dash decorative borders

### Component Template
```tsx
// Component.tsx
"use client";
import React, { useState, useId } from "react";

interface TccbXxxProps { ... }

export default function TccbXxx(props: TccbXxxProps) {
  const uid = useId().replace(/:/g, "");
  // ...
  return (
    <div className={`tccb-xxx-root-${uid}`}>
      {/* content */}
      <style>{`/* uid-scoped styles */`}</style>
    </div>
  );
}
```

```tsx
// Component.webflow.tsx
import TccbXxx from "./TccbXxx";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(TccbXxx, {
  name: "TCCB Xxx",
  description: "...",
  group: "TCC Business",
  options: { ssr: false },
  props: { ... },
});
```
