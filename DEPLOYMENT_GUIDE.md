# BhashaSetu Website Deployment Guide

## Quick Start

The BhashaSetu website is fully built and ready for deployment to Vercel.

### Prerequisites
- GitHub repository access
- Vercel account (free tier is sufficient)
- Node.js 18+ (for local development)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Visit http://localhost:3000
```

## Deploy to Vercel

### Option 1: Automatic via GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import the GitHub repository
4. Select branch: `claude/bhashasetu-website-build-6izv0v`
5. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"

Vercel will automatically deploy whenever you push to this branch.

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow prompts to deploy
```

### Option 3: CLI with Environment

```bash
vercel --prod
```

## Environment Variables

The current build doesn't require environment variables. If you add features that do (e.g., email, analytics), add them:

1. On Vercel dashboard: Settings → Environment Variables
2. Add variables and redeploy
3. Or in `.env.local` for local development

## Domain Setup

1. On Vercel dashboard: Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. DNS propagation takes 24-48 hours

### Example Domains
- `bhashasetu.vercel.app` (automatic Vercel subdomain)
- `bhashasetu.com` (custom domain)
- `www.bhashasetu.com` (with www)

## Performance Optimization

Current optimizations:
- ✅ CSS minification via Tailwind
- ✅ JavaScript code splitting
- ✅ Image optimization ready
- ✅ Static page generation
- ✅ Lazy loading for animations

### Further Optimizations (Optional)

1. **Images**: Implement `next/image` for any images added
2. **Analytics**: Add Vercel Analytics dashboard
3. **Monitoring**: Enable Vercel Speed Insights
4. **Caching**: Configure cache headers in `next.config.js`

## Monitoring

### Vercel Dashboard
- Real-time deployment logs
- Build times and errors
- Performance metrics
- Traffic analytics

### Speed Testing
- [PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [Lighthouse](https://web.dev/measure/)

## Post-Deployment Checklist

- [ ] Website loads on all devices (mobile, tablet, desktop)
- [ ] Navigation links work correctly
- [ ] Animations are smooth
- [ ] Images load properly
- [ ] Font rendering is clean
- [ ] Scrolling is smooth
- [ ] Mobile menu opens/closes
- [ ] Touch interactions work on mobile
- [ ] Page title shows in browser tab
- [ ] Meta description appears in search results

## Troubleshooting

### Build Fails
```bash
# Clear build cache and rebuild
rm -rf .next
npm run build
```

### Memory Issues During Build
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Slow Performance
1. Check Vercel Analytics dashboard
2. Run PageSpeed Insights
3. Check for large bundled dependencies
4. Consider adding images compression

### Styling Issues
```bash
# Clear all caches
rm -rf .next node_modules
npm install
npm run build
```

## Updates and Maintenance

### Keeping Dependencies Current

```bash
# Check for updates
npm outdated

# Update dependencies safely
npm update

# Rebuild and test
npm run build
npm start
```

### Pushing Updates

```bash
# Make changes
git add .
git commit -m "Update description"

# Push to branch
git push origin claude/bhashasetu-website-build-6izv0v

# Vercel automatically redeploys
```

## Backup and Version Control

- All code is version controlled on GitHub
- Vercel keeps deployment history (100+ versions free)
- To rollback: Vercel Dashboard → Deployments → Select version → Redeploy

## Analytics Setup (Optional)

### Vercel Web Analytics
```bash
# Enable in Vercel dashboard
# No code changes needed
# Tracks real user metrics
```

### Custom Analytics (e.g., Google Analytics)
Add to `app/layout.tsx`:
```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Security

- ✅ HTTPS automatically enabled
- ✅ DDoS protection via Vercel
- ✅ No sensitive data in code
- ✅ Dependencies regularly updated
- ✅ Security headers configured

### Additional Security (Optional)
1. Enable Vercel Protected Deployments (pro feature)
2. Add Content Security Policy headers
3. Set up branch protection on GitHub

## Scaling

Current setup handles:
- High traffic (Vercel auto-scales)
- Global CDN distribution
- Fast static page serving

For future enhancement:
- Add database (if user accounts needed)
- API routes (if backend needed)
- Serverless functions

## Support and Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)

## Emergency Contacts

For urgent website issues:
1. Check Vercel status page
2. Review recent git commits
3. Rebuild with `npm run build`
4. Check browser console for errors (F12)

---

**Website Version**: 1.0.0
**Last Updated**: August 2026
**Maintained by**: Heritage Hackers
