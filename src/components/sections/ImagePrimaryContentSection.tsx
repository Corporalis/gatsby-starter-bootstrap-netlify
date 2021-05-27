import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { GatsbyImage } from 'gatsby-plugin-image'

interface ImagePrimaryContentSectionProps {
  image: any
  title: string
  html: string
}

const ImagePrimaryContentSection = ({
  image,
  title,
  html,
}: ImagePrimaryContentSectionProps) => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col lg="3">
            <GatsbyImage image={image} alt="What can coaching do image" />
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
export default ImagePrimaryContentSection
