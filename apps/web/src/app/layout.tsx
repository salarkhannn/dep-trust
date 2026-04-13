import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'dep-trust — npm supply chain protection',
  description:
    'Scan your npm dependencies for supply chain attack indicators. Freshness checks, install script detection, and lockfile diffs.',
  metadataBase: new URL('https://dep-trust.dev'),
  openGraph: {
    title: 'dep-trust — npm supply chain protection',
    description:
      'Scan your npm dependencies for supply chain attack indicators. Freshness checks, install script detection, and lockfile diffs.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dep-trust.dev',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
