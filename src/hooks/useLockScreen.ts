'use client'

import { authClient } from '@/lib/auth-client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useLockScreen = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isLocked, setIsLocked] = useState(false)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const locked = sessionStorage.getItem('isLocked') === 'true'
    setIsLocked(locked)

    // Enforce lock screen redirect if locked, signed in, and not already there
    if (locked && session && !pathname.includes('/auth/card/lock-screen')) {
      router.replace('/auth/card/lock-screen')
    }
  }, [pathname, router, session])

  const lock = () => {
    sessionStorage.setItem('isLocked', 'true')
    setIsLocked(true)
    router.replace('/auth/card/lock-screen')
  }

  const unlock = async (password: string) => {
    if (!session?.user?.email) return { error: 'No active session found.' }

    // Verify password by attempting to sign in again
    const res = await authClient.signIn.email({
      email: session.user.email,
      password,
    })

    if (res.error) {
      return { error: res.error.message ?? 'Invalid password' }
    }

    sessionStorage.removeItem('isLocked')
    setIsLocked(false)
    router.replace('/')
    return { success: true }
  }

  return { isLocked, lock, unlock, user: session?.user }
}
