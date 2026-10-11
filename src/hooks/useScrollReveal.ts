import { useEffect, useRef, useState } from 'react'

export function useScrollReveal() {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion || !('IntersectionObserver' in window))
  const revealRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = revealRef.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible])

  return { isVisible, revealRef }
}
