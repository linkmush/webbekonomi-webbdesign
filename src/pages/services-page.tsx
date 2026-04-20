import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { ServiceCard } from '@/components/service-card'
import { Button } from '@/components/ui/button'
import { serviceCards, processSteps } from '@/lib/site-config'

export function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Tjänster"
        description="Utforska Webbekonomi & Webbdesign AB:s tjänster inom ekonomi, webbutveckling, webbdesign och digital rådgivning."
      />
      <PageHeader
        eyebrow="Tjänster"
        title="Fyra fokusområden som stärker både verksamheten och den digitala upplevelsen."
        description="Tjänsterna är upplagda som en stark modern bas. De kan användas var för sig eller kombineras till en tydlig helhetslösning."
        chips={['Ekonomi', 'Webbutveckling', 'Webbdesign', 'Rådgivning']}
      />

      <Section
        eyebrow="Erbjudande"
        title="Professionella leveranser med tydlig struktur."
        description="Varje område är byggt för att vara lätt att förstå, vidareutveckla och anpassa efter företagets nästa steg."
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {serviceCards.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Så levererar vi"
        title="En arbetsmodell som håller fokus på rätt saker."
        description="Vi vill att projekten ska kännas tydliga, hållbara och enkla att följa. Därför bygger vi upp arbetet i klara steg."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map(({ description, icon: Icon, title }) => (
            <div key={title} className="surface-panel p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-7">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="surface-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                Nästa steg
              </p>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                Behöver ni en tydlig väg framåt?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7">
                Vi hjälper gärna till att prioritera rätt första steg och bygga en
                lösning som känns professionell från början.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
