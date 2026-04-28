import { gsap } from 'gsap'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import './staggered-menu.css'

export type StaggeredMenuItem = {
  ariaLabel?: string
  id?: string
  label: string
  to: string
}

export type StaggeredMenuSocialItem = {
  label: string
  link: string
}

type StaggeredMenuProps = {
  accentColor?: string
  changeMenuColorOnOpen?: boolean
  className?: string
  closeLabel?: string
  closeOnClickAway?: boolean
  colors?: string[]
  displayItemNumbering?: boolean
  displaySocials?: boolean
  items?: StaggeredMenuItem[]
  menuButtonColor?: string
  menuLabel?: string
  onMenuClose?: () => void
  onMenuOpen?: () => void
  openMenuButtonColor?: string
  panelFooter?: ReactNode
  position?: 'left' | 'right'
  socialItems?: StaggeredMenuSocialItem[]
  socialsLabel?: string
}

const defaultLayerColors = [
  'color-mix(in srgb, var(--primary) 80%, var(--background))',
  'color-mix(in srgb, var(--accent) 76%, var(--background))',
]

export function StaggeredMenu({
  accentColor = 'var(--primary)',
  changeMenuColorOnOpen = false,
  className,
  closeLabel = 'Close',
  closeOnClickAway = true,
  colors = defaultLayerColors,
  displayItemNumbering = true,
  displaySocials = false,
  items = [],
  menuButtonColor,
  menuLabel = 'Menu',
  onMenuClose,
  onMenuOpen,
  openMenuButtonColor,
  panelFooter,
  position = 'right',
  socialItems = [],
  socialsLabel = 'Socials',
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false)
  const portalRoot = typeof document === 'undefined' ? null : document.body

  const openRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLElement | null>(null)
  const preLayersRef = useRef<HTMLDivElement | null>(null)
  const preLayerElsRef = useRef<HTMLElement[]>([])
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null)
  const overlayToggleBtnRef = useRef<HTMLButtonElement | null>(null)

  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const colorTweenRef = useRef<gsap.core.Tween | null>(null)
  const busyRef = useRef(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current

      if (!panel) return

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer'))
        : []

      preLayerElsRef.current = preLayers

      const offscreen = position === 'left' ? -100 : 100
      gsap.set([panel, ...preLayers], { opacity: 1, xPercent: offscreen })

      if (preContainer) {
        gsap.set(preContainer, { opacity: 1, xPercent: 0 })
      }

      if (menuButtonColor && toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor })
      }
    })

    return () => ctx.revert()
  }, [menuButtonColor, portalRoot, position])

  useEffect(() => {
    return () => {
      openTlRef.current?.kill()
      closeTweenRef.current?.kill()
      colorTweenRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = previousPaddingRight
        ? `calc(${previousPaddingRight} + ${scrollbarWidth}px)`
        : `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [open])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current

    if (!panel) return null

    openTlRef.current?.kill()
    closeTweenRef.current?.kill()
    closeTweenRef.current = null

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'))
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
    )
    const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title')
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'))
    const footerEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-footer > *'))
    const offscreen = position === 'left' ? -100 : 100

    if (itemEls.length) {
      gsap.set(itemEls, { rotate: 10, yPercent: 140 })
    }

    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 })
    }

    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 })
    }

    if (socialLinks.length) {
      gsap.set(socialLinks, { opacity: 0, y: 25 })
    }

    if (footerEls.length) {
      gsap.set(footerEls, { opacity: 0, y: 18 })
    }

    const tl = gsap.timeline({ paused: true })

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { duration: 0.5, ease: 'power4.out', xPercent: 0 },
        index * 0.07,
      )
    })

    const lastLayerTime = layers.length ? (layers.length - 1) * 0.07 : 0
    const panelInsertTime = lastLayerTime + (layers.length ? 0.08 : 0)
    const panelDuration = 0.65

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { duration: panelDuration, ease: 'power4.out', xPercent: 0 },
      panelInsertTime,
    )

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15

      tl.to(
        itemEls,
        {
          duration: 1,
          ease: 'power4.out',
          rotate: 0,
          stagger: { each: 0.1, from: 'start' },
          yPercent: 0,
        },
        itemsStart,
      )

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            '--sm-num-opacity': 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1,
        )
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4

      if (socialTitle) {
        tl.to(socialTitle, { duration: 0.5, ease: 'power2.out', opacity: 1 }, socialsStart)
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            duration: 0.55,
            ease: 'power3.out',
            opacity: 1,
            stagger: { each: 0.08, from: 'start' },
            y: 0,
          },
          socialsStart + 0.04,
        )
      }
    }

    if (footerEls.length) {
      tl.to(
        footerEls,
        {
          duration: 0.5,
          ease: 'power3.out',
          opacity: 1,
          stagger: { each: 0.07, from: 'start' },
          y: 0,
        },
        panelInsertTime + panelDuration * 0.5,
      )
    }

    openTlRef.current = tl
    return tl
  }, [position])

  const playOpen = useCallback(() => {
    if (busyRef.current) return

    busyRef.current = true
    const tl = buildOpenTimeline()

    if (!tl) {
      busyRef.current = false
      return
    }

    tl.eventCallback('onComplete', () => {
      busyRef.current = false
    })
    tl.play(0)
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null
    busyRef.current = true

    const panel = panelRef.current
    const layers = preLayerElsRef.current

    if (!panel) {
      busyRef.current = false
      return
    }

    closeTweenRef.current?.kill()

    const offscreen = position === 'left' ? -100 : 100
    closeTweenRef.current = gsap.to([...layers, panel], {
      duration: 0.32,
      ease: 'power3.in',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'))
        const numberEls = Array.from(
          panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
        )
        const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title')
        const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'))
        const footerEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-footer > *'))

        if (itemEls.length) {
          gsap.set(itemEls, { rotate: 10, yPercent: 140 })
        }

        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 })
        }

        if (socialTitle) {
          gsap.set(socialTitle, { opacity: 0 })
        }

        if (socialLinks.length) {
          gsap.set(socialLinks, { opacity: 0, y: 25 })
        }

        if (footerEls.length) {
          gsap.set(footerEls, { opacity: 0, y: 18 })
        }

        busyRef.current = false
      },
      overwrite: 'auto',
      xPercent: offscreen,
    })
  }, [position])

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current

      if (!btn || !menuButtonColor) return

      colorTweenRef.current?.kill()

      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(btn, {
          color: opening ? openMenuButtonColor ?? menuButtonColor : menuButtonColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        })
        return
      }

      gsap.set(btn, { color: menuButtonColor })
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  )

  useEffect(() => {
    const btn = toggleBtnRef.current

    if (!btn || !menuButtonColor) return

    if (changeMenuColorOnOpen) {
      gsap.set(btn, { color: openRef.current ? openMenuButtonColor ?? menuButtonColor : menuButtonColor })
      return
    }

    gsap.set(btn, { color: menuButtonColor })
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor])

  const releaseOverlayFocus = useCallback(() => {
    const activeElement = document.activeElement

    if (activeElement instanceof HTMLElement && overlayRef.current?.contains(activeElement)) {
      activeElement.blur()
    }
  }, [])

  const focusInlineToggle = useCallback(() => {
    window.requestAnimationFrame(() => {
      toggleBtnRef.current?.focus({ preventScroll: true })
    })
  }, [])

  const focusOverlayToggle = useCallback(() => {
    window.requestAnimationFrame(() => {
      overlayToggleBtnRef.current?.focus({ preventScroll: true })
    })
  }, [])

  const closeMenu = useCallback((restoreFocus = false) => {
    if (!openRef.current) return

    releaseOverlayFocus()
    openRef.current = false
    setOpen(false)
    onMenuClose?.()
    playClose()
    animateColor(false)

    if (restoreFocus) {
      focusInlineToggle()
    }
  }, [animateColor, focusInlineToggle, onMenuClose, playClose, releaseOverlayFocus])

  const toggleMenu = useCallback(() => {
    const target = !openRef.current

    if (busyRef.current && target) return

    if (!target) {
      releaseOverlayFocus()
    }

    openRef.current = target
    setOpen(target)

    if (target) {
      onMenuOpen?.()
      playOpen()
    } else {
      onMenuClose?.()
      playClose()
    }

    animateColor(target)

    if (target) {
      focusOverlayToggle()
    } else {
      focusInlineToggle()
    }
  }, [
    animateColor,
    focusInlineToggle,
    focusOverlayToggle,
    onMenuClose,
    onMenuOpen,
    playClose,
    playOpen,
    releaseOverlayFocus,
  ])

  const handlePanelClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      const target = event.target

      if (!(target instanceof Element)) return

      const clickedLink = target.closest('a')

      if (clickedLink && panelRef.current?.contains(clickedLink)) {
        closeMenu(false)
      }
    },
    [closeMenu],
  )

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMenu, open])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1080px)')
    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu(false)
      }
    }

    desktopQuery.addEventListener('change', handleBreakpointChange)

    return () => {
      desktopQuery.removeEventListener('change', handleBreakpointChange)
    }
  }, [closeMenu])

  useEffect(() => {
    if (!closeOnClickAway || !open) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target

      if (!(target instanceof Node)) return

      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeMenu, closeOnClickAway, open])

  const rawLayerColors = colors.length ? colors.slice(0, 4) : defaultLayerColors
  const layerColors = [...rawLayerColors]

  if (layerColors.length >= 3) {
    layerColors.splice(Math.floor(layerColors.length / 2), 1)
  }

  const wrapperStyle = {
    '--sm-accent': accentColor,
  } as CSSProperties

  const hiddenPanelProps = open ? {} : { inert: '' }
  const renderToggleIcon = () => (
    <span className="sm-icon" aria-hidden="true">
      <span className="sm-icon-line sm-icon-line-top" />
      <span className="sm-icon-line sm-icon-line-middle" />
      <span className="sm-icon-line sm-icon-line-bottom" />
    </span>
  )

  const overlay = (
    <div
      ref={overlayRef}
      className="sm-overlay"
      data-open={open || undefined}
      data-position={position}
      style={wrapperStyle}
    >
      <div ref={preLayersRef} aria-hidden="true" className="sm-prelayers">
        {layerColors.map((color, index) => (
          <div key={`${color}-${index}`} className="sm-prelayer" style={{ background: color }} />
        ))}
      </div>

      {open ? (
        <button
          ref={overlayToggleBtnRef}
          aria-controls="staggered-menu-panel"
          aria-expanded={open}
          aria-label={closeLabel}
          className="sm-toggle sm-toggle-overlay"
          onClick={toggleMenu}
          type="button"
        >
          {renderToggleIcon()}
        </button>
      ) : null}

      <aside
        ref={panelRef}
        aria-label={menuLabel}
        aria-modal={open || undefined}
        className="staggered-menu-panel"
        id="staggered-menu-panel"
        onClickCapture={handlePanelClickCapture}
        role="dialog"
        {...hiddenPanelProps}
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" data-numbering={displayItemNumbering || undefined} role="list">
            {items.length ? (
              items.map((item, index) => (
                <li className="sm-panel-itemWrap" key={item.id ?? `${item.label}-${index}`}>
                  <NavLink
                    aria-label={item.ariaLabel ?? item.label}
                    className={({ isActive }) => cn('sm-panel-item', isActive && 'is-active')}
                    data-index={index + 1}
                    end={item.to === '/'}
                    onClick={() => closeMenu(false)}
                    to={item.to}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </NavLink>
                </li>
              ))
            ) : (
              <li aria-hidden="true" className="sm-panel-itemWrap">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 ? (
            <div aria-label={socialsLabel} className="sm-socials">
              <h3 className="sm-socials-title">{socialsLabel}</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((item, index) => (
                  <li className="sm-socials-item" key={`${item.label}-${index}`}>
                    <a className="sm-socials-link" href={item.link} rel="noopener noreferrer" target="_blank">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {panelFooter ? <div className="sm-panel-footer">{panelFooter}</div> : null}
        </div>
      </aside>
    </div>
  )

  return (
    <div
      className={cn('staggered-menu-wrapper', className)}
      data-open={open || undefined}
      data-position={position}
      style={wrapperStyle}
    >
      <button
        ref={toggleBtnRef}
        aria-controls="staggered-menu-panel"
        aria-expanded={open}
        aria-label={open ? closeLabel : menuLabel}
        className="sm-toggle sm-toggle-inline"
        onClick={toggleMenu}
        tabIndex={open ? -1 : undefined}
        type="button"
      >
        {renderToggleIcon()}
      </button>

      {portalRoot ? createPortal(overlay, portalRoot) : null}
    </div>
  )
}

export default StaggeredMenu
