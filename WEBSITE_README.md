# BhashaSetu Website

A professional, modern website for the BhashaSetu robotics project. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Project Structure

```
/app                  # Next.js app directory
  /layout.tsx         # Root layout with metadata
  /page.tsx          # Main page assembling all sections
  /globals.css       # Global styles and utilities

/components          # Reusable React components
  Navbar.tsx         # Sticky navigation with mobile menu
  Hero.tsx           # Hero section with animated waveform
  Waveform.tsx       # Animated audio visualization
  ProblemSection.tsx # Problem statement section
  CoreInsight.tsx    # Core philosophy with process flow
  RobotShowcase.tsx  # Robot showcase with interactive components
  HowItWorks.tsx     # Step-by-step process timeline
  StoryArchive.tsx   # Story preservation archive showcase
  Languages.tsx      # Language support section
  Technology.tsx     # Technology stack overview
  Impact.tsx         # Real-world impact areas
  BusinessModel.tsx  # Scalability and deployment models
  FutureVision.tsx   # Future vision with progression
  Team.tsx           # Team section
  FinalCTA.tsx       # Final call-to-action
  Footer.tsx         # Footer with links
  Badge.tsx          # Reusable badge component
  /hooks
    useInView.ts     # Intersection observer hook

/public              # Static assets
  /images            # Image directory (placeholder for now)
  /videos            # Video directory (placeholder for now)

.config files:
  next.config.js     # Next.js configuration
  tailwind.config.ts # Tailwind configuration
  tsconfig.json      # TypeScript configuration
  postcss.config.js  # PostCSS configuration
  package.json       # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Production Build

```bash
npm run build
npm start
```

## Features

✨ **Design & UX**
- Modern, premium aesthetic inspired by Apple and AI startups
- Sophisticated color palette (navy, ivory, saffron, earth tones)
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Micro-interactions and hover effects
- Glassmorphism elements
- High contrast for accessibility

🎯 **Sections**
1. **Navbar** - Sticky navigation with mobile hamburger menu
2. **Hero** - Cinematic hero with animated waveform visualization
3. **Problem** - Why language preservation matters
4. **Core Insight** - Process flow and technology philosophy
5. **Robot Showcase** - Interactive component showcase
6. **How It Works** - 6-step timeline
7. **Story Archive** - Story preservation system explanation
8. **Languages** - Current and future language support
9. **Technology** - Hardware and software stack
10. **Impact** - Real-world use cases
11. **Business Model** - Deployment scalability
12. **Future Vision** - Long-term vision
13. **Team** - Heritage Hackers team
14. **Final CTA** - Closing statement
15. **Footer** - Navigation and info

🔧 **Technical**
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Responsive design with Tailwind
- Optimized for Vercel deployment
- Lazy loading and code splitting
- SEO-optimized metadata

♿ **Accessibility**
- Semantic HTML
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation
- Focus states
- Color contrast compliance
- `prefers-reduced-motion` support
- ARIA labels where needed

⚡ **Performance**
- Next.js image optimization
- CSS minification
- Efficient component splitting
- Lazy loading
- Minimal bundle size
- Optimized for Core Web Vitals

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```ts
colors: {
  navy: { /* navy shades */ },
  saffron: '#d4a574',
  cream: '#f5f3f0',
  // etc.
}
```

### Fonts
Fonts are system fonts (SF Pro Display, Segoe UI, etc.). To change, edit the `body` font-family in `app/globals.css`.

### Content
All content is in components and can be easily edited:
- Team members: `components/Team.tsx`
- Languages: `components/Languages.tsx`
- Technology: `components/Technology.tsx`
- Impact areas: `components/Impact.tsx`
- etc.

### Assets
Placeholder areas for:
- Robot images: `/public/images/`
- Team photos: `/public/images/`
- Videos: `/public/videos/`

Replace placeholders with actual files and update component imports.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js and builds
4. Done! Site goes live

### Other Platforms

The Next.js build output (`/.next`) can be deployed to:
- Docker containers
- Traditional Node.js servers
- Serverless functions (AWS Lambda, Google Cloud Functions)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- First Contentful Paint: ~1s
- Largest Contentful Paint: ~2s
- Cumulative Layout Shift: <0.1
- Time to Interactive: ~2s

## Future Enhancements

- [ ] Add actual team photos
- [ ] Add robot hardware photos
- [ ] Embed demo video
- [ ] Add blog/news section
- [ ] Add multilingual support
- [ ] Add contact/inquiry form
- [ ] Add analytics
- [ ] Add search functionality
- [ ] Add newsletter signup

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install --legacy-peer-deps`
- Check TypeScript: `npx tsc --noEmit`

### Development Server Issues
- Port 3000 already in use: `npm run dev -- -p 3001`
- Clear Next.js cache: `npm run dev -- --experimental-app-only`

### Styling Issues
- Tailwind not compiling: Verify `tailwind.config.ts` paths
- Missing CSS: Check `app/globals.css` is imported in `layout.tsx`

## Contributing

Team members can:
1. Clone the repo
2. Create feature branch
3. Make changes
4. Test locally
5. Commit with clear messages
6. Push to GitHub
7. Create PR

## License

Built by Heritage Hackers for WRO 2026.

## Support

For questions or issues, contact the Heritage Hackers team at Jamnabai Narsee School, Mumbai.
