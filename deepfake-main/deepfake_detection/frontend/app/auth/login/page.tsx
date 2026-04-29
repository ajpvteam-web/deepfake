'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'

export default function LoginPage() {
    const router = useRouter()
    const { login, isAuthenticated } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Redirect if already logged in
    if (isAuthenticated) {
        router.push('/prompt')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Validation
        if (!email || !password) {
            setError('Email and password are required')
            setIsLoading(false)
            return
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email')
            setIsLoading(false)
            return
        }

        try {
            const result = await login(email, password)
            if (result.success) {
                router.push('/prompt')
            } else {
                setError(result.error || 'Login failed')
            }
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>

                    {/* Demo Link */}
                    <div className="mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
                        <p className="mb-2">Demo Credentials:</p>
                        <p>Email: <code className="bg-secondary px-2 py-1 rounded">demo@example.com</code></p>
                        <p>Password: <code className="bg-secondary px-2 py-1 rounded">demo123</code></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
