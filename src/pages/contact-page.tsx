import type { TFunction } from 'i18next'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ContactInfo } from '@/components/contact-info'
import { GoogleMapEmbed } from '@/components/google-map-embed'
import { PageHeader } from '@/components/page-header'
import { PageMeta } from '@/components/page-meta'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getContactDetails, getServiceCards } from '@/lib/site-config'
import { cn } from '@/lib/utils'

type ContactFormValues = {
  company: string
  email: string
  message: string
  name: string
  phone: string
  service: string
}

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

function createContactSchema(t: TFunction) {
  return z.object({
    company: z.string().trim().min(2, t('forms.contact.validation.company')),
    email: z.string().trim().email(t('forms.contact.validation.email')),
    message: z.string().trim().min(20, t('forms.contact.validation.message')),
    name: z.string().trim().min(2, t('forms.contact.validation.name')),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || value.length >= 7,
        t('forms.contact.validation.phone'),
      ),
    service: z.string().trim().min(1, t('forms.contact.validation.service')),
  })
}

function isEmailJsConfigured() {
  return Boolean(
    emailJsConfig.publicKey &&
      emailJsConfig.serviceId &&
      emailJsConfig.templateId,
  )
}

export function ContactPage() {
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const contactDetails = getContactDetails(t)
  const serviceCards = getServiceCards(t)
  const mapQuery = contactDetails.find((item) => item.id === 'location')?.value ?? 'Stockholm, Sweden'
  const contactSchema = createContactSchema(t)
  const headerChips = t('contact.header.chips', { returnObjects: true }) as string[]

  const {
    control,
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

    const selectedService = serviceCards.find((service) => service.id === values.service)

    try {
      if (isEmailJsConfigured()) {
        await emailjs.send(
          emailJsConfig.serviceId!,
          emailJsConfig.templateId!,
          {
            company: values.company,
            from_name: values.name,
            message: values.message,
            phone: values.phone || t('forms.contact.notProvided'),
            reply_to: values.email,
            service: selectedService?.title ?? values.service,
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
          ? t('forms.contact.feedback.successConfigured')
          : t('forms.contact.feedback.successDemo'),
      })
    } catch (error) {
      setFeedback({
        tone: 'error',
        message:
          error instanceof EmailJSResponseStatus
            ? t('forms.contact.feedback.errorSend')
            : t('forms.contact.feedback.errorGeneric'),
      })
    }
  })

  return (
    <>
      <PageMeta title={t('contact.meta.title')} description={t('contact.meta.description')} />
      <PageHeader
        eyebrow={t('contact.header.eyebrow')}
        title={t('contact.header.title')}
        description={t('contact.header.description')}
        chips={headerChips}
      />

      <section className="py-12 sm:py-18 lg:py-24">
        <div className="mx-auto grid w-full max-w-295 gap-6 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="surface-panel p-3.5 sm:p-8">
            <div className="mb-8">
              <p className="wrap-break-word text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.34em]">
                {t('contact.form.eyebrow')}
              </p>
              <h2 className="mt-4 text-[1.7rem] leading-tight min-[390px]:text-[1.9rem] sm:text-3xl">
                {t('contact.form.title')}
              </h2>
              <p className="mt-4 text-[0.95rem] leading-7 sm:text-base">
                {t('contact.form.description')}
              </p>
            </div>

            <form className="grid gap-5" onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t('forms.contact.fields.name.label')}</Label>
                  <Input
                    id="name"
                    placeholder={t('forms.contact.fields.name.placeholder')}
                    {...register('name')}
                  />
                  {errors.name ? (
                    <p className="text-sm text-warning">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">{t('forms.contact.fields.company.label')}</Label>
                  <Input
                    id="company"
                    placeholder={t('forms.contact.fields.company.placeholder')}
                    {...register('company')}
                  />
                  {errors.company ? (
                    <p className="text-sm text-warning">{errors.company.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('forms.contact.fields.email.label')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('forms.contact.fields.email.placeholder')}
                    {...register('email')}
                  />
                  {errors.email ? (
                    <p className="text-sm text-warning">{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">{t('forms.contact.fields.phone.label')}</Label>
                  <Input
                    id="phone"
                    placeholder={t('forms.contact.fields.phone.placeholder')}
                    {...register('phone')}
                  />
                  {errors.phone ? (
                    <p className="text-sm text-warning">{errors.phone.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="service">{t('forms.contact.fields.service.label')}</Label>
                <Controller
                  control={control}
                  name="service"
                  render={({ field }) => {
                    const selectedService = serviceCards.find(
                      (service) => service.id === field.value,
                    )
                    const placeholder = t('forms.contact.fields.service.placeholder')

                    return (
                      <DropdownMenu
                        modal={false}
                        onOpenChange={(open) => {
                          if (!open) {
                            field.onBlur()
                          }
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <button
                            id="service"
                            ref={field.ref}
                            type="button"
                            name={field.name}
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errors.service)}
                            data-placeholder={selectedService ? undefined : ''}
                            className={cn(
                              'group relative flex h-12 w-full items-center justify-between gap-3 rounded-[22px] border border-border bg-background/80 pl-4 pr-13 text-left text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition outline-none hover:border-primary/24 hover:bg-card/76 focus-visible:border-primary/55 focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 data-placeholder:text-muted-foreground',
                              errors.service
                                ? 'border-warning/45 focus-visible:border-warning/45 focus-visible:ring-warning/10'
                                : undefined,
                            )}
                          >
                            <span className="truncate">
                              {selectedService?.title ?? placeholder}
                            </span>
                            <ChevronDown className="pointer-events-none absolute right-4 size-4.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="start"
                          className="max-h-88 w-(--radix-dropdown-menu-trigger-width) min-w-48 bg-card/96"
                        >
                          <div className="px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                            {placeholder}
                          </div>
                          <div className="mx-2 my-1 h-px bg-border/70" />
                          <DropdownMenuRadioGroup
                            value={field.value ?? ''}
                            onValueChange={(value) => {
                              field.onChange(value)
                            }}
                          >
                            {serviceCards.map((service) => (
                              <DropdownMenuRadioItem
                                key={service.id}
                                value={service.id}
                                indicatorClassName="left-4"
                                className="py-3 pl-10 pr-10 text-foreground/92"
                              >
                                {service.title}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                  }}
                />
                {errors.service ? (
                  <p className="text-sm text-warning">{errors.service.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">{t('forms.contact.fields.message.label')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('forms.contact.fields.message.placeholder')}
                  {...register('message')}
                />
                {errors.message ? (
                  <p className="text-sm text-warning">{errors.message.message}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto cursor-pointer">
                  {isSubmitting ? t('forms.contact.submitting') : t('forms.contact.submit')}
                </Button>
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
              <ContactInfo key={detail.id} {...detail} />
            ))}

            <div className="surface-panel grid-surface overflow-hidden p-3.5 sm:p-8">
              <p className="wrap-break-word text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.34em]">
                {t('contact.map.eyebrow')}
              </p>
              <GoogleMapEmbed
                className="mt-6 aspect-[1.08/1] min-h-64 sm:mt-8 sm:min-h-96"
                query={mapQuery}
                title={t('contact.map.title')}
              />
              <div className="mt-8 grid gap-3">
                <div className="rounded-[22px] border border-border/70 bg-background/70 px-4 py-4 text-sm text-foreground sm:px-5">
                  {t('contact.map.highlights.remoteDelivery')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
