import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable"

const handleScroll = (event) => {
    //console.log("Index's handleScroll");
  }

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <header className="masthead">
      <Scrollable onWindowScroll={handleScroll}></Scrollable>
        <Container className="container h-100">
          <Row className="h-100 align-items-center justify-content-center text-center">
            <Col lg="10" className="align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold">
                {data.site.siteMetadata.title} | {post.frontmatter.title}
              </h1>
              <hr className="divider my-4" />
            </Col>
            <Col lg="8" className="align-self-baseline">
              <p className="text-white-75 font-weight-light mb-5">
                {post.frontmatter.strapline}
              </p>
            </Col>
          </Row>
        </Container>
      </header>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
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
