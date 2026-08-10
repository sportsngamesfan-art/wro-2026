# BhashaSetu Professional Website

A modern, production-ready website showcasing BhashaSetu—a groundbreaking platform for language preservation and cultural heritage conservation.

## Project Overview

This website communicates the mission, technology, and impact of BhashaSetu to judges, supporters, and the global community. It's designed for WRO 2026 (World Robot Olympiad) Future Innovators competition.

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom color system
- **Animations**: Framer Motion for smooth interactions
- **Deployment**: Vercel-ready
- **Performance**: Optimized for mobile-first responsive design

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page composition
├── components/
│   ├── Navbar.tsx           # Sticky navigation
│   ├── Hero.tsx             # Hero section with animated waveform
│   ├── ProblemSection.tsx    # Language preservation challenge
│   ├── CoreInsight.tsx       # Accessibility-first design principle
│   ├── RobotShowcase.tsx     # Interactive hardware showcase
│   ├── HowItWorks.tsx        # 6-step process timeline
│   ├── StoryArchive.tsx      # Preservation system showcase
│   ├── Languages.tsx         # Supported and planned languages
│   ├── Technology.tsx        # Hardware & software stack
│   ├── Impact.tsx            # Real-world applications
│   ├── BusinessModel.tsx     # Scalability & future forms
│   ├── FutureVision.tsx      # Long-term vision
│   ├── Team.tsx              # Heritage Hackers team
│   └── Footer.tsx            # Footer with links
├── tailwind.config.ts        # Custom color system
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## Key Features

### Design System
- **Color Palette**: Navy/charcoal, warm ivory, saffron/gold accents
- **Typography**: System font stack for optimal performance
- **Spacing**: Generous whitespace and visual hierarchy
- **Animations**: Smooth, purposeful motion respecting `prefers-reduced-motion`

### Sections

1. **Hero** - Cinematic introduction with animated sound waves
2. **The Problem** - Context on language extinction and cultural loss
3. **Core Insight** - Philosophy: technology should adapt to people
4. **BhashaSetu Robot** - Interactive hardware showcase
5. **How It Works** - 6-step preservation process
6. **Story Archive** - Example of preserved content
7. **Languages** - Current support and expansion plans
8. **Technology** - Hardware and AI components
9. **Impact** - Real-world applications
10. **Business Model** - Scalability and future forms
11. **Future Vision** - Long-term aspirations
12. **Team** - Heritage Hackers members
13. **Footer** - Navigation and contact

### Responsive Design
- Mobile-first approach
- Proper touch targets and spacing
- Hamburger menu on mobile
- Adaptive typography and layouts

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Focus states and indicators
- Color contrast compliance
- Alt text placeholders
- Reduced motion support

## Development

### Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Build
```bash
npm run build
npm start
```

### TypeScript Check
```bash
npx tsc --noEmit
```

## Color System

### Navy (Primary)
- `navy-900`: #1a1f30 (text, dark elements)
- `navy-800`: #2a324a
- `navy-700`: #3d4a6e
- `navy-600`: #5a6b8f
- `navy-50`: #f8f9fc (backgrounds)

### Saffron (Accent)
- `saffron-600`: #d97e2d (primary accent)
- `saffron-500`: #e89e4c
- `saffron-100`: #fce5cc (light backgrounds)

### Supporting
- White, ivory, muted grays for balance

## Component Guidelines

### Adding New Sections

1. Create a new component in `components/`
2. Use `React.useRef` for intersection observer refs
3. Implement `useInView` pattern for animations
4. Use `motion` for Framer Motion animations
5. Follow the color system and spacing

### Example Section Template

```tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NewSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.3 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="section-id" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Content */}
    </section>
  )
}
```

## Customization

### Update Colors
Edit `tailwind.config.ts` to modify the color system.

### Add Languages
Modify the `currentLanguages` and `futureLanguages` arrays in `Languages.tsx`.

### Update Team
Edit team member info in `Team.tsx`.

### Modify Content
All text content can be easily edited in component files—look for section-specific arrays and objects.

## Performance

- Built with Next.js image optimization
- Lazy loading for sections
- Code splitting by route
- Minimal external dependencies
- CSS-in-JS via Tailwind (no runtime overhead)

## Deployment to Vercel

1. Connect repository to Vercel
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Deploy!

The website will automatically rebuild on pushes to the branch.

## Features to Add Later

- [ ] Team member photos
- [ ] Robot demo video
- [ ] Language audio samples
- [ ] Blog/news section
- [ ] Impact metrics dashboard
- [ ] Contact form with email integration
- [ ] Social media links
- [ ] PDF brochure download

## Content Placeholders

The following items are marked as placeholders and should be updated:
- Team member photos (use 👤 emoji currently)
- Robot visual (use 🤖 emoji currently)
- Language audio examples
- Statistics in "The Problem" section (marked with [Data])
- Any fictional/sample data

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Testing

- WAVE browser extension
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification
- Motion preferences

## License

Part of the WRO 2026 Heritage Hackers project submission.

---

**Last Updated**: August 2026
**Team**: Heritage Hackers (Ayansh Agarwal, Riaan Laiwala, Siddharth Thawani)
**School**: Jamnabai Narsee School, Mumbai, India
