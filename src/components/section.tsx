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
    <section className={cn('py-12 sm:py-18 lg:py-24', className)} {...props}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-8 max-w-3xl sm:mb-10">
            {eyebrow ? (
              <p className="break-words text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.34em]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-4 text-[1.6rem] leading-tight min-[375px]:text-[1.75rem] min-[390px]:text-[1.9rem] sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-[0.95rem] leading-7 sm:text-lg">{description}</p>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}
