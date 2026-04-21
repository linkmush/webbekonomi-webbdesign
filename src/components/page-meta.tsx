import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

type PageMetaProps = {
  description: string
  title: string
}

export function PageMeta({ description, title }: PageMetaProps) {
  const { t } = useTranslation()
  const fullTitle = `${title} | ${t('site.name')}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
