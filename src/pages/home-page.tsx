import { useTranslation } from 'react-i18next'
import { PageMeta } from '@/components/page-meta'
import { HeroSection } from '@/sections/home/hero-section'
import { IntroSection } from '@/sections/home/intro-section'
import { LocationSection } from '@/sections/home/location-section'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <PageMeta title={t('home.meta.title')} description={t('home.meta.description')} />
      <HeroSection />
      <IntroSection />
      <LocationSection />
    </>
  )
}
