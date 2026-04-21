import type { ContactItem } from '@/lib/site-config'

export function ContactInfo({ description, href, icon: Icon, label, value }: ContactItem) {
  const content = (
    <div className="flex gap-4 rounded-3xl border border-border/70 bg-background/70 p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/90">
          {label}
        </p>
        <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
        <p className="mt-2 text-sm leading-6">{description}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}
