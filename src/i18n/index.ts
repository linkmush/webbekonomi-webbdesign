import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/i18n/locales/en/translation.json'
import sv from '@/i18n/locales/sv/translation.json'
import vi from '@/i18n/locales/vi/translation.json'

export const supportedLanguages = ['en', 'sv', 'vi'] as const

export type AppLanguage = (typeof supportedLanguages)[number]

export const languageStorageKey = 'webbekonomi-language'

export const languageOptions = [
  { code: 'en', labelKey: 'languages.en' },
  { code: 'sv', labelKey: 'languages.sv' },
  { code: 'vi', labelKey: 'languages.vi' },
] as const satisfies ReadonlyArray<{
  code: AppLanguage
  labelKey: string
}>

function isSupportedLanguage(value: string | null | undefined): value is AppLanguage {
  return supportedLanguages.includes(value as AppLanguage)
}

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return 'sv'
  }

  const storedLanguage = window.localStorage.getItem(languageStorageKey)

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage
  }

  const browserLanguage = window.navigator.language.toLowerCase().split('-')[0]

  if (isSupportedLanguage(browserLanguage)) {
    return browserLanguage
  }

  return 'sv'
}

function syncDocumentLanguage(language: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = language

  if (isSupportedLanguage(language)) {
    window.localStorage.setItem(languageStorageKey, language)
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sv: { translation: sv },
    vi: { translation: vi },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'sv',
  interpolation: {
    escapeValue: false,
  },
})

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
i18n.on('languageChanged', syncDocumentLanguage)

export default i18n
