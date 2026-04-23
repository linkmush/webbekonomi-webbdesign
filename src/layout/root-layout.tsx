import { type PropsWithChildren, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FloatingLines from '@/components/background/FloatingLines.jsx'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { useLenis } from '@/hooks/use-lenis'
import { useTheme } from '@/hooks/use-theme'

const LINES_GRADIENT = ['var(--primary)', 'var(--accent)', 'var(--foreground)']
const ENABLED_WAVES = ['top', 'middle', 'bottom']
const LINE_COUNT = [6, 5, 4]
const LINE_DISTANCE = [16, 12, 10]
const TOP_WAVE_POSITION = { x: 11.0, y: 0.72, rotate: -0.45 }
const MIDDLE_WAVE_POSITION = { x: 5.4, y: 0.04, rotate: 0.18 }
const BOTTOM_WAVE_POSITION = { x: 1.8, y: -0.82, rotate: 0.42 }

function RootLayoutShell({ children }: PropsWithChildren) {
  const { theme } = useTheme()

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      {/*
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-120 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_55%)]" />
      <div className="pointer-events-none fixed -right-32 top-40 z-0 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] blur-3xl" />
      <div className="pointer-events-none fixed -left-32 top-80 z-0 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--primary)_16%,transparent)] blur-3xl" />
      */}
      <div aria-hidden="true" className="floating-lines-viewport pointer-events-none fixed inset-0 z-0">
        <FloatingLines
          animationSpeed={0.7}
          bendRadius={4.5}
          bendStrength={-0.42}
          bottomWavePosition={BOTTOM_WAVE_POSITION}
          enabledWaves={ENABLED_WAVES}
          interactive
          lineCount={LINE_COUNT}
          lineDistance={LINE_DISTANCE}
          lineAlpha={0.92}
          linesGradient={LINES_GRADIENT}
          middleWavePosition={MIDDLE_WAVE_POSITION}
          mixBlendMode="normal"
          mouseDamping={0.065}
          parallax
          parallaxStrength={0.08}
          themeKey={theme}
          topWavePosition={TOP_WAVE_POSITION}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export function RootLayout() {
  const location = useLocation()
  const lenisRef = useLenis()

  useLayoutEffect(() => {
    const lenis = lenisRef.current

    if (lenis) {
      lenis.scrollTo(0, { force: true, immediate: true })
      return
    }

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.key, lenisRef])

  return (
    <RootLayoutShell>
      <Outlet />
    </RootLayoutShell>
  )
}

export function RootLayoutHydrateFallback() {
  return (
    <RootLayoutShell>
      <div aria-busy="true" className="min-h-[40svh]" />
    </RootLayoutShell>
  )
}
