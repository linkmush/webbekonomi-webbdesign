import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Container } from '@/components/container'
import { getContactDetails, getNavigationLinks, getServiceAreas } from '@/lib/site-config'

export function Footer() {
  const { t } = useTranslation()
  const navigationLinks = getNavigationLinks(t)
  const contactDetails = getContactDetails(t)
  const serviceAreas = getServiceAreas(t)
  const siteName = t('site.name')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 pb-8 pt-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
              {siteName}
            </p>
            <h2 className="mt-4 text-3xl leading-tight">{t('footer.heading')}</h2>
            <p className="mt-4 text-base leading-7">{t('footer.description')}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
              {t('footer.quickLinks')}
            </p>
            <div className="mt-4 grid gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.to}
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
              {t('footer.contactArea')}
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {contactDetails.slice(0, 3).map((item) => (
                <p key={item.id}>{item.value}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area.id}
                  className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-xs font-medium text-foreground/90"
                >
                  {area.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full soft-divider" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.bottom.primary', { siteName, year })}</p>
          <p>{t('footer.bottom.secondary')}</p>
        </div>
      </Container>
    </footer>
  )
}
