import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { GatsbyImage } from 'gatsby-plugin-image'

interface HomeContentProps {
  html: string
  image: any
}

const HomeContent = ({ html, image }: HomeContentProps): JSX.Element => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col
            lg="9"
            className="text-left"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <Col lg="3">
            <GatsbyImage image={image} alt="Welcome image" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HomeContent
