import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Växla till ljust tema' : 'Växla till mörkt tema'}
      className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/75 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
        {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      </span>
      <span>{isDark ? 'Ljust läge' : 'Mörkt läge'}</span>
    </button>
  )
}
