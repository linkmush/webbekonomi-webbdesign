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
    <article className="surface-panel group relative overflow-hidden p-6 sm:p-7">
      <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),transparent)] opacity-60" />
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Icon className="size-5" />
        </div>
        <h3 className="text-2xl">{title}</h3>
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
