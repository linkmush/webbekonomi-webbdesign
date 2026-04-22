import type { ContactItem } from '@/lib/site-config'

export function ContactInfo({ description, href, icon: Icon, label, value }: ContactItem) {
  const content = (
    <div className="flex gap-4 rounded-3xl border border-border/70 bg-background/70 p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-11">
        <Icon className="size-4.5 sm:size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90 sm:text-xs sm:tracking-[0.28em]">
          {label}
        </p>
        <p className="mt-2 break-words text-base font-semibold text-foreground">{value}</p>
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
