import type { TFunction } from 'i18next'
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

export type NavigationLink = {
  id: string
  label: string
  to: string
}

export type FeatureItem = {
  description: string
  icon: LucideIcon
  id: string
  title: string
}

export type ServiceItem = FeatureItem & {
  bullets: string[]
}

export type ContactItem = {
  description: string
  href?: string
  icon: LucideIcon
  id: string
  label: string
  value: string
}

export type TextListItem = {
  id: string
  label: string
}

type FeatureContent = Pick<FeatureItem, 'description' | 'title'>
type ServiceContent = FeatureContent & Pick<ServiceItem, 'bullets'>
type ContactContent = Pick<ContactItem, 'description' | 'label' | 'value'>

const navigationDefinitions = [
  { id: 'home', key: 'nav.home', to: '/' },
  { id: 'about', key: 'nav.about', to: '/om-oss' },
  { id: 'services', key: 'nav.services', to: '/tjanster' },
  { id: 'contact', key: 'nav.contact', to: '/kontakt' },
] as const

const heroHighlightDefinitions = [
  { icon: BarChart3, id: 'businessValue', key: 'content.heroHighlights.businessValue' },
  { icon: MonitorSmartphone, id: 'webSolutions', key: 'content.heroHighlights.webSolutions' },
  { icon: Palette, id: 'designTrust', key: 'content.heroHighlights.designTrust' },
] as const

const valuePillarDefinitions = [
  { icon: Waypoints, id: 'holistic', key: 'content.valuePillars.holistic' },
  { icon: ShieldCheck, id: 'reliableDelivery', key: 'content.valuePillars.reliableDelivery' },
  { icon: Target, id: 'businessFocus', key: 'content.valuePillars.businessFocus' },
] as const

const serviceCardDefinitions = [
  { icon: Building2, id: 'financeReporting', key: 'content.serviceCards.financeReporting' },
  { icon: MonitorSmartphone, id: 'webDevelopment', key: 'content.serviceCards.webDevelopment' },
  { icon: LayoutGrid, id: 'brandExperience', key: 'content.serviceCards.brandExperience' },
  { icon: MessageSquareText, id: 'digitalAdvisory', key: 'content.serviceCards.digitalAdvisory' },
] as const

const processStepDefinitions = [
  { icon: Sparkles, id: 'currentState', key: 'content.processSteps.currentState' },
  { icon: Target, id: 'direction', key: 'content.processSteps.direction' },
  { icon: BadgeCheck, id: 'delivery', key: 'content.processSteps.delivery' },
  { icon: Handshake, id: 'refinement', key: 'content.processSteps.refinement' },
] as const

const reasonDefinitions = [
  { icon: Globe, id: 'onePartner', key: 'content.reasons.onePartner' },
  { icon: MessageSquareText, id: 'communication', key: 'content.reasons.communication' },
  { icon: Palette, id: 'modernForm', key: 'content.reasons.modernForm' },
  { icon: ShieldCheck, id: 'practical', key: 'content.reasons.practical' },
] as const

const contactDetailDefinitions = [
  {
    href: 'mailto:kontakt@webbekonomiwebbdesign.se',
    icon: Mail,
    id: 'email',
    key: 'content.contactDetails.email',
  },
  {
    href: 'tel:+4681234567',
    icon: Phone,
    id: 'phone',
    key: 'content.contactDetails.phone',
  },
  {
    href: undefined,
    icon: MapPinned,
    id: 'location',
    key: 'content.contactDetails.location',
  },
  {
    href: undefined,
    icon: Clock3,
    id: 'responseTime',
    key: 'content.contactDetails.responseTime',
  },
] as const

const serviceAreaDefinitions = [
  { id: 'stockholm', key: 'content.serviceAreas.stockholm' },
  { id: 'uppsala', key: 'content.serviceAreas.uppsala' },
  { id: 'malardalen', key: 'content.serviceAreas.malardalen' },
  { id: 'swedenRemote', key: 'content.serviceAreas.swedenRemote' },
] as const

const officeFactDefinitions = [
  { id: 'meetings', key: 'content.officeFacts.meetings' },
  { id: 'projectStarts', key: 'content.officeFacts.projectStarts' },
  { id: 'ongoingSupport', key: 'content.officeFacts.ongoingSupport' },
] as const

function getFeatureContent(t: TFunction, key: string): FeatureContent {
  return t(key, { returnObjects: true }) as FeatureContent
}

function getServiceContent(t: TFunction, key: string): ServiceContent {
  return t(key, { returnObjects: true }) as ServiceContent
}

function getContactContent(t: TFunction, key: string): ContactContent {
  return t(key, { returnObjects: true }) as ContactContent
}

export function getNavigationLinks(t: TFunction): NavigationLink[] {
  return navigationDefinitions.map(({ id, key, to }) => ({
    id,
    label: t(key),
    to,
  }))
}

export function getHeroHighlights(t: TFunction): FeatureItem[] {
  return heroHighlightDefinitions.map(({ icon, id, key }) => ({
    id,
    icon,
    ...getFeatureContent(t, key),
  }))
}

export function getValuePillars(t: TFunction): FeatureItem[] {
  return valuePillarDefinitions.map(({ icon, id, key }) => ({
    id,
    icon,
    ...getFeatureContent(t, key),
  }))
}

export function getServiceCards(t: TFunction): ServiceItem[] {
  return serviceCardDefinitions.map(({ icon, id, key }) => ({
    id,
    icon,
    ...getServiceContent(t, key),
  }))
}

export function getProcessSteps(t: TFunction): FeatureItem[] {
  return processStepDefinitions.map(({ icon, id, key }) => ({
    id,
    icon,
    ...getFeatureContent(t, key),
  }))
}

export function getReasonsToChooseUs(t: TFunction): FeatureItem[] {
  return reasonDefinitions.map(({ icon, id, key }) => ({
    id,
    icon,
    ...getFeatureContent(t, key),
  }))
}

export function getContactDetails(t: TFunction): ContactItem[] {
  return contactDetailDefinitions.map(({ href, icon, id, key }) => ({
    href,
    icon,
    id,
    ...getContactContent(t, key),
  }))
}

export function getServiceAreas(t: TFunction): TextListItem[] {
  return serviceAreaDefinitions.map(({ id, key }) => ({
    id,
    label: t(key),
  }))
}

export function getOfficeFacts(t: TFunction): TextListItem[] {
  return officeFactDefinitions.map(({ id, key }) => ({
    id,
    label: t(key),
  }))
}
