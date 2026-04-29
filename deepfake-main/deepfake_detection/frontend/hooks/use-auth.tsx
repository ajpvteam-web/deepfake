import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, login as apiLogin, signup as apiSignup, logout as apiLogout, getCurrentUser } from '@/lib/api'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    signup: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check if user is already logged in on mount
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await getCurrentUser()
                if (response.success && response.user) {
                    setUser(response.user)
                }
            } catch {
                // User not authenticated
            } finally {
                setIsLoading(false)
            }
        }
        checkAuth()
    }, [])

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await apiLogin(email, password)
            if (response.success && response.user) {
                setUser(response.user)
                return { success: true }
            }
            return { success: false, error: response.error }
        } catch (error) {
            return { success: false, error: 'Login failed' }
        }
    }

    const handleSignup = async (email: string, username: string, password: string) => {
        try {
            const response = await apiSignup(email, username, password)
            if (response.success && response.user) {
                setUser(response.user)
                return { success: true }
            }
            return { success: false, error: response.error }
        } catch (error) {
            return { success: false, error: 'Signup failed' }
        }
    }

    const handleLogout = () => {
        apiLogout()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login: handleLogin,
                signup: handleSignup,
                logout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
