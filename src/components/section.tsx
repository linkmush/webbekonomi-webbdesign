import type { HTMLAttributes, ReactNode } from 'react'
import { Container } from '@/components/container'
import { cn } from '@/lib/utils'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  description?: string
  eyebrow?: string
  title?: string
}

export function Section({
  children,
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-14 sm:py-18 lg:py-24', className)} {...props}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base leading-7 sm:text-lg">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}
