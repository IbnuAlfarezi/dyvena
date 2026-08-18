'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const useAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: session, isPending } = authClient.useSession()
  const isAuthenticated = !!session

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await authClient.signIn.email({ email, password })

      if (res.error) {
        setError(res.error.message ?? 'Invalid email or password')
        return
      }

      router.replace('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const res = await authClient.signUp.email({ name, email, password })

      if (res.error) {
        setError(res.error.message ?? 'Registration failed')
        return
      }

      router.replace('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await authClient.signOut()
    router.replace('/auth/card/sign-in')
  }

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loading: loading || isPending,
    error,
    session,
  }
}
