import type { Metadata } from 'next'
import { Doto, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'

const doto = Doto({
  variable: '--font-doto',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
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
    <html
      lang="en"
      className={`${doto.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}
