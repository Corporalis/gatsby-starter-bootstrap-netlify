import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-scroll'
import { GatsbyImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faPhone,
  faClock,
  faCalendarDay,
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faPhone, faClock, faCalendarDay)

// code syntax-highlighting theme
// feel free to change it to another one
import 'prismjs/themes/prism-twilight.css'

import './layout.scss'

interface SEOStaticQuery {
  site: {
    siteMetadata: {
      title: string
    }
  }
  logo: {
    childImageSharp: {
      gatsbyImageData: any //IGatsbyImageData
    }
  }
}

const TemplateWrapper = ({ children }: JSX.ElementChildrenAttribute) => {
  // let user
  // if (typeof window !== 'undefined') {
  //   user = window.netlifyIdentity && window.netlifyIdentity.currentUser()
  // }

  const menuButtonClick = (event: React.MouseEvent) => {
    const navBar = document?.getElementById('navbarResponsive')
    navBar?.classList.toggle('show')
    event.currentTarget.classList.toggle('collapsed')
  }

  const { site, logo } = useStaticQuery<SEOStaticQuery>(graphql`
    query LayoutIndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 100, height: 100)
        }
      }
    }
  `)

  return (
    <div className="App">
      <Helmet title={site.siteMetadata.title}></Helmet>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <Container>
          <GatsbyImage
            image={logo.childImageSharp.gatsbyImageData}
            alt="logo"
          />

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
                <Link
                  activeClass="active"
                  to="coaching"
                  spy={true}
                  smooth={true}
                  offset={-132}
                  duration={500}
                  className="nav-link"
                >
                  Coaching
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  to="offerings"
                  spy={true}
                  smooth={true}
                  offset={-132}
                  duration={500}
                  className="nav-link"
                >
                  When we meet
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-132}
                  duration={500}
                  className="nav-link"
                >
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
  )
}

export default TemplateWrapper
