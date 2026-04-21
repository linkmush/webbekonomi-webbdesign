import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { getServiceCards, getValuePillars } from '@/lib/site-config'

export function IntroSection() {
  const { t } = useTranslation()
  const valuePillars = getValuePillars(t)
  const serviceCards = getServiceCards(t)

  return (
    <Section
      id="introduktion"
      eyebrow={t('home.intro.eyebrow')}
      title={t('home.intro.title')}
      description={t('home.intro.description')}
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4"
        >
          {valuePillars.map(({ description, icon: Icon, id, title }) => (
            <motion.div key={id} variants={fadeUp} className="surface-panel flex gap-4 p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-7">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="surface-panel overflow-hidden p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
            {t('home.intro.focusEyebrow')}
          </p>
          <div className="mt-5 grid gap-4">
            {serviceCards.slice(0, 3).map((service) => (
              <div
                key={service.id}
                className="rounded-[22px] border border-border/70 bg-background/72 p-5"
              >
                <h3 className="text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-7">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/om-oss">{t('home.intro.primaryCta')}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/tjanster">{t('home.intro.secondaryCta')}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
