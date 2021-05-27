import React from 'react'
import { graphql } from 'gatsby'
import AboutContent from '../components/AboutContent'

interface AboutPageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    markdownRemark: {
      frontmatter: {
        title: string
      }
      html: string
    }
    image: any
  }
}

export default function AboutPageTemplate({ data }: AboutPageTemplateProps) {
  const { markdownRemark: post, image } = data

  const { html, frontmatter } = post

  return <AboutContent html={html} title={frontmatter.title} image={image} />
}

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }

    image: file(relativePath: { eq: "headshot 34.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
