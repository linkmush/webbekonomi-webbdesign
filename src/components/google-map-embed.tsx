import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

type GoogleMapEmbedProps = {
  className?: string
  query: string
  title: string
}

const DEFAULT_MAP_QUERY = 'Stockholm, Sweden'

const lightMapFilter = 'saturate(0.98) contrast(1.01) brightness(1.01)'

export function GoogleMapEmbed({ className, query, title }: GoogleMapEmbedProps) {
  useTheme()
  const normalizedQuery = query.trim() || DEFAULT_MAP_QUERY
  const src = `https://www.google.com/maps?q=${encodeURIComponent(normalizedQuery)}&output=embed`

  return (
    <div
      className={cn(
        'relative isolate min-h-80 overflow-hidden rounded-[28px] border border-border/70',
        'bg-background/75',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_44%,transparent),transparent)]" />
      <iframe
        title={title}
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 block size-full border-0"
        style={{
          filter: lightMapFilter,
          transform: 'scale(1.015)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_6%,transparent),transparent_30%,transparent_70%,color-mix(in_srgb,var(--background)_8%,transparent))] opacity-100 transition-opacity duration-300" />
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/8" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_44%,color-mix(in_srgb,var(--background)_10%,transparent)_100%),linear-gradient(0deg,color-mix(in_srgb,var(--background)_42%,transparent),transparent)]" />
    </div>
  )
}
