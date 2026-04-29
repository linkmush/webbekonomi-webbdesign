import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type LogoLoopItem = {
  alt?: string
  src?: string
  title: string
}

type LogoLoopProps<TLogo extends LogoLoopItem> = {
  ariaLabel: string
  className?: string
  duration?: number
  gap?: string
  logos: TLogo[]
  renderItem?: (item: TLogo) => ReactNode
}

export function LogoLoop<TLogo extends LogoLoopItem>({
  ariaLabel,
  className,
  duration = 34,
  gap = '1rem',
  logos,
  renderItem,
}: LogoLoopProps<TLogo>) {
  const loopStyle = {
    '--logo-loop-duration': `${duration}s`,
    '--logo-loop-gap': gap,
  } as CSSProperties

  const renderLogo = (item: TLogo) => {
    if (renderItem) {
      return renderItem(item)
    }

    if (item.src) {
      return <img alt={item.alt ?? `${item.title} logo`} draggable={false} src={item.src} />
    }

    return <span>{item.title}</span>
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn('logo-loop', className)}
      role="region"
      style={loopStyle}
    >
      <div className="logo-loop__track">
        {[0, 1].map((copyIndex) => (
          <ul
            aria-hidden={copyIndex > 0}
            className="logo-loop__list"
            key={copyIndex}
            role="list"
          >
            {logos.map((item) => (
              <li className="logo-loop__item" key={`${copyIndex}-${item.title}`} role="listitem">
                {renderLogo(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
