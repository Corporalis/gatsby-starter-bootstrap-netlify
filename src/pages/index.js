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
  const { markdownRemark } = data;
  const { frontmatter } = markdownRemark;
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
                className="float-right"
              />
              <p className="text-white-75">{frontmatter.introduction}</p>
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
        introduction
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
