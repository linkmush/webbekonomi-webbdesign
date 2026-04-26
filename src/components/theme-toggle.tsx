import { MoonStar, SunMedium } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('ui.theme.switchToLight') : t('ui.theme.switchToDark')}
      className={cn(
        'inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/75 px-3 py-2.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary cursor-pointer',
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-primary">
        {isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
      </span>
      {/* <span className="truncate">{isDark ? t('ui.theme.lightMode') : t('ui.theme.darkMode')}</span> */}
    </button>
  )
}
