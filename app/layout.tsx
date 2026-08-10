import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BhashaSetu - A Bridge of Languages',
  description: 'Before the last voice fades, we listen. BhashaSetu preserves endangered languages, stories, and cultural heritage through technology.',
  keywords: ['languages', 'preservation', 'AI', 'robotics', 'cultural heritage', 'WRO'],
  authors: [{ name: 'Heritage Hackers' }],
  openGraph: {
    title: 'BhashaSetu - A Bridge of Languages',
    description: 'Before the last voice fades, we listen.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a1428" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
