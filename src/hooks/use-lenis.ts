import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.15,
    })

    let frame = 0

    const onFrame = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(onFrame)
    }

    frame = window.requestAnimationFrame(onFrame)

    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
