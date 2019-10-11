import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";

const handleScroll = event => {
  var mainNav = document.getElementById("mainNav");
  var pageContentRect = document
    .getElementById("page-content")
    .getBoundingClientRect();
  if (pageContentRect.top < -20) {
    mainNav.classList.add("navbar-scrolled");
  } else {
    mainNav.classList.remove("navbar-scrolled");
  }
};

const IndexPage = ({ data }) => {
  const { allMarkdownRemark, headshot57 } = data;
  const { edges } = allMarkdownRemark;
  const pages = edges.map(edge => edge.node);
  const { html: homeHtml } = pages.find(
    node => node.frontmatter.contentType === "home"
  );
  const { html: coachingHtml, frontmatter: coachingFrontmatter } = pages.find(
    node => node.frontmatter.contentType === "coaching"
  );

  return (
    <Layout>
      <header className="masthead">
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
      </header>
      <section className="page-section">
        <Container>
          <Row>
            <Col
              lg="9"
              className="text-left"
              dangerouslySetInnerHTML={{ __html: homeHtml }}
            />

            <Col lg="3">
              <Img fluid={headshot57.childImageSharp.fluid} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="page-section">
        <Container>
          <Row>
            <Col lg="3">
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
              />
            </Col>
            <Col lg="9">
              <h2 className="text-center mt-0">{coachingFrontmatter.title}</h2>
              <hr className="divider my-4"></hr>
              <div
                className="text-left"
                dangerouslySetInnerHTML={{ __html: coachingHtml }}
              ></div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { hidden: { ne: true } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            contentType
          }
        }
      }
    }

    headshot57: file(relativePath: { eq: "headshot 57a.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
