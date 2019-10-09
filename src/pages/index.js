import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";

const handleScroll = event => {
  //console.log("Index's handleScroll");
};

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;
  console.log(edges);
  const pages = edges.map(edge => edge.node);
  const { html: homeHtml } = pages.find(
    node => node.frontmatter.contentType === "home"
  );
  const { html: coachingHtml, frontmatter: coachingFrontmatter } = pages.find(
    node => node.frontmatter.contentType === "coaching"
  );
  console.log(pages);
  return (
    <Layout>
      <header className="masthead">
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
        <Container className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col lg="12" className="align-self-end text-center">
              <h1 className="text-uppercase text-white font-weight-bold">
                Welcome
              </h1>
              <hr className="divider my-4" />
            </Col>
          </Row>
        </Container>
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
              <img
                src="https://lorempixel.com/200/400/"
                alt="introduction image"
              />
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
  }
`;
