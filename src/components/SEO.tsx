import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'
import Helmet from 'react-helmet'

type MetaProps = JSX.IntrinsicElements['meta']

interface SEOProps {
  description?: string
  lang?: string
  meta?: Array<MetaProps>
  title?: string
}

interface SEOStaticQuery {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
    }
  }
  logoImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  socialImage: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const SEO = ({ description, lang, meta, title }: SEOProps): JSX.Element => {
  const { site, socialImage, logoImage } = useStaticQuery<SEOStaticQuery>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        logoImage: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 112, height: 112)
          }
        }
        socialImage: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            gatsbyImageData(layout: FIXED, width: 600, height: 600)
          }
        }
      }
    `
  )

  const metaDescription = site.siteMetadata.description
  const siteDescription = description || site.siteMetadata.description

  const metaTitle = site.siteMetadata.title
  const siteTitle = title

  const metaImage = `${site.siteMetadata.siteUrl}${socialImage.childImageSharp.gatsbyImageData.images.fallback?.src}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defaultTitle={metaTitle}
      title={siteTitle}
      titleTemplate={`%s | ${metaTitle}`}
      meta={(
        [
          {
            property: `og:title`,
            content: metaTitle,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:image`,
            content: metaImage,
          },
          {
            property: `og:image:alt`,
            content: `Addy Sheppard coaching logo`,
          },
          {
            property: `og:image:width`,
            content: `1200`,
          },
          {
            property: `og:image:height`,
            content: `1200`,
          },
          {
            name: `description`,
            content: siteDescription,
          },
        ] as Array<MetaProps>
      ).concat(meta || [])}
    >
      <script type="application/ld+json">
        {`
           [
             {
               "@context": "https://schema.org",
               "@type": "Corporation",
               "name": "${site.siteMetadata.title}",
               "alternateName": "Addy Sheppard coaching",
               "url": "${site.siteMetadata.siteUrl}",
               "logo": "${site.siteMetadata.siteUrl}${logoImage.childImageSharp.gatsbyImageData.images.fallback?.src}",
             },
             {
               "@context": "https://schema.org/",
               "@type": "WebSite",
               "name": "${site.siteMetadata.title}",
               "url": "${site.siteMetadata.siteUrl}"
             }
           ]
         `}
      </script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
