'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createAuthStore, type AuthStore, type AuthState } from '@/store/useAuthStore'

export const AuthStoreContext = createContext<AuthStore | null>(null)

export interface AuthStoreProviderProps {
  children: ReactNode
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStore>(null)
  
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthStoreContext = <T,>(selector: (store: AuthState) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)
  
  if (!authStoreContext) {
    throw new Error('useAuthStoreContext must be used within AuthStoreProvider')
  }
  
  return useStore(authStoreContext, selector)
}
