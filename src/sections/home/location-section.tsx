import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContactInfo } from '@/components/contact-info'
import { GoogleMapEmbed } from '@/components/google-map-embed'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { getContactDetails } from '@/lib/site-config'

export function LocationSection() {
  const { t } = useTranslation()
  const contactDetails = getContactDetails(t)
  const mapQuery = contactDetails.find((item) => item.id === 'location')?.value ?? 'Stockholm, Sweden'

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
          className="min-w-0 grid gap-4"
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
          className="surface-panel grid-surface relative overflow-hidden p-4 sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_36%),radial-gradient(circle_at_bottom_left,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_26%)]" />
          <div className="relative">
            <h3 className="mt-4 text-[1.7rem] leading-tight min-[390px]:text-[1.9rem] sm:text-4xl">
              {t('home.location.mapTitle')}
            </h3>

            <GoogleMapEmbed
              className="mt-6 aspect-[1.14/1] min-h-64 sm:mt-8 sm:min-h-96"
              query={mapQuery}
              title={t('home.location.mapTitle')}
            />

            <div className="mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/kontakt">{t('home.location.cta')}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
