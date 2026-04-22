import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenisRef.current = null

      return () => {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }

    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      touchMultiplier: 0.8,
    })

    lenisRef.current = lenis

    let frame = 0

    const onFrame = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(onFrame)
    }

    frame = window.requestAnimationFrame(onFrame)

    return () => {
      lenisRef.current = null
      window.history.scrollRestoration = previousScrollRestoration
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
