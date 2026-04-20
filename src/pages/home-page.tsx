import { PageMeta } from '@/components/page-meta'
import { HeroSection } from '@/sections/home/hero-section'
import { IntroSection } from '@/sections/home/intro-section'
import { LocationSection } from '@/sections/home/location-section'

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Hem"
        description="Modern, responsiv företagswebb för Webbekonomi & Webbdesign AB med fokus på ekonomi, webbutveckling och design."
      />
      <HeroSection />
      <IntroSection />
      <LocationSection />
    </>
  )
}
