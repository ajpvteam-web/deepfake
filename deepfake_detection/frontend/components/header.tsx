'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Header() {
  const pathname = usePathname()

  // Don't show header on auth page
  if (pathname === '/auth') {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">DS</span>
            </div>
            <span className="text-xl font-bold text-foreground">DeepShield</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className={`text-sm ${pathname === '/features' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition`}
            >
              Features
            </Link>
            <Link
              href="/about"
              className={`text-sm ${pathname === '/about' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition`}
            >
              About
            </Link>
            <Link
              href="/watch-demo"
              className={`text-sm ${pathname === '/watch-demo' ? 'text-foreground font-medium' : 'text-muted-foreground'} hover:text-foreground transition`}
            >
              Demo
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}