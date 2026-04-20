import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ContactInfo } from '@/components/contact-info'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Button } from '@/components/ui/button'
import { fieldBaseStyles, Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactDetails, serviceCards } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  company: z.string().trim().min(2, 'Ange företagsnamn.'),
  email: z.string().trim().email('Ange en giltig e-postadress.'),
  message: z.string().trim().min(20, 'Beskriv gärna behovet med minst 20 tecken.'),
  name: z.string().trim().min(2, 'Ange ditt namn.'),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || value.length >= 7, 'Ange ett giltigt telefonnummer.'),
  service: z.string().trim().min(1, 'Välj vilken tjänst du är intresserad av.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

type FeedbackState =
  | {
      message: string
      tone: 'error' | 'success'
    }
  | null

const emailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
}

function isEmailJsConfigured() {
  return Boolean(
    emailJsConfig.publicKey &&
      emailJsConfig.serviceId &&
      emailJsConfig.templateId,
  )
}

export function ContactPage() {
  const [feedback, setFeedback] = useState<FeedbackState>(null)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      company: '',
      email: '',
      message: '',
      name: '',
      phone: '',
      service: '',
    },
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null)

    try {
      if (isEmailJsConfigured()) {
        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.templateId!,
          {
            company: values.company,
            from_name: values.name,
            message: values.message,
            phone: values.phone || 'Ej angivet',
            reply_to: values.email,
            service: values.service,
          },
          {
            publicKey: emailJsConfig.publicKey!,
          },
        )
      } else {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 700)
        })
      }

      reset()
      setFeedback({
        tone: 'success',
        message: isEmailJsConfigured()
          ? 'Tack! Din förfrågan är skickad och vi återkommer så snart vi kan.'
          : 'Formuläret är klart för användning. Lägg in EmailJS-nycklar i .env för att skicka på riktigt.',
      })
    } catch (error) {
      setFeedback({
        tone: 'error',
        message:
          error instanceof EmailJSResponseStatus
            ? 'Det gick inte att skicka formuläret just nu. Försök igen om en liten stund.'
            : 'Något gick fel vid formulärhanteringen. Kontrollera inställningarna och försök igen.',
      })
    }
  })

  return (
    <>
      <PageMeta
        title="Kontakt"
        description="Kontakta Webbekonomi & Webbdesign AB via formulär, e-post eller telefon för att diskutera ekonomi, webbutveckling eller design."
      />
      <PageHeader
        eyebrow="Kontakt"
        title="Berätta vad ni vill förbättra, bygga eller få bättre kontroll över."
        description="Kontaktsektionen är uppbyggd för att kännas professionell redan nu och kan enkelt kopplas vidare till riktig formulärleverans via EmailJS eller annan backend senare."
        chips={['Snabb återkoppling', 'Professionell form', 'Klar för vidare integration']}
      />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="surface-panel p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                Kontaktformulär
              </p>
              <h2 className="mt-4 text-3xl leading-tight">Låt oss ta första steget tillsammans.</h2>
              <p className="mt-4 text-base leading-7">
                Fyll i formuläret så återkommer vi med ett tydligt nästa steg,
                oavsett om det gäller ekonomi, webb eller design.
              </p>
            </div>

            <form className="grid gap-5" onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Namn</Label>
                  <Input id="name" placeholder="Ditt namn" {...register('name')} />
                  {errors.name ? (
                    <p className="text-sm text-warning">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">Företag</Label>
                  <Input id="company" placeholder="Företagsnamn" {...register('company')} />
                  {errors.company ? (
                    <p className="text-sm text-warning">{errors.company.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-post</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="namn@foretag.se"
                    {...register('email')}
                  />
                  {errors.email ? (
                    <p className="text-sm text-warning">{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" placeholder="08-123 45 67" {...register('phone')} />
                  {errors.phone ? (
                    <p className="text-sm text-warning">{errors.phone.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="service">Tjänst</Label>
                <select
                  id="service"
                  defaultValue=""
                  className={cn(fieldBaseStyles, 'h-12')}
                  {...register('service')}
                >
                  <option value="" disabled>
                    Välj tjänsteområde
                  </option>
                  {serviceCards.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service ? (
                  <p className="text-sm text-warning">{errors.service.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Meddelande</Label>
                <Textarea
                  id="message"
                  placeholder="Beskriv nuläge, mål eller vad ni behöver hjälp med."
                  {...register('message')}
                />
                {errors.message ? (
                  <p className="text-sm text-warning">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Skickar...' : 'Skicka förfrågan'}
                </Button>
                <p className="max-w-md text-sm leading-6">
                  För riktig formulärleverans kan du sätta
                  {' '}
                  <code className="rounded bg-muted px-2 py-1 text-foreground">
                    VITE_EMAILJS_*
                  </code>
                  {' '}
                  i projektets miljövariabler.
                </p>
              </div>

              {feedback ? (
                <div
                  className={cn(
                    'rounded-[22px] border px-4 py-3 text-sm leading-6',
                    feedback.tone === 'success'
                      ? 'border-success/30 bg-success/10 text-foreground'
                      : 'border-warning/30 bg-warning/10 text-foreground',
                  )}
                >
                  {feedback.message}
                </div>
              ) : null}
            </form>
          </div>

          <div className="grid gap-4">
            {contactDetails.map((detail) => (
              <ContactInfo key={detail.label} {...detail} />
            ))}

            <div className="surface-panel grid-surface overflow-hidden p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                Kartsektion
              </p>
              <h2 className="mt-4 text-3xl leading-tight">
                Plats för karta eller framtida bokningsmodul.
              </h2>
              <p className="mt-4 text-base leading-7">
                Den här panelen fungerar som en tydlig premiumyta redan nu, men är
                enkel att ersätta med exempelvis Google Maps, boka-möte-flöde eller
                mer detaljerad kontaktinformation senare.
              </p>
              <div className="mt-8 grid gap-3">
                <div className="rounded-[22px] border border-border/70 bg-background/70 px-5 py-4 text-sm text-foreground">
                  Stockholm som bas, digital leverans i hela Sverige.
                </div>
                <div className="rounded-[22px] border border-border/70 bg-background/70 px-5 py-4 text-sm text-foreground">
                  Passar både löpande samarbete och avgränsade projektstarter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
