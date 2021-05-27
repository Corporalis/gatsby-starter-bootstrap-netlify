import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Scrollable from '../components/scroll/scrollable'
import ImagePrimaryContentSection from '../components/sections/ImagePrimaryContentSection'
import AboutContent from '../components/AboutContent'
import HomeContent from '../components/HomeContent'
import OfferingsContent from '../components/OfferingsContent'

const handleScroll = () => {
  var mainNav = document.getElementById('mainNav')
  var pageContent = document.getElementById('page-content')
  var pageContentRect = pageContent?.getBoundingClientRect()
  if (pageContentRect && pageContentRect.top < -20) {
    mainNav?.classList.add('navbar-scrolled')
  } else {
    mainNav?.classList.remove('navbar-scrolled')
  }
}

interface ImageProps {
  childImageSharp: {
    gatsbyImageData: any
  }
}
interface Node {
  fields: {
    frontmattermd: any
  }

  frontmatter: any
  html: string
}

interface DataProps {
  allMarkdownRemark: {
    edges: [
      {
        node: Node
      }
    ]
  }
  headshot57: ImageProps
  headshot173: ImageProps
  headshot34: ImageProps
  headshot137: ImageProps
}

interface IndexPageProps {
  data: DataProps
}

const IndexPage = ({ data }: IndexPageProps) => {
  const {
    allMarkdownRemark,
    headshot57,
    headshot173,
    headshot34,
    headshot137,
  } = data
  const { edges } = allMarkdownRemark
  const pages = edges.map((edge) => edge.node)
  const { html: homeHtml } = pages.find(
    (node) => node.frontmatter.contentType === 'home'
  ) as Node
  const { html: coachingHtml, frontmatter: coachingFrontmatter } = pages.find(
    (node) => node.frontmatter.contentType === 'coaching'
  ) as Node
  const { frontmatter: offeringsFrontmatter } = pages.find(
    (node) => node.frontmatter.contentType === 'offerings'
  ) as Node
  const { html: aboutHtml, frontmatter: aboutFrontmatter } = pages.find(
    (node) => node.frontmatter.contentType === 'about'
  ) as Node

  return (
    <Layout>
      <header className="masthead">
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
      </header>
      <HomeContent
        html={homeHtml}
        image={headshot57.childImageSharp.gatsbyImageData}
      ></HomeContent>
      <ImagePrimaryContentSection
        title={coachingFrontmatter.title}
        image={headshot173.childImageSharp.gatsbyImageData}
        html={coachingHtml}
      ></ImagePrimaryContentSection>
      <OfferingsContent
        title={offeringsFrontmatter.title}
        personalTitle={offeringsFrontmatter.personalTitle}
        personalHtml={offeringsFrontmatter.personalBody}
        groupImage={headshot137.childImageSharp.gatsbyImageData}
        groupTitle={offeringsFrontmatter.groupTitle}
        groupHtml={offeringsFrontmatter.groupBody}
      ></OfferingsContent>
      <AboutContent
        title={aboutFrontmatter.title}
        image={headshot34.childImageSharp.gatsbyImageData}
        html={aboutHtml}
      ></AboutContent>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { hidden: { ne: true }, contentType: { ne: null } }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            contentType
            personalTitle
            personalBody
            groupTitle
            groupBody
          }
        }
      }
    }

    headshot57: file(relativePath: { eq: "headshot 57a.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1000)
      }
    }

    headshot34: file(relativePath: { eq: "headshot 34.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1000)
      }
    }

    headshot137: file(relativePath: { eq: "headshot 137.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1000)
      }
    }

    headshot173: file(relativePath: { eq: "headshot 173a.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 1000)
      }
    }
  }
`
export default IndexPage
