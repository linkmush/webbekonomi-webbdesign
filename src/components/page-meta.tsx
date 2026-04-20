import { Helmet } from 'react-helmet'
import { companyName } from '@/lib/site-config'

type PageMetaProps = {
  description: string
  title: string
}

export function PageMeta({ description, title }: PageMetaProps) {
  const fullTitle = `${title} | ${companyName}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
