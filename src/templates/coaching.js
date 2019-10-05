import React from "react";
import { Container, Row, Col } from "reactstrap";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";

const handleScroll = event => {
  // var mainNav = document.getElementById("mainNav");
  // var pageContentRect = document
  //   .getElementById("page-content")
  //   .getBoundingClientRect();
  // if (pageContentRect.top < -120) {
  //   mainNav.classList.add("navbar-scrolled");
  // } else {
  //   mainNav.classList.remove("navbar-scrolled");
  // }
};

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { html } = markdownRemark;
  return (
    <Layout>
      <header className="masthead">
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
        <Container className="container h-100">
          <Row>
            <Col md="12">
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
                className="float-left"
              />
              <div
                className="text-white-75"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Col>
          </Row>
        </Container>
      </header>
    </Layout>
  );
}

export const coachingPageQuery = graphql`
  query CoachingPage {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        path
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
