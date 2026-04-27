import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/header'
import { ScrollToTopButton } from '@/components/scroll-to-top'

export const metadata: Metadata = {
  title: 'DeepShield - Deepfake Image Detector',
  description: 'Advanced AI-powered deepfake detection to protect against misinformation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
          <Header />
          {children}
          <ScrollToTopButton />
          <Analytics />
      </body>
    </html>
  )
}
