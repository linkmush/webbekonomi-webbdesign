import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { ServiceCard } from '@/components/service-card'
import { Button } from '@/components/ui/button'
import { getProcessSteps, getServiceCards } from '@/lib/site-config'

export function ServicesPage() {
  const { t } = useTranslation()
  const serviceCards = getServiceCards(t)
  const processSteps = getProcessSteps(t)
  const headerChips = t('services.header.chips', { returnObjects: true }) as string[]

  return (
    <>
      <PageMeta title={t('services.meta.title')} description={t('services.meta.description')} />
      <PageHeader
        eyebrow={t('services.header.eyebrow')}
        title={t('services.header.title')}
        description={t('services.header.description')}
        chips={headerChips}
      />

      <Section
        eyebrow={t('services.offer.eyebrow')}
        title={t('services.offer.title')}
        description={t('services.offer.description')}
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {serviceCards.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={t('services.delivery.eyebrow')}
        title={t('services.delivery.title')}
        description={t('services.delivery.description')}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ description, icon: Icon, id, title }) => (
            <div key={id} className="surface-panel p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="surface-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                {t('services.cta.eyebrow')}
              </p>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{t('services.cta.title')}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7">{t('services.cta.description')}</p>
            </div>
            <Button asChild size="lg">
              <Link to="/kontakt">{t('services.cta.button')}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
