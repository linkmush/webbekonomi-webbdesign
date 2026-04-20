import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  BarChart3,
  Building2,
  Clock3,
  Globe,
  Handshake,
  LayoutGrid,
  Mail,
  MapPinned,
  MessageSquareText,
  MonitorSmartphone,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Waypoints,
} from 'lucide-react'

export const companyName = 'Webbekonomi & Webbdesign AB'

export type NavigationLink = {
  label: string
  to: string
}

export type FeatureItem = {
  description: string
  icon: LucideIcon
  title: string
}

export type ServiceItem = FeatureItem & {
  bullets: string[]
}

export type ContactItem = {
  description: string
  href?: string
  icon: LucideIcon
  label: string
  value: string
}

export const navigationLinks: NavigationLink[] = [
  { label: 'Hem', to: '/' },
  { label: 'Om oss', to: '/om-oss' },
  { label: 'Tjänster', to: '/tjanster' },
  { label: 'Kontakt', to: '/kontakt' },
]

export const heroHighlights: FeatureItem[] = [
  {
    title: 'Ekonomi med affärsnytta',
    description:
      'Vi skapar tydliga ekonomiska flöden, rapportering och struktur som ger bättre beslutsunderlag.',
    icon: BarChart3,
  },
  {
    title: 'Webblösningar som arbetar',
    description:
      'Från landningssidor till skalbara företagswebbar med fokus på tydlighet, fart och konvertering.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Design som bygger förtroende',
    description:
      'Visuell riktning, tonalitet och komponenter som får företaget att kännas genomarbetat och modernt.',
    icon: Palette,
  },
]

export const valuePillars: FeatureItem[] = [
  {
    title: 'Helhet istället för silos',
    description:
      'När ekonomi, teknik och design samverkar blir både besluten tydligare och kundupplevelsen starkare.',
    icon: Waypoints,
  },
  {
    title: 'Trygg leverans',
    description:
      'Vi prioriterar struktur, realistiska vägval och lösningar som fungerar direkt i vardagen.',
    icon: ShieldCheck,
  },
  {
    title: 'Affärsfokus i varje detalj',
    description:
      'Det visuella ska stötta affären, inte stå vid sidan av. Därför börjar vi alltid med målet.',
    icon: Target,
  },
]

export const serviceCards: ServiceItem[] = [
  {
    title: 'Ekonomi & rapportering',
    description:
      'För bolag som vill få bättre kontroll, tydligare underlag och en mer stabil ekonomisk vardag.',
    icon: Building2,
    bullets: [
      'Struktur för löpande ekonomi och uppföljning',
      'Rapporter som förenklar beslut och prioriteringar',
      'Rådgivning som kopplar siffror till affärsmål',
    ],
  },
  {
    title: 'Webbutveckling',
    description:
      'Moderna webbplatser och digitala lösningar som är snabba, responsiva och byggda för att kunna växa.',
    icon: MonitorSmartphone,
    bullets: [
      'Responsiva företagswebbar med tydlig informationsstruktur',
      'Teknisk grund som är lätt att vidareutveckla',
      'Fokus på prestanda, innehåll och användarflöde',
    ],
  },
  {
    title: 'Webbdesign & varumärkesyta',
    description:
      'Designsystem, tonalitet och visuella beslut som lyfter kvaliteten i varje digital kontaktpunkt.',
    icon: LayoutGrid,
    bullets: [
      'Designriktning som passar ett modernt företag',
      'Konsekventa komponenter och visuella principer',
      'Premiumkänsla utan att bli överarbetad',
    ],
  },
  {
    title: 'Digital rådgivning',
    description:
      'Praktiskt stöd för prioriteringar, förbättringar och vägval när företaget ska utvecklas digitalt.',
    icon: MessageSquareText,
    bullets: [
      'Analys av nuläge, målbild och förbättringsmöjligheter',
      'Prioritering av rätt nästa steg',
      'Löpande bollplank för webb, processer och affär',
    ],
  },
]

export const processSteps: FeatureItem[] = [
  {
    title: '1. Nuläge & mål',
    description:
      'Vi kartlägger nuläget, vilka flaskhalsar som finns och vilken nivå som är rätt att sikta på.',
    icon: Sparkles,
  },
  {
    title: '2. Riktning & prioritering',
    description:
      'Tillsammans väljer vi lösningen som ger tydlig effekt nu, men som också håller över tid.',
    icon: Target,
  },
  {
    title: '3. Leverans i tydliga steg',
    description:
      'Arbetet delas upp i begripliga leveranser med professionell struktur och löpande avstämningar.',
    icon: BadgeCheck,
  },
  {
    title: '4. Förädling & stöd',
    description:
      'När grunden är på plats kan vi fortsätta utveckla, förbättra och stötta utifrån nästa behov.',
    icon: Handshake,
  },
]

export const reasonsToChooseUs: FeatureItem[] = [
  {
    title: 'En kontaktväg för flera behov',
    description:
      'Ni slipper samordna ekonomi, teknik och design mellan flera olika parter.',
    icon: Globe,
  },
  {
    title: 'Tydlig kommunikation',
    description:
      'Vi gör komplexa frågor begripliga och håller projekten lätta att följa för både ledning och team.',
    icon: MessageSquareText,
  },
  {
    title: 'Modern men affärsmässig form',
    description:
      'Det visuella ska inge förtroende och samtidigt kännas aktuellt, tekniskt och professionellt.',
    icon: Palette,
  },
  {
    title: 'Praktiska lösningar som håller',
    description:
      'Vi bygger inte för att imponera i en presentation, utan för att arbetet ska fungera i verkligheten.',
    icon: ShieldCheck,
  },
]

export const contactDetails: ContactItem[] = [
  {
    label: 'E-post',
    value: 'kontakt@webbekonomiwebbdesign.se',
    href: 'mailto:kontakt@webbekonomiwebbdesign.se',
    description: 'För offertförfrågningar, uppstart och löpande frågor.',
    icon: Mail,
  },
  {
    label: 'Telefon',
    value: '08-123 45 67',
    href: 'tel:+4681234567',
    description: 'Tillgängligt vardagar för snabb första kontakt.',
    icon: Phone,
  },
  {
    label: 'Plats',
    value: 'Stockholm med arbete i hela Sverige',
    description: 'Möten på plats, digitalt eller i hybridformat.',
    icon: MapPinned,
  },
  {
    label: 'Svarstid',
    value: 'Inom 1 arbetsdag',
    description: 'Snabb återkoppling när ni vill komma vidare.',
    icon: Clock3,
  },
]

export const serviceAreas = [
  'Stockholm',
  'Uppsala',
  'Mälardalen',
  'Digitalt i hela Sverige',
]

export const officeFacts = [
  'Strategimöten digitalt eller på plats',
  'Projektstarter anpassade efter tempo och omfattning',
  'Löpande stöd för både vardagsfrågor och större utvecklingssteg',
]
