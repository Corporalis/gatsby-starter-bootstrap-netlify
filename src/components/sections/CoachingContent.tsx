import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImageData } from '../../models/GatsbyImage'
import { StaticQuery } from '../../models/StaticQuery'

interface CoachingContentFrontmatter {
  title: string
}

interface CoachingContentStaticQuery
  extends StaticQuery<CoachingContentFrontmatter> {
  image: GatsbyImageData
}

const CoachingContent = () => {
  const { markdownRemark, image } =
    useStaticQuery<CoachingContentStaticQuery>(
      graphql`
        query {
          markdownRemark(frontmatter: { path: { eq: "/coaching" } }) {
            html
            frontmatter {
              title
            }
          }
          image: file(relativePath: { eq: "headshot 173a.jpg" }) {
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
    <section className="page-section">
      <Container>
        <Row>
          <Col lg="3">
            <GatsbyImage
              image={image.childImageSharp.gatsbyImageData}
              alt="What can coaching do image"
            />
          </Col>
          <Col lg="9">
            <h2 className="text-center mt-0">{title}</h2>
            <hr className="divider my-4"></hr>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default CoachingContent
