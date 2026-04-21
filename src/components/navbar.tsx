import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
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
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-[18px] bg-primary text-sm font-bold tracking-[0.2em] text-primary-foreground shadow-(--shadow-soft)">
            {t('site.mark')}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg text-foreground">{t('site.name')}</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
              {t('nav.tagline')}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-border/80 bg-card/70 px-2 py-2 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher className="shrink-0" />
          <ThemeToggle />
          {/* <Button asChild size="lg">
            <Link to="/kontakt">{t('nav.primaryCta')}</Link>
          </Button> */}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileNavOpen((open) => !open)}
          aria-expanded={isMobileNavOpen}
          aria-label={isMobileNavOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          className="flex size-11 items-center justify-center rounded-full border border-border/80 bg-card/75 text-foreground transition hover:text-primary md:hidden"
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
            className="overflow-hidden border-t border-border/60 md:hidden"
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
                <ThemeToggle />
                <Button asChild>
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
