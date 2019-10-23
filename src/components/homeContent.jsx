import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";

const HomeContent = ({ html , image}) => {
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
            <Img fluid={image} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeContent;
