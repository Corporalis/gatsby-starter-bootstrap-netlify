import React from "react";
import { Container, Row, Col } from "reactstrap";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable"

const handleScroll = (event) => {
  var mainNav = document.getElementById("mainNav");
  var pageContentRect = document.getElementById("page-content").getBoundingClientRect();
  if(pageContentRect.top < -120) {
    mainNav.classList.add("navbar-scrolled");
  } else {
    mainNav.classList.remove("navbar-scrolled");
  }
}

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <header className="masthead">
      <Scrollable onWindowScroll={handleScroll}></Scrollable>
        <Container className="container h-100">
          <Row>
          <Col lg='8' className="align-self-baseline">
              <p className="text-white-75 font-weight-light mb-5">
              {post.frontmatter.strapline}
              </p>
            </Col>
            <Col md='4' className="align-self-end">
            </Col>
          </Row>
        </Container>
      </header>
    </Layout>
  );
}

export const homePageQuery = graphql`
  query HomePage {
    markdownRemark(frontmatter: { path: { eq:"/" } }) {
      html
      frontmatter {
        path
        title
        strapline
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
