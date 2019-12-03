import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";

const TextPrimaryContentSection = ({ name, title, html, image, primaryColumnWidth = 9, secondaryColumnWidth = 3  }) => {
  return (
    <section className="page-section" name={name}>
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
            <Img fluid={image} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default TextPrimaryContentSection;
