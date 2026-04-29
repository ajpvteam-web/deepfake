'use client'

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/header'
import { ScrollToTopButton } from '@/components/scroll-to-top'
import { AuthProvider } from '@/hooks/use-auth'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <Header />
          {children}
          <ScrollToTopButton />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
