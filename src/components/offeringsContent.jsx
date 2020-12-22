import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";
import Offering from "../components/offering";

const OfferingsContent = ({
  title,
  personalTitle,
  personalHtml,
  groupTitle,
  groupImage,
  groupHtml,
}) => {
  return (
    <section className="page-section" name="offerings">
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
                __html: personalHtml,
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
            <Img fluid={groupImage} />
          </Col>
          <Col lg="6">
            <h3 className="text-center mt-0">{groupTitle}</h3>
            <div
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: groupHtml,
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OfferingsContent;
