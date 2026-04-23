import { cn } from '@/lib/utils'

type BrandMarkProps = {
  className?: string
  mark: string
}

export function BrandMark({ className, mark }: BrandMarkProps) {
  const [firstLetter = '', ...rest] = mark.trim()
  const secondLetter = rest.join('') || firstLetter

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative flex h-10 min-w-12 items-center justify-center overflow-hidden rounded-[18px] border border-primary/22 px-2.5 shadow-(--shadow-soft) sm:h-11 sm:min-w-14 sm:px-3',
        'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_16%,var(--card)),color-mix(in_srgb,var(--background)_92%,var(--card)))]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_38%),linear-gradient(135deg,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_62%)] opacity-90" />
      <div className="absolute inset-px rounded-[17px] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--card)_94%,transparent),color-mix(in_srgb,var(--background)_82%,transparent))]" />
      <div className="absolute inset-x-2 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--accent)_70%,transparent),transparent)] opacity-90" />
      <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--border)_92%,transparent),transparent)] opacity-80" />
      <span className="relative flex items-end">
        <span className="font-display text-[0.96rem] font-semibold leading-none tracking-[0.1em] text-foreground sm:text-[1.02rem] sm:tracking-[0.12em]">
          {firstLetter}
        </span>
        <span className="ml-0.5 font-display text-[0.96rem] font-semibold leading-none tracking-[0.1em] text-primary sm:text-[1.02rem] sm:tracking-[0.12em]">
          {secondLetter}
        </span>
      </span>
    </div>
  )
}
