'use client'

import { authClient } from '@/lib/auth-client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const getIsLocked = () => {
  try {
    return sessionStorage.getItem('isLocked') === 'true'
  } catch {
    return false
  }
}

const setIsLockedStorage = (locked: boolean) => {
  try {
    if (locked) {
      sessionStorage.setItem('isLocked', 'true')
      localStorage.setItem('lockSync', Date.now().toString())
    } else {
      sessionStorage.removeItem('isLocked')
      localStorage.setItem('unlockSync', Date.now().toString())
    }
  } catch {}
}

export const useLockScreen = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isLocked, setIsLockedState] = useState(false)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkLockStatus = () => {
      const locked = getIsLocked()
      setIsLockedState(locked)

      if (locked && session && !pathname.includes('/auth/card/lock-screen')) {
        router.replace('/auth/card/lock-screen')
      }
    }

    checkLockStatus()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lockSync' && e.newValue) {
        try { sessionStorage.setItem('isLocked', 'true') } catch {}
        checkLockStatus()
      }
      if (e.key === 'unlockSync' && e.newValue) {
        try { sessionStorage.removeItem('isLocked') } catch {}
        setIsLockedState(false)
        if (pathname.includes('/auth/card/lock-screen')) {
          router.replace('/')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [pathname, router, session])

  const lock = () => {
    setIsLockedStorage(true)
    setIsLockedState(true)
    router.replace('/auth/card/lock-screen')
  }

  const unlock = async (password: string) => {
    if (!session?.user?.email) return { error: 'No active session found.' }

    const res = await authClient.signIn.email({
      email: session.user.email,
      password,
    })

    if (res.error) {
      return { error: res.error.message ?? 'Invalid password' }
    }

    setIsLockedStorage(false)
    setIsLockedState(false)
    router.replace('/')
    return { success: true }
  }

  return { isLocked, lock, unlock, user: session?.user }
}

