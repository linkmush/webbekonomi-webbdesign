import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type PageMetaProps = {
  description: string
  title: string
}

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string) {
  let element = document.head.querySelector(selector)

  if (element instanceof HTMLMetaElement) {
    return element
  }

  element = document.createElement('meta')
  element.setAttribute(attribute, key)
  document.head.appendChild(element)

  return element
}

export function PageMeta({ description, title }: PageMetaProps) {
  const { t } = useTranslation()
  const fullTitle = `${title} | ${t('site.name')}`

  useEffect(() => {
    const previousTitle = document.title

    const descriptionMeta = upsertMeta('meta[name="description"]', 'name', 'description')
    const ogTitleMeta = upsertMeta('meta[property="og:title"]', 'property', 'og:title')
    const ogDescriptionMeta = upsertMeta('meta[property="og:description"]', 'property', 'og:description')

    const previousDescription = descriptionMeta.getAttribute('content')
    const previousOgTitle = ogTitleMeta.getAttribute('content')
    const previousOgDescription = ogDescriptionMeta.getAttribute('content')

    document.title = fullTitle
    descriptionMeta.setAttribute('content', description)
    ogTitleMeta.setAttribute('content', fullTitle)
    ogDescriptionMeta.setAttribute('content', description)

    return () => {
      document.title = previousTitle

      if (previousDescription === null) {
        descriptionMeta.removeAttribute('content')
      } else {
        descriptionMeta.setAttribute('content', previousDescription)
      }

      if (previousOgTitle === null) {
        ogTitleMeta.removeAttribute('content')
      } else {
        ogTitleMeta.setAttribute('content', previousOgTitle)
      }

      if (previousOgDescription === null) {
        ogDescriptionMeta.removeAttribute('content')
      } else {
        ogDescriptionMeta.setAttribute('content', previousOgDescription)
      }
    }
  }, [description, fullTitle])

  return null
}
