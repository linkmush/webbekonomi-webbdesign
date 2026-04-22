import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageMeta title={t('notFound.meta.title')} description={t('notFound.meta.description')} />
      <Section
        eyebrow={t('notFound.section.eyebrow')}
        title={t('notFound.section.title')}
        description={t('notFound.section.description')}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/">{t('notFound.primaryCta')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/kontakt">{t('notFound.secondaryCta')}</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
