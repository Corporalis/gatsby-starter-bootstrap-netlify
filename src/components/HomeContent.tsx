import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImageData } from '../models/GatsbyImage'

interface HomeContentStaticQuery {
  markdownRemark: {
    html: string
  }
  image: GatsbyImageData
}

const HomeContent = (): JSX.Element => {
  const { markdownRemark, image } = useStaticQuery<HomeContentStaticQuery>(
    graphql`
      query {
        markdownRemark(frontmatter: { path: { eq: "/" } }) {
          html
        }
        image: file(relativePath: { eq: "headshot 57a.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1000)
          }
        }
      }
    `
  )

  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col
            lg="9"
            className="text-left"
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />

          <Col lg="3" className="d-none d-lg-block">
            <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt="Welcome image" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HomeContent
