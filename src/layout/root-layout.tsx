import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { useLenis } from '@/hooks/use-lenis'

export function RootLayout() {
  const location = useLocation()

  useLenis()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[30rem] bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_55%)]" />
      <div className="pointer-events-none fixed right-[-8rem] top-[10rem] z-0 h-80 w-80 rounded-full bg-[color-mix(in_srgb,var(--accent)_22%,transparent)] blur-3xl" />
      <div className="pointer-events-none fixed left-[-8rem] top-[20rem] z-0 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--primary)_16%,transparent)] blur-3xl" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
