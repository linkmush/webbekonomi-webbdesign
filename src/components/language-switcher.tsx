import { ChevronDown, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { languageOptions, type AppLanguage } from '@/i18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  align?: 'center' | 'end' | 'start'
  className?: string
}

export function LanguageSwitcher({ align = 'end', className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language) as AppLanguage
  const activeOption =
    languageOptions.find((option) => option.code === currentLanguage) ?? languageOptions[1]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t('nav.language')}: ${t(activeOption.labelKey)}`}
          className={cn(
            'inline-flex h-13 max-w-full min-w-0 items-center justify-between gap-3 rounded-full border border-border/80 bg-card/75 px-3 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/12 data-[state=open]:border-primary/45 data-[state=open]:bg-card data-[state=open]:text-primary sm:min-w-36 cursor-pointer',
            className,
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Languages className="size-4 shrink-0 text-primary" />
            <span className="truncate">{t(activeOption.labelKey)}</span>
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="max-w-[calc(100vw-1rem)] min-w-40 sm:min-w-42">
        <DropdownMenuRadioGroup
          value={activeOption.code}
          onValueChange={(code) => {
            void i18n.changeLanguage(code)
          }}
        >
          {languageOptions.map(({ code, labelKey }) => (
            <DropdownMenuRadioItem key={code} value={code}>
              {t(labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
