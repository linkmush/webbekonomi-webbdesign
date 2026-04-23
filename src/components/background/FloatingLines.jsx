import { useEffect, useRef, useState } from 'react'
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

import './FloatingLines.css'

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;
uniform float lineAlpha;

const vec3 BLACK = vec3(0.0);
const vec3 PINK = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE = vec3(47.0, 75.0, 162.0) / 255.0;
const int MAX_LINES = 24;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;

  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];

    gradientColor = mix(c1, c2, f);
  }

  return gradientColor * 0.6;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float xOffset = offset;
  float xMovement = time * 0.1;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + xOffset + xMovement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) {
    baseUv += parallaxOffset * parallaxStrength;
  }

  vec3 col = vec3(0.0);
  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= bottomLineCount) {
        break;
      }

      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.18;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= middleLineCount) {
        break;
      }

      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.56;
    }
  }

  if (enableTop) {
    for (int i = 0; i < MAX_LINES; ++i) {
      if (i >= topLineCount) {
        break;
      }

      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.12;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);

  float intensity = max(max(color.r, color.g), color.b);
  float alpha = smoothstep(0.015, 0.22, intensity) * lineAlpha;

  gl_FragColor = vec4(color.rgb, alpha);
}
`

const MAX_GRADIENT_STOPS = 8
const OFFSCREEN_POINTER = -1000
const SMALL_SCREEN_MEDIA_QUERY = '(max-width: 767px)'
const COARSE_POINTER_MEDIA_QUERY = '(pointer: coarse)'
const NO_HOVER_MEDIA_QUERY = '(hover: none)'
const DESKTOP_MAX_PIXEL_RATIO = 1.5
const MOBILE_MAX_PIXEL_RATIO = 1
const MOBILE_FRAME_DURATION = 1000 / 30
const SUSPENDED_DAMPING_FACTOR = 0.5
const MIN_SUSPENDED_DAMPING = 0.02
const INTERACTIVE_TARGET_SELECTOR = [
  'a',
  'button',
  'details',
  'input',
  'label',
  'summary',
  'select',
  'textarea',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="combobox"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="textbox"]',
  '[tabindex]:not([tabindex="-1"])',
  '[aria-controls]',
  '[aria-expanded]',
  '[aria-haspopup]',
  '[contenteditable="true"]',
  '[data-interactive]',
  '[data-radix-popper-content-wrapper]',
].join(', ')

function addMediaQueryListener(mediaQuery, listener) {
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }

  mediaQuery.addListener(listener)

  return () => {
    mediaQuery.removeListener(listener)
  }
}

function getIsDecorativeOnlyViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return [
    SMALL_SCREEN_MEDIA_QUERY,
    COARSE_POINTER_MEDIA_QUERY,
    NO_HOVER_MEDIA_QUERY,
  ].some((query) => window.matchMedia(query).matches)
}

function clampColorChannel(value) {
  return Math.min(255, Math.max(0, value))
}

function parseHexColor(value) {
  let hex = value.trim().replace('#', '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (hex.length !== 6) {
    return null
  }

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  }
}

function parseRgbColor(value) {
  const match = value.match(/rgba?\(([^)]+)\)/i)

  if (!match) {
    return null
  }

  const channels = match[1].split(',').slice(0, 3)

  if (channels.length !== 3) {
    return null
  }

  return {
    r: clampColorChannel(Number.parseFloat(channels[0])),
    g: clampColorChannel(Number.parseFloat(channels[1])),
    b: clampColorChannel(Number.parseFloat(channels[2])),
  }
}

function resolveCssColor(value) {
  if (typeof value !== 'string') {
    return '#ffffff'
  }

  const trimmed = value.trim()

  if (!trimmed.startsWith('var(')) {
    return trimmed
  }

  const match = trimmed.match(/var\((--[^),\s]+)/)

  if (!match) {
    return trimmed
  }

  const resolved = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
  return resolved || '#ffffff'
}

function colorToVec3(value) {
  const resolved = resolveCssColor(value)
  const parsed = resolved.startsWith('#') ? parseHexColor(resolved) : parseRgbColor(resolved)
  const color = parsed ?? { r: 255, g: 255, b: 255 }

  return new Vector3(color.r / 255, color.g / 255, color.b / 255)
}

function isInteractiveTarget(target) {
  if (!(target instanceof Element)) {
    return false
  }

  const interactiveElement = target.closest(INTERACTIVE_TARGET_SELECTOR)

  if (interactiveElement) {
    return true
  }

  let current = target

  while (current) {
    if (current instanceof HTMLElement) {
      if (current.dataset.interactive !== undefined) {
        return true
      }

      if (current.tabIndex >= 0 && !current.hasAttribute('disabled')) {
        return true
      }

      if (window.getComputedStyle(current).cursor === 'pointer') {
        return true
      }
    }

    current = current.parentElement
  }

  return false
}

export default function FloatingLines({
  className = '',
  linesGradient = ['var(--primary)', 'var(--accent)', 'var(--foreground)'],
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6, 5, 4],
  lineDistance = [16, 12, 10],
  topWavePosition = { x: 11.0, y: 0.72, rotate: -0.45 },
  middleWavePosition = { x: 5.4, y: 0.04, rotate: 0.18 },
  bottomWavePosition = { x: 1.8, y: -0.82, rotate: 0.42 },
  animationSpeed = 0.7,
  interactive = true,
  bendRadius = 4.5,
  bendStrength = -0.42,
  mouseDamping = 0.065,
  parallax = true,
  parallaxStrength = 0.08,
  lineAlpha = 0.92,
  themeKey = 'light',
  mixBlendMode = 'normal',
}) {
  const [isDecorativeOnly, setIsDecorativeOnly] = useState(getIsDecorativeOnlyViewport)
  const containerRef = useRef(null)
  const targetMouseRef = useRef(new Vector2(OFFSCREEN_POINTER, OFFSCREEN_POINTER))
  const currentMouseRef = useRef(new Vector2(OFFSCREEN_POINTER, OFFSCREEN_POINTER))
  const targetInfluenceRef = useRef(0)
  const currentInfluenceRef = useRef(0)
  const targetParallaxRef = useRef(new Vector2(0, 0))
  const currentParallaxRef = useRef(new Vector2(0, 0))
  const interactionSuspendedRef = useRef(true)

  const getLineCount = (waveType) => {
    if (typeof lineCount === 'number') return lineCount
    if (!enabledWaves.includes(waveType)) return 0
    const index = enabledWaves.indexOf(waveType)
    return lineCount[index] ?? 6
  }

  const getLineDistance = (waveType) => {
    if (typeof lineDistance === 'number') return lineDistance
    if (!enabledWaves.includes(waveType)) return 0.1
    const index = enabledWaves.indexOf(waveType)
    return lineDistance[index] ?? 0.1
  }

  const topLineCount = enabledWaves.includes('top') ? getLineCount('top') : 0
  const middleLineCount = enabledWaves.includes('middle') ? getLineCount('middle') : 0
  const bottomLineCount = enabledWaves.includes('bottom') ? getLineCount('bottom') : 0

  const topLineDistance = enabledWaves.includes('top') ? getLineDistance('top') * 0.01 : 0.01
  const middleLineDistance = enabledWaves.includes('middle') ? getLineDistance('middle') * 0.01 : 0.01
  const bottomLineDistance = enabledWaves.includes('bottom') ? getLineDistance('bottom') * 0.01 : 0.01

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQueries = [
      window.matchMedia(SMALL_SCREEN_MEDIA_QUERY),
      window.matchMedia(COARSE_POINTER_MEDIA_QUERY),
      window.matchMedia(NO_HOVER_MEDIA_QUERY),
    ]

    const updateViewportMode = () => {
      setIsDecorativeOnly(mediaQueries.some((mediaQuery) => mediaQuery.matches))
    }

    updateViewportMode()

    const removeListeners = mediaQueries.map((mediaQuery) =>
      addMediaQueryListener(mediaQuery, updateViewportMode),
    )

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener()
      })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return undefined
    }

    let scene
    let camera
    let renderer
    let geometry
    let material

    try {
      scene = new Scene()
      camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
      camera.position.z = 1

      renderer = new WebGLRenderer({
        alpha: true,
        antialias: !isDecorativeOnly,
        powerPreference: isDecorativeOnly ? 'low-power' : 'high-performance',
        premultipliedAlpha: true,
      })
      renderer.outputColorSpace = SRGBColorSpace
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'block'
      renderer.domElement.style.pointerEvents = 'none'
      renderer.domElement.style.mixBlendMode = mixBlendMode
      renderer.domElement.setAttribute('aria-hidden', 'true')

      container.appendChild(renderer.domElement)

      geometry = new PlaneGeometry(2, 2)
    } catch {
      return undefined
    }

    const reduceMotionQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null

    const prefersReducedMotion = reduceMotionQuery?.matches ?? false
    const interactiveEnabled = interactive && !prefersReducedMotion && !isDecorativeOnly
    const parallaxEnabled = parallax && !prefersReducedMotion && !isDecorativeOnly
    const effectiveAnimationSpeed = prefersReducedMotion
      ? animationSpeed * 0.35
      : isDecorativeOnly
        ? animationSpeed * 0.6
        : animationSpeed

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: effectiveAnimationSpeed },

      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },

      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },

      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },

      topWavePosition: {
        value: new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate),
      },
      middleWavePosition: {
        value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate),
      },
      bottomWavePosition: {
        value: new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate),
      },

      iMouse: { value: new Vector2(OFFSCREEN_POINTER, OFFSCREEN_POINTER) },
      interactive: { value: interactiveEnabled },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },

      parallax: { value: parallaxEnabled },
      parallaxStrength: { value: parallaxEnabled ? parallaxStrength : 0 },
      parallaxOffset: { value: new Vector2(0, 0) },

      lineGradient: {
        value: Array.from({ length: MAX_GRADIENT_STOPS }, () => new Vector3(1, 1, 1)),
      },
      lineGradientCount: { value: 0 },
      lineAlpha: { value: lineAlpha },
    }

    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS)
      uniforms.lineGradientCount.value = stops.length

      stops.forEach((stop, index) => {
        const color = colorToVec3(stop)
        uniforms.lineGradient.value[index].set(color.x, color.y, color.z)
      })
    }

    material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })

    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const timer = new Timer()
    timer.connect(document)

    const setSize = () => {
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      const maxPixelRatio = isDecorativeOnly ? MOBILE_MAX_PIXEL_RATIO : DESKTOP_MAX_PIXEL_RATIO

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio))
      renderer.setSize(width, height, false)
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1)
    }

    const suspendInteraction = () => {
      interactionSuspendedRef.current = true
      targetInfluenceRef.current = 0

      // Freeze the bend origin at the current rendered position so the
      // influence can ease out smoothly instead of snapping back.
      targetMouseRef.current.copy(currentMouseRef.current)
      targetParallaxRef.current.set(0, 0)
    }

    const handlePointerMove = (event) => {
      if (!interactiveEnabled && !parallaxEnabled) {
        return
      }

      if (isInteractiveTarget(event.target)) {
        suspendInteraction()
        return
      }

      const rect = container.getBoundingClientRect()
      const dpr = renderer.getPixelRatio()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        suspendInteraction()
        return
      }

      const nextMouseX = x * dpr
      const nextMouseY = (rect.height - y) * dpr

      if (interactionSuspendedRef.current) {
        currentMouseRef.current.set(nextMouseX, nextMouseY)
        targetMouseRef.current.set(nextMouseX, nextMouseY)
        currentInfluenceRef.current = 0
        uniforms.iMouse.value.set(nextMouseX, nextMouseY)
        uniforms.bendInfluence.value = 0
      } else {
        targetMouseRef.current.set(nextMouseX, nextMouseY)
      }

      interactionSuspendedRef.current = false
      targetInfluenceRef.current = interactiveEnabled ? 1 : 0

      if (parallaxEnabled) {
        const offsetX = (x - rect.width / 2) / rect.width
        const offsetY = -(y - rect.height / 2) / rect.height
        targetParallaxRef.current.set(offsetX, offsetY)
      }
    }

    const handleWindowMouseOut = (event) => {
      if (!event.relatedTarget) {
        suspendInteraction()
      }
    }

    setSize()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            setSize()
          })
        : null

    resizeObserver?.observe(container)
    window.addEventListener('resize', setSize)
    window.addEventListener('blur', suspendInteraction)

    if (interactiveEnabled || parallaxEnabled) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerdown', handlePointerMove, { passive: true })
      window.addEventListener('mouseout', handleWindowMouseOut, { passive: true })
    }

    let raf = 0
    let lastFrameTime = 0

    const renderLoop = (time) => {
      if (isDecorativeOnly && time - lastFrameTime < MOBILE_FRAME_DURATION) {
        raf = window.requestAnimationFrame(renderLoop)
        return
      }

      lastFrameTime = time
      timer.update(time)
      uniforms.iTime.value = timer.getElapsed()

      if (interactiveEnabled) {
        const suspendedDamping = Math.max(
          mouseDamping * SUSPENDED_DAMPING_FACTOR,
          MIN_SUSPENDED_DAMPING,
        )
        const activeDamping = interactionSuspendedRef.current
          ? suspendedDamping
          : mouseDamping

        currentMouseRef.current.lerp(targetMouseRef.current, activeDamping)
        uniforms.iMouse.value.copy(currentMouseRef.current)
        currentInfluenceRef.current +=
          (targetInfluenceRef.current - currentInfluenceRef.current) * activeDamping
        uniforms.bendInfluence.value = currentInfluenceRef.current
      }

      if (parallaxEnabled) {
        const suspendedDamping = Math.max(
          mouseDamping * SUSPENDED_DAMPING_FACTOR,
          MIN_SUSPENDED_DAMPING,
        )
        const activeDamping = interactionSuspendedRef.current
          ? suspendedDamping
          : mouseDamping

        currentParallaxRef.current.lerp(targetParallaxRef.current, activeDamping)
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current)
      }

      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(renderLoop)
    }

    renderLoop()

    return () => {
      window.cancelAnimationFrame(raf)

      resizeObserver?.disconnect()
      window.removeEventListener('resize', setSize)
      window.removeEventListener('blur', suspendInteraction)

      if (interactiveEnabled || parallaxEnabled) {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerdown', handlePointerMove)
        window.removeEventListener('mouseout', handleWindowMouseOut)
      }

      geometry.dispose()
      material.dispose()
      timer.dispose()
      renderer.dispose()
      renderer.forceContextLoss()

      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
      }
    }
  }, [
    animationSpeed,
    bendRadius,
    bendStrength,
    bottomLineCount,
    bottomLineDistance,
    bottomWavePosition.rotate,
    bottomWavePosition.x,
    bottomWavePosition.y,
    enabledWaves,
    interactive,
    isDecorativeOnly,
    lineAlpha,
    linesGradient,
    middleLineCount,
    middleLineDistance,
    middleWavePosition.rotate,
    middleWavePosition.x,
    middleWavePosition.y,
    mixBlendMode,
    mouseDamping,
    parallax,
    parallaxStrength,
    themeKey,
    topLineCount,
    topLineDistance,
    topWavePosition.rotate,
    topWavePosition.x,
    topWavePosition.y,
  ])

  return <div ref={containerRef} className={['floating-lines-container', className].filter(Boolean).join(' ')} />
}
