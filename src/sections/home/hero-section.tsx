import { motion } from 'framer-motion'
import { ArrowRight, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'
import { heroHighlights } from '@/lib/site-config'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-14 sm:pb-18 sm:pt-18 lg:pb-24 lg:pt-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            viewport={viewport}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              <Compass className="size-4" />
              Ekonomi • Webbutveckling • Webbdesign
            </p>
            <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
              Ekonomi, webb och design som bygger ett starkare företag.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 sm:text-lg">
              Webbekonomi & Webbdesign AB hjälper företag att skapa lugn i
              ekonomin, tydlighet i det digitala kundmötet och en mer genomarbetad
              affärsgrund.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/kontakt">Boka strategimöte</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/tjanster">
                  Se våra tjänster
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            viewport={viewport}
            className="surface-panel grid-surface relative overflow-hidden p-5 sm:p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_42%),radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_28%)]" />
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Affärsstruktur
                </span>
                <span className="rounded-full bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Teknisk kvalitet
                </span>
                <span className="rounded-full bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Premiumkänsla
                </span>
              </div>

              <div className="mt-6 grid gap-4">
                {heroHighlights.map(({ description, icon: Icon, title }) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    className="rounded-[24px] border border-border/70 bg-background/76 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl">{title}</h2>
                        <p className="mt-2 text-sm leading-7">{description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
