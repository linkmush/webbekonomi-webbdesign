import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { BrandMark } from '@/components/brand-mark'
import { Container } from '@/components/container'
import { LanguageSwitcher } from '@/components/language-switcher'
import { StaggeredMenu } from '@/components/staggered-menu/staggered-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { getNavigationLinks } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const navigationLinks = getNavigationLinks(t)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/76 backdrop-blur-2xl">
      <Container className="flex items-center justify-between gap-3 py-3.5 sm:gap-4 sm:py-4">
        <Link to="/" className="relative z-70 flex min-w-0 flex-1 items-center gap-3 min-[1080px]:flex-none">
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
                  isActive && 'bg-primary text-primary-foreground shadow-(--shadow-soft) hover:text-primary-foreground',
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

        <StaggeredMenu
          className="min-[1080px]:hidden"
          closeLabel={t('nav.closeMenu')}
          closeOnClickAway={false}
          displayItemNumbering={false}
          items={navigationLinks.map((link) => ({
            ariaLabel: link.label,
            id: link.id,
            label: link.label,
            to: link.to,
          }))}
          menuLabel={t('nav.openMenu')}
          panelFooter={
            <>
              <div className="flex w-full items-center justify-between gap-3">
                <LanguageSwitcher align="start" />
                <ThemeToggle />
              </div>
              <Button asChild className="w-full">
                <Link to="/kontakt">{t('nav.mobileCta')}</Link>
              </Button>
            </>
          }
        />
      </Container>
    </header>
  )
}
