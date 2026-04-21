import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContactInfo } from '@/components/contact-info'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { getContactDetails, getOfficeFacts, getServiceAreas } from '@/lib/site-config'

export function LocationSection() {
  const { t } = useTranslation()
  const contactDetails = getContactDetails(t)
  const officeFacts = getOfficeFacts(t)
  const serviceAreas = getServiceAreas(t)

  return (
    <Section
      id="kontakt"
      eyebrow={t('home.location.eyebrow')}
      title={t('home.location.title')}
      description={t('home.location.description')}
    >
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4"
        >
          {contactDetails.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <ContactInfo {...item} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="surface-panel grid-surface relative overflow-hidden p-6 sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_36%),radial-gradient(circle_at_bottom_left,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_26%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
              {t('home.location.mapEyebrow')}
            </p>
            <h3 className="mt-4 text-3xl leading-tight sm:text-4xl">
              {t('home.location.mapTitle')}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7">
              {t('home.location.mapDescription')}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((area) => (
                <div
                  key={area.id}
                  className="rounded-[22px] border border-border/70 bg-background/72 px-5 py-4 text-sm font-semibold text-foreground"
                >
                  {area.label}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              {officeFacts.map((fact) => (
                <div
                  key={fact.id}
                  className="rounded-[20px] border border-border/70 bg-background/60 px-5 py-4 text-sm leading-6 text-foreground/90"
                >
                  {fact.label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/kontakt">{t('home.location.cta')}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
