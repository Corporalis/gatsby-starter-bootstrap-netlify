import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Scrollable from "../components/scroll/scrollable";
import ImagePrimaryContentSection from "../components/sections/imagePrimaryContentSection";
import AboutContent from "../components/aboutContent";
import HomeContent from "../components/homeContent";
import OfferingsContent from "../components/offeringsContent";

const handleScroll = (event) => {
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
  const {
    allMarkdownRemark,
    headshot57,
    headshot173,
    headshot34,
    headshot137,
  } = data;
  const { edges } = allMarkdownRemark;
  const pages = edges.map((edge) => edge.node);
  const { html: homeHtml } = pages.find(
    (node) => node.frontmatter.contentType === "home"
  );
  const { html: coachingHtml, frontmatter: coachingFrontmatter } = pages.find(
    (node) => node.frontmatter.contentType === "coaching"
  );
  const {
    frontmatter: offeringsFrontmatter,
    fields: offeringsFields,
  } = pages.find((node) => node.frontmatter.contentType === "offerings");
  const { html: aboutHtml, frontmatter: aboutFrontmatter } = pages.find(
    (node) => node.frontmatter.contentType === "about"
  );

  return (
    <Layout>
      <header className="masthead">
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
      </header>
      <HomeContent
        html={homeHtml}
        image={headshot57.childImageSharp.fluid}
      ></HomeContent> 
      <ImagePrimaryContentSection
        name="coaching"
        title={coachingFrontmatter.title}
        image={headshot173.childImageSharp.fluid}
        html={coachingHtml}
      ></ImagePrimaryContentSection>
      <OfferingsContent
        title={offeringsFrontmatter.title}
        personalTitle={offeringsFrontmatter.personalTitle}
        personalHtml={offeringsFields.frontmattermd.personalBody.html}
        groupImage={headshot137.childImageSharp.fluid}
        groupTitle={offeringsFrontmatter.groupTitle}
        groupHtml={offeringsFields.frontmattermd.groupBody.html}
      ></OfferingsContent>
      <AboutContent
        name="about"
        title={aboutFrontmatter.title}
        image={headshot34.childImageSharp.fluid}
        html={aboutHtml}
      ></AboutContent>
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
              personalBody {
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

    headshot34: file(relativePath: { eq: "headshot 34.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    headshot137: file(relativePath: { eq: "headshot 137.jpg" }) {
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
