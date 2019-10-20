import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";

const ImagePrimaryContentSection = ({ name, title, html, image }) => {
  return (
    <section className="page-section" name={name}>
      <Container>
        <Row>
          <Col lg="9">
            <h2 className="text-center mt-0">{title}</h2>
            <hr className="divider my-4"></hr>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Col>
          <Col lg="3">
            <Img fluid={image} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ImagePrimaryContentSection;
