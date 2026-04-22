import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { BrandMark } from '@/components/brand-mark'
import { Container } from '@/components/container'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { getNavigationLinks } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const navigationLinks = getNavigationLinks(t)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/76 backdrop-blur-2xl">
      <Container className="flex items-center justify-between gap-3 py-3.5 sm:gap-4 sm:py-4">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-3 min-[1080px]:flex-none">
          <BrandMark className="shrink-0" mark={t('site.mark')} />
          <div className="min-w-0">
            <p className="truncate font-display text-base text-foreground sm:text-lg">
              {t('site.name')}
            </p>
            <p className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground min-[420px]:block sm:text-[11px] sm:tracking-[0.34em]">
              {t('nav.tagline')}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-border/80 bg-card/70 px-2 py-2 min-[1080px]:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.id}
              end={link.to === '/'}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary',
                  isActive && 'bg-primary text-primary-foreground shadow-(--shadow-soft)',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 min-[1080px]:flex">
          <LanguageSwitcher className="shrink-0" />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setIsMobileNavOpen((open) => !open)}
          aria-expanded={isMobileNavOpen}
          aria-label={isMobileNavOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-card/75 text-foreground transition hover:text-primary min-[1080px]:hidden"
        >
          {isMobileNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {isMobileNavOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 min-[1080px]:hidden"
          >
            <Container className="space-y-4 py-4">
              <div className="grid gap-2">
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.id}
                    end={link.to === '/'}
                    to={link.to}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-[20px] border border-border/70 bg-card/70 px-4 py-3 text-sm font-semibold text-foreground',
                        isActive && 'border-primary/40 text-primary',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <LanguageSwitcher align="start" className="w-full justify-between sm:w-auto" />
                <ThemeToggle className="w-full justify-between sm:w-auto" />
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/kontakt" onClick={() => setIsMobileNavOpen(false)}>
                    {t('nav.mobileCta')}
                  </Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
