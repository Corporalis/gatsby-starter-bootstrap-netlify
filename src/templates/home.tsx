import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Scrollable from '../components/scroll/scrollable'

export default function Template({ data }: any) {
  const { markdownRemark } = data
  //const { edges } = allMarkdownRemark;
  const { html } = markdownRemark
  //const pages = edges.map(edge => edge.node); //.find(node => node.frontmatter.contentType === "home");
  //const { homeHtml: html } = pages.find(node => node.frontmatter.contentType === "home");
  //console.log(pages);
  return (
    <Layout>
      <header className="masthead">
        <Container className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col lg="10 align-self-end text-center">
              <h1 className="text-uppercase text-white font-weight-bold">
                Welcome Home
              </h1>
              <hr className="divider my-4" />
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
                className="float-right"
              />
              <Col
                lg="8"
                className="text-left text-white-75"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Col>
          </Row>
        </Container>
        {/* <Container className="container h-100">
          <Row>
            <Col md="12">
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
                className="float-right"
              />
              <div
                className="text-white-75"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Col>
          </Row>
        </Container> */}
      </header>
    </Layout>
  )
}

export const homePageQuery = graphql`
  query HomePage {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
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
