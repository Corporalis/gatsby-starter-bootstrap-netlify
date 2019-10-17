import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const { allMarkdownRemark, headshot57, headshot173 } = data;
  const { edges } = allMarkdownRemark;
  const pages = edges.map(edge => edge.node);
  const { html: homeHtml } = pages.find(
    node => node.frontmatter.contentType === "home"
  );
  const { html: coachingHtml, frontmatter: coachingFrontmatter } = pages.find(
    node => node.frontmatter.contentType === "coaching"
  );
  const {
    frontmatter: offeringsFrontmatter,
    fields: offeringsFields
  } = pages.find(node => node.frontmatter.contentType === "offerings");

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
      <section id="coaching" className="page-section">
        <Container>
          <Row>
            <Col lg="3">
              <Img fluid={headshot173.childImageSharp.fluid} />
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
      <section id="offerings" className="page-section">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="text-center mt-0">{offeringsFrontmatter.title}</h2>
              <hr className="divider my-4"></hr>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="float-left">
                <h3 className="text-center mt-0">
                  {offeringsFrontmatter.personalTitle}
                </h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="4" sm="12" className="text-center">
              <div className="mt-5 mb-5">
                <FontAwesomeIcon
                  icon="phone"
                  size="4x"
                  className="text-primary mb-4"
                />
                <h3 className="h4 mb-2">Contact</h3>
                <p className="text-muted mb-0">
                  This can over the phone, Skype or face to face, depending on
                  what your preference is.
                </p>
              </div>
            </Col>
            <Col lg="4" sm="12" className="text-center">
              <div className="mt-5 mb-5">
                <FontAwesomeIcon
                  icon="clock"
                  size="4x"
                  className="text-primary mb-4"
                />
                <h3 className="h4 mb-2">Sessions</h3>
                <p className="text-muted mb-0">
                  Sessions are 60 or 90 minutes long with the first exploratory
                  session usually lasting 90 minutes.
                </p>
              </div>
            </Col>
            <Col lg="4" sm="12" className="text-center">
              <div className="mt-5  mb-5">
                <FontAwesomeIcon
                  icon="calendar-day"
                  size="4x"
                  className="text-primary mb-4"
                />
                <h3 className="h4 mb-2">Just want a one off?</h3>
                <p className="text-muted mb-0">
                  Like a car service, if you’d like to check in to make sure
                  everything is set up to run smoothly for the next few months
                  you can opt for a one off coaching session.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg="3">
              <Img fluid={headshot173.childImageSharp.fluid} />
            </Col>
            <Col lg="9">
              <h3 className="text-center mt-0">
                {offeringsFrontmatter.groupTitle}
              </h3>
              <hr className="divider my-4"></hr>
              <div
                className="text-left"
                dangerouslySetInnerHTML={{
                  __html: offeringsFields.frontmattermd.groupBody.html
                }}
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
      filter: {
        frontmatter: { hidden: { ne: true }, contentType: { ne: null } }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            contentType
            personalTitle
            groupTitle
          }
          fields {
            frontmattermd {
              groupBody {
                html
              }
            }
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

    headshot173: file(relativePath: { eq: "headshot 173a.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
