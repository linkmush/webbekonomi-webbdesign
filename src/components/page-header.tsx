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
    <section className="relative overflow-hidden pt-10 sm:pt-20 lg:pt-24">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          viewport={viewport}
          className="surface-panel relative overflow-hidden px-3.5 py-6 sm:px-8 sm:py-12 lg:px-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_45%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_30%)]" />
          <div className="relative max-w-3xl">
            <p className="break-words text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.34em]">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-[1.8rem] leading-[1.08] min-[375px]:text-[1.95rem] min-[390px]:text-[2.15rem] sm:mt-5 sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-7 sm:mt-5 sm:text-lg">{description}</p>
            {chips.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="max-w-full break-words rounded-full border border-border/80 bg-background/65 px-3 py-2 text-[0.82rem] leading-5 font-medium text-foreground/90 sm:px-4 sm:text-sm"
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
