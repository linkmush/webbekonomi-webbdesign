import { motion } from 'framer-motion'
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumnIncreasing,
  Globe2,
  Landmark,
  Layers3,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { LogoLoop, type LogoLoopItem } from '@/components/logo-loop'
import { fadeUp, viewport } from '@/lib/motion'

type ClientLogo = LogoLoopItem & {
  icon?: LucideIcon
}

const clientLogos: ClientLogo[] = [
  { icon: Landmark, title: 'Nordic Ledger' },
  { icon: PanelsTopLeft, title: 'Atlas Studio' },
  { icon: ChartNoAxesColumnIncreasing, title: 'Berg Finans' },
  { icon: Globe2, title: 'Klara Digital' },
  { icon: BriefcaseBusiness, title: 'Svea Projekt' },
  { icon: Layers3, title: 'Forma Retail' },
  { icon: Building2, title: 'Malar Group' },
  { icon: BadgeCheck, title: 'Luma Ventures' },
]

export function TrustedBySection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden" id="trusted-by">
      <motion.div
        className="relative overflow-hidden pt-8 sm:pt-10"
        initial="hidden"
        variants={fadeUp}
        viewport={viewport}
        whileInView="visible"
      >

        <div className="relative">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mx-auto mt-3 max-w-2xl text-[1.45rem] leading-tight min-[390px]:text-[1.62rem] sm:text-[2.25rem]">
                {t('home.trustedBy.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                {t('home.trustedBy.description')}
              </p>
              <div className="mt-5 hidden items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 sm:flex">
                <span>{t('home.trustedBy.tags.finance')}</span>
                <span className="size-1 rounded-full bg-primary/70" />
                <span>{t('home.trustedBy.tags.web')}</span>
                <span className="size-1 rounded-full bg-accent/80" />
                <span>{t('home.trustedBy.tags.design')}</span>
              </div>
            </div>
          </Container>

          <div className="relative mt-7 w-full overflow-hidden sm:mt-8">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--card)_58%,transparent)_18%,color-mix(in_srgb,var(--card)_74%,transparent)_50%,color-mix(in_srgb,var(--card)_58%,transparent)_82%,transparent),radial-gradient(circle_at_12%_20%,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_32%),radial-gradient(circle_at_86%_68%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_34%)] backdrop-blur-[2px]" />
            <div className="soft-divider h-px" />
            <LogoLoop
              ariaLabel={t('home.trustedBy.ariaLabel')}
              className="w-full py-5 sm:py-6"
              duration={42}
              gap="2.25rem"
              logos={clientLogos}
              renderItem={(item) => {
                const Icon = item.icon ?? Building2

                return (
                  <div className="group inline-flex items-center gap-3 whitespace-nowrap text-foreground/68 transition-colors duration-300 hover:text-foreground">
                    {item.src ? (
                      <img
                        alt={item.alt ?? `${item.title} logo`}
                        className="h-8 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-90"
                        draggable={false}
                        src={item.src}
                      />
                    ) : (
                      <>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary/90 shadow-[0_0_24px_-14px_color-mix(in_srgb,var(--primary)_95%,transparent)] transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/15 sm:size-9">
                          <Icon className="size-4 sm:size-4.5" strokeWidth={1.8} />
                        </span>
                        <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.86rem]">
                          {item.title}
                        </span>
                      </>
                    )}
                    <span
                      aria-hidden="true"
                      className="ml-2 h-px w-10 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--border)_92%,transparent),transparent)]"
                    />
                  </div>
                )
              }}
            />
            <div className="soft-divider h-px" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
