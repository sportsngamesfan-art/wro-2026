import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BhashaSetu - Before the last voice fades, we listen',
  description: 'Preserving endangered languages, stories, and cultural heritage through innovative technology. By Heritage Hackers from Jamnabai Narsee School.',
  keywords: 'language preservation, cultural heritage, endangered languages, robotics, BhashaSetu, WRO 2026',
  openGraph: {
    title: 'BhashaSetu - Bridge of Languages',
    description: 'Preserving endangered languages and cultural heritage',
    type: 'website',
    locale: 'en_IN',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1a1f30" />
      </head>
      <body>{children}</body>
    </html>
  )
}
