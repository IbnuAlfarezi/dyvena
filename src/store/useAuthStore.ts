import { createStore } from 'zustand'
import { authClient } from '@/lib/auth-client'
import { clearPermissionCache } from '@/hooks/usePermission'

export interface AuthState {
  loading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<{ success: boolean }>
  register: (name: string, email: string, password: string, turnstileToken?: string) => Promise<{ success: boolean }>
  logout: () => Promise<void>
}

export type AuthStore = ReturnType<typeof createAuthStore>

export const createAuthStore = () => {
  return createStore<AuthState>()((set) => ({
    loading: false,
    error: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    login: async (email, password) => {
      set({ loading: true, error: null })
      try {
        const res = await authClient.signIn.email({ email, password })
        if (res.error) { 
          set({ error: res.error.message ?? 'Invalid email or password' })
          return { success: false } 
        }
        return { success: true }
      } catch (err: unknown) {
        set({ error: err instanceof Error ? err.message : 'An unexpected error occurred' })
        return { success: false }
      } finally {
        set({ loading: false })
      }
    },

    register: async (name, email, password, turnstileToken) => {
      set({ loading: true, error: null })
      try {
        const res = await authClient.signUp.email({
          name,
          email,
          password,
          fetchOptions: {
            headers: turnstileToken ? { 'x-turnstile-token': turnstileToken } : undefined
          }
        })

        if (res.error) {
          set({ error: res.error.message ?? 'Registration failed' })
          return { success: false }
        }
        return { success: true }
      } catch (err: unknown) {
        set({ error: err instanceof Error ? err.message : 'An unexpected error occurred' })
        return { success: false }
      } finally {
        set({ loading: false })
      }
    },

    logout: async () => {
      await authClient.signOut()
      clearPermissionCache()
      set({ loading: false, error: null })
    }
  }))
}
