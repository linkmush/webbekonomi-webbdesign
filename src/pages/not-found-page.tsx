import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/page-meta'
import { Section } from '@/components/section'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Sidan hittades inte"
        description="Den efterfrågade sidan kunde inte hittas."
      />
      <Section
        eyebrow="404"
        title="Den här sidan finns inte."
        description="Länken kan vara gammal eller felaktig. Du kan fortsätta tillbaka till startsidan eller gå direkt till kontakt."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">Till startsidan</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/kontakt">Kontakta oss</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
