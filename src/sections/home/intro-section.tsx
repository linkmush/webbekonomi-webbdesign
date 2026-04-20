import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { serviceCards, valuePillars } from '@/lib/site-config'

export function IntroSection() {
  return (
    <Section
      id="introduktion"
      eyebrow="Ett tydligare helhetserbjudande"
      title="Vi hjälper företag som vill kombinera ekonomisk trygghet med modern digital närvaro."
      description="För många bolag hänger ekonomi, webb och design ihop mer än man först tror. När de tre områdena utvecklas tillsammans blir helheten både starkare och mer hållbar."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4"
        >
          {valuePillars.map(({ description, icon: Icon, title }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="surface-panel flex gap-4 p-6"
            >
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
            Fokusområden
          </p>
          <div className="mt-5 grid gap-4">
            {serviceCards.slice(0, 3).map((service) => (
              <div
                key={service.title}
                className="rounded-[22px] border border-border/70 bg-background/72 p-5"
              >
                <h3 className="text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-7">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/om-oss">Läs mer om oss</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/tjanster">Utforska hela erbjudandet</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
