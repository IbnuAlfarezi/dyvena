'use client'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useAuthStoreContext } from '@/providers/AuthProvider'

export const useAuth = () => {
  const router = useRouter()

  // Zustand State
  const loading = useAuthStoreContext((s) => s.loading)
  const error = useAuthStoreContext((s) => s.error)
  const storeLogin = useAuthStoreContext((s) => s.login)
  const storeRegister = useAuthStoreContext((s) => s.register)
  const storeLogout = useAuthStoreContext((s) => s.logout)

  // Better Auth State
  const { data: session, isPending, error: sessionError } = authClient.useSession()
  const isAuthenticated = !!session

  // Bridge functions
  const login = async (email: string, password: string) => {
    const res = await storeLogin(email, password)
    if (res.success) router.replace('/')
  }
  const register = async (name: string, email: string, password: string, turnstileToken?: string) => {
    const res = await storeRegister(name, email, password, turnstileToken)
    if (res.success) router.replace(`/auth/card/verify-email?email=${encodeURIComponent(email)}`)
  }
  const logout = async () => {
    await storeLogout()
    router.replace('/auth/card/sign-in')
  }

  return {
    login,
    register,
    logout,
    isAuthenticated,
    loading: loading || isPending,
    error: error || (sessionError as Error)?.message || null,
    session,
  }
}
