import type { ServiceItem } from '@/lib/site-config'
import { ArrowRight } from 'lucide-react'

type ServiceCardProps = ServiceItem & {
  compact?: boolean
}

export function ServiceCard({
  bullets,
  compact = false,
  description,
  icon: Icon,
  title,
}: ServiceCardProps) {
  return (
    <article className="surface-panel group relative overflow-hidden p-4 sm:p-7">
      <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-60" />
      <div className="flex items-start gap-3 max-[500px]:flex-col max-[500px]:gap-2.5">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-12">
          <Icon className="size-4.5 sm:size-5" />
        </div>
        <h3 className="min-w-0 text-[1.2rem] leading-tight min-[390px]:text-[1.35rem] sm:text-2xl">
          {title}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-7 sm:text-base">{description}</p>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
            <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {!compact ? (
        <div className="mt-6 h-px w-full soft-divider" />
      ) : null}
    </article>
  )
}
