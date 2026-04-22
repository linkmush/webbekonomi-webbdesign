import { motion } from 'framer-motion'
import { Container } from '@/components/container'
import { fadeUp, viewport } from '@/lib/motion'

type PageHeaderProps = {
  chips?: string[]
  description: string
  eyebrow: string
  title: string
}

export function PageHeader({
  chips = [],
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-24">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          viewport={viewport}
          className="surface-panel relative overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:px-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_45%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_30%)]" />
          <div className="relative max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-xs sm:tracking-[0.34em]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-[2.35rem] leading-tight sm:mt-5 sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 sm:mt-5 sm:text-lg">{description}</p>
            {chips.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border/80 bg-background/65 px-3.5 py-2 text-sm font-medium text-foreground/90 sm:px-4"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
