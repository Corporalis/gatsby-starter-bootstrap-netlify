import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface TextPrimaryContentSectionProps {
  title: string
  html: string
  image: IGatsbyImageData
  primaryColumnWidth: number
  secondaryColumnWidth: number
}

const TextPrimaryContentSection = ({
  title,
  html,
  image,
  primaryColumnWidth = 9,
  secondaryColumnWidth = 3,
}: TextPrimaryContentSectionProps) => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col lg={primaryColumnWidth}>
            <h2 className="text-center mt-0">{title}</h2>
            <hr className="divider my-4"></hr>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Col>
          <Col lg={secondaryColumnWidth}>
            <GatsbyImage image={image} alt="About me image" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default TextPrimaryContentSection
