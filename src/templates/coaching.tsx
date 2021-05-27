import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default function Template({ data }: any) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Helmet
        title={`${data.site.siteMetadata.title} | ${frontmatter.title}`}
      />
      <header className="masthead">
        <Container className="container h-100">
          <Row>
            <Col md="12">
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
                className="float-left"
              />
              <div
                className="text-white-75"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Col>
          </Row>
        </Container>
      </header>
    </Layout>
  )
}

export const coachingPageQuery = graphql`
  query CoachingPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
