import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { getProcessSteps, getReasonsToChooseUs, getValuePillars } from '@/lib/site-config'

export function AboutPage() {
  const { t } = useTranslation()
  const valuePillars = getValuePillars(t)
  const processSteps = getProcessSteps(t)
  const reasonsToChooseUs = getReasonsToChooseUs(t)
  const directionParagraphs = t('about.direction.paragraphs', {
    returnObjects: true,
  }) as string[]
  const headerChips = t('about.header.chips', { returnObjects: true }) as string[]

  return (
    <>
      <PageMeta title={t('about.meta.title')} description={t('about.meta.description')} />
      <PageHeader
        eyebrow={t('about.header.eyebrow')}
        title={t('about.header.title')}
        description={t('about.header.description')}
        chips={headerChips}
      />

      <Section
        eyebrow={t('about.direction.eyebrow')}
        title={t('about.direction.title')}
        description={t('about.direction.description')}
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="surface-panel p-5 sm:p-8"
          >
            <h3 className="text-[1.9rem] leading-tight sm:text-3xl">
              {t('about.direction.cardTitle')}
            </h3>
            {directionParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-7">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid gap-4"
          >
            {valuePillars.map(({ description, icon: Icon, id, title }) => (
              <motion.div
                key={id}
                variants={fadeUp}
                className="surface-panel flex gap-4 p-5 sm:p-6"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-12">
                  <Icon className="size-4.5 sm:size-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.35rem] leading-tight sm:text-2xl">{title}</h3>
                  <p className="mt-2 text-sm leading-7">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section
        eyebrow={t('about.workflow.eyebrow')}
        title={t('about.workflow.title')}
        description={t('about.workflow.description')}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {processSteps.map(({ description, icon: Icon, id, title }) => (
            <motion.article key={id} variants={fadeUp} className="surface-panel p-5 sm:p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-12">
                <Icon className="size-4.5 sm:size-5" />
              </div>
              <h3 className="mt-5 text-[1.35rem] leading-tight sm:text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section
        eyebrow={t('about.reasons.eyebrow')}
        title={t('about.reasons.title')}
        description={t('about.reasons.description')}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2"
        >
          {reasonsToChooseUs.map(({ description, icon: Icon, id, title }) => (
            <motion.article
              key={id}
              variants={fadeUp}
              className="surface-panel flex gap-4 p-5 sm:p-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-12">
                <Icon className="size-4.5 sm:size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[1.35rem] leading-tight sm:text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-7">{description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>
    </>
  )
}
