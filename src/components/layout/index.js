import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

// code syntax-highlighting theme
// feel free to change it to another one
import "prismjs/themes/prism-twilight.css";

// main site style
import "./index.scss";

const TemplateWrapper = ({ children, data }) => {
  let user;
  if (typeof window !== "undefined") {
    user = window.netlifyIdentity && window.netlifyIdentity.currentUser();
  }

  const menuButtonClick = event => {
    document.getElementById("navbarResponsive").classList.toggle("show");
    event.currentTarget.classList.toggle("collapsed");
  };

  return (
    <StaticQuery
      query={pageQuery}
      render={data => (
        <div className="App">
          <Helmet title={data.site.siteMetadata.title} />
          <nav
            className="navbar navbar-expand-lg navbar-light fixed-top py-3"
            id="mainNav"
          >
            <Container>
              <Link to="/" className="navbar-brand js-scroll-trigger">
                {data.site.siteMetadata.title}
              </Link>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={menuButtonClick}
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item">
                    <Link to="/coaching" className="nav-link js-scroll-trigger">
                      Coaching
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link js-scroll-trigger">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </Container>
          </nav>
          <div id="page-content" className="pageContent">
            {children}
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default TemplateWrapper;
