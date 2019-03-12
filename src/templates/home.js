import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <header class="masthead">
        <Container className="container h-100">
          <Row className="h-100 align-items-center justify-content-center text-center">
            <Col lg='10' className="align-self-end">
              <h1 class="text-uppercase text-white font-weight-bold">
              {data.site.siteMetadata.title} | {post.frontmatter.title}
              </h1>
              <hr class="divider my-4" />
            </Col>
            <Col lg='8' className="align-self-baseline">
              <p class="text-white-75 font-weight-light mb-5">
                Start Bootstrap can help you build better websites using the
                Bootstrap framework! Just download a theme and start
                customizing, no strings attached!
              </p>
            </Col>
          </Row>
        </Container>
      </header>
    </Layout>
  );
}

export const homePageQuery = graphql`
  query HomePage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
