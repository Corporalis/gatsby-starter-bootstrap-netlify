import React from "react";
import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offering = ({ title, description }) => {
  return (
    <Col lg="4" sm="12" className="text-center">
      <div className="mt-5 mb-5">
        <FontAwesomeIcon icon="clock" size="4x" className="text-primary mb-4" />
        <h3 className="h4 mb-2">{title}</h3>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </Col>
  );
};
export default Offering;
