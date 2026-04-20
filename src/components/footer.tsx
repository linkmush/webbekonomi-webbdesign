import { Link } from 'react-router-dom'
import { Container } from '@/components/container'
import { companyName, contactDetails, navigationLinks, serviceAreas } from '@/lib/site-config'

export function Footer() {
  return (
    <footer className="border-t border-border/70 pb-8 pt-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
              {companyName}
            </p>
            <h2 className="mt-4 text-3xl leading-tight">
              Modern partner för ekonomi, webb och design.
            </h2>
            <p className="mt-4 text-base leading-7">
              En professionell grund för företag som vill kombinera affärsmässig
              kontroll med en tydlig digital närvaro.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
              Snabblänkar
            </p>
            <div className="mt-4 grid gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
              Kontakt & område
            </p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              {contactDetails.slice(0, 3).map((item) => (
                <p key={item.label}>{item.value}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-xs font-medium text-foreground/90"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full soft-divider" />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} {companyName}. Professionell grund för vidare utveckling.</p>
          <p>Byggd med React, TypeScript, Tailwind och fokus på responsiv kvalitet.</p>
        </div>
      </Container>
    </footer>
  )
}
