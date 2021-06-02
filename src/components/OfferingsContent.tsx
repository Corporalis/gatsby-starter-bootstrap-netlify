import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import Offering from './Offering'
import { GatsbyImageData } from '../models/GatsbyImage'
import { StaticQueryWithFields } from '../models/StaticQuery'

interface OfferingsContentFrontmatter {
  title: string
  personalTitle: string
  groupTitle: string
  groupImage: any
}

interface OfferingsContentFields {
  personalBodyHtml: string
  groupBodyHtml: string
}

interface OfferingsContentStaticQuery
  extends StaticQueryWithFields<
    OfferingsContentFrontmatter,
    OfferingsContentFields
  > {
  image: GatsbyImageData
}

const OfferingsContent = () => {
  const { markdownRemark, image } = useStaticQuery<OfferingsContentStaticQuery>(
    graphql`
      query {
        markdownRemark(frontmatter: { path: { eq: "/offerings" } }) {
          html
          frontmatter {
            title
            personalTitle
            groupTitle
          }
          fields {
            personalBodyHtml
            groupBodyHtml
          }
        }
        image: file(relativePath: { eq: "headshot 137.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 1000)
          }
        }
      }
    `
  )

  const { frontmatter, fields } = markdownRemark
  const { title, personalTitle, groupTitle } = frontmatter
  const { personalBodyHtml, groupBodyHtml } = fields

  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col lg="12">
            <h2 className="text-center mt-0">{title}</h2>
            <hr className="divider my-4"></hr>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <h3 className="text-center mt-0">{personalTitle}</h3>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: personalBodyHtml,
              }}
            ></div>
          </Col>
        </Row>
        <Row>
          <Offering
            title="Contact"
            description="This can over the phone, Skype or face to face, depending on what your preference is."
            icon="phone"
          />
          <Offering
            title="Sessions"
            description="Sessions are 60 or 90 minutes long with the first exploratory session usually lasting 90 minutes."
            icon="clock"
          />
          <Offering
            title="Just want a one off?"
            description="Like a car service, if you’d like to check in to make sure everything is set up to run smoothly for the next few months you can opt for a one off coaching session."
            icon="calendar-day"
          />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="6">
            <GatsbyImage
              image={image.childImageSharp.gatsbyImageData}
              alt="Group session image"
            />
          </Col>
          <Col lg="6">
            <h3 className="text-center mt-0">{groupTitle}</h3>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: groupBodyHtml,
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OfferingsContent
