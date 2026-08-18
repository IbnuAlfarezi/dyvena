'use client'
import { LayoutProvider } from '@/context/useLayoutContext'
import { NotificationProvider } from '@/context/useNotificationContext'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { AuthStoreProvider } from '@/providers/AuthProvider'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    // Client-side authentication redirects should NOT happen globally.
    // The Edge Middleware (src/proxy.ts) already protects the /dashboard routes.
    // Aggressive global redirects here block public routes like /sign-up and /forget-password.
  }, [isAuthenticated, loading])

  return (
    <AuthStoreProvider>
      <LayoutProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </LayoutProvider>
    </AuthStoreProvider>
  )
}

export default AppProvidersWrapper
