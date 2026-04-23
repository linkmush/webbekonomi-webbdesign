import type { ContactItem } from '@/lib/site-config'

export function ContactInfo({ description, href, icon: Icon, label, value }: ContactItem) {
  const content = (
    <div className="flex items-start gap-4 rounded-3xl border border-border/70 bg-background/70 p-3.5 transition-transform duration-300 hover:-translate-y-1 max-[500px]:flex-col max-[500px]:gap-3 sm:p-5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:size-11">
        <Icon className="size-4.5 sm:size-5" />
      </div>
      <div className="min-w-0">
        <p className="break-words text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-xs sm:tracking-[0.28em]">
          {label}
        </p>
        <p className="mt-2 break-all text-base font-semibold text-foreground sm:break-words">{value}</p>
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
