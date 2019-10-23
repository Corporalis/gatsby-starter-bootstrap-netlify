import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";
import Offering from "../components/offering";
import ImagePrimaryContentSection from "../components/sections/imagePrimaryContentSection";
import TextPrimaryContentSection from "../components/sections/textPrimaryContentSection";

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
  const { html: aboutHtml, frontmatter: aboutFrontmatter } = pages.find(
    node => node.frontmatter.contentType === "about"
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
      <ImagePrimaryContentSection
        name="coaching"
        title={coachingFrontmatter.title}
        image={headshot173.childImageSharp.fluid}
        html={coachingHtml}
      />
      <section className="page-section" name="offerings">
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
            <Col lg="3">
              <Img fluid={headshot173.childImageSharp.fluid} />
            </Col>
            <Col lg="9">
              <h3 className="text-center mt-0">
                {offeringsFrontmatter.groupTitle}
              </h3>
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
      <TextPrimaryContentSection
        name="about"
        title={aboutFrontmatter.title}
        image={headshot173.childImageSharp.fluid}
        html={aboutHtml}
      />
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
