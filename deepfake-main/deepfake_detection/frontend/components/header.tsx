'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  // Don't show header on auth page
  if (pathname?.startsWith('/auth')) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 border-b border-border">
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
            {isLoading ? (
              <div className="w-8 h-8 bg-secondary rounded animate-pulse" />
            ) : isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 mr-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground hidden sm:inline">
                    {user.username}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}