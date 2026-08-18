'use client'
import { useEffect, useState } from 'react'

const useScrollEvent = () => {
  const [scrollPassed, setScrollPassed] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          setScrollPassed(((window.scrollY + window.innerHeight) * 100) / document.body.offsetHeight)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setScrollY(window.scrollY)
    setScrollHeight(document.body.offsetHeight)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    scrollPassed,
    scrollY,
    scrollHeight,
  }
}

export default useScrollEvent
