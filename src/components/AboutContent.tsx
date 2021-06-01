import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { GatsbyImageData } from '../models/GatsbyImage'
import { StaticQuery } from '../models/StaticQuery'
import TextPrimaryContentSection from './sections/TextPrimaryContentSection'

interface AboutContentFrontmatter {
  title: string
}

interface AboutContentStaticQuery extends StaticQuery<AboutContentFrontmatter> {
  image: GatsbyImageData
}

const AboutContent = () => {
  const { markdownRemark, image } = useStaticQuery<AboutContentStaticQuery>(
    graphql`
      query {
        markdownRemark(frontmatter: { path: { eq: "/about" } }) {
          html
          frontmatter {
            title
          }
        }
        image: file(relativePath: { eq: "headshot 34.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1000)
          }
        }
      }
    `
  )

  const { frontmatter, html } = markdownRemark
  const { title } = frontmatter

  return (
    <TextPrimaryContentSection
      title={title}
      image={image.childImageSharp.gatsbyImageData}
      html={html}
      primaryColumnWidth={6}
      secondaryColumnWidth={6}
    />
  )
}

export default AboutContent
