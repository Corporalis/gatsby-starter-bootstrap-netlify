import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-scroll'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import styled, { ThemeProvider } from 'styled-components'

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
import Scrollable from './scroll/Scrollable'
import { GlobalStyles } from '../GlobalStyles'
import { theme } from '../theme'
import SEO from './SEO'

interface SEOStaticQuery {
  site: {
    siteMetadata: {
      title: string
    }
  }
  logo: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const TemplateWrapper = ({ children }: JSX.ElementChildrenAttribute) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [activeClass] = useState<string>('inactive')
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    var pageContentRect = document.body.getBoundingClientRect()
    setScrolled(pageContentRect.top < -40)
  }

  const menuButtonClick = () => {
    setCollapsed(!collapsed)
  }

  const navigationClick = () => {
    if (collapsed) {
      menuButtonClick()
    }
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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <SEO />
        <Scrollable onWindowScroll={handleScroll}></Scrollable>
        <nav
          className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${
            scrolled ? 'navbar-scrolled' : ''
          }`}
          id="mainNav"
        >
          <Container>
            <GatsbyImage
              image={logo.childImageSharp.gatsbyImageData}
              alt="logo"
            />

            <button
              className={`navbar-toggler navbar-toggler-right ${
                collapsed ? 'collapsed' : ''
              }`}
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
            <div
              className={`collapse navbar-collapse ${collapsed ? 'show' : ''}`}
              id="navbarResponsive"
            >
              <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item">
                  <Link
                    activeClass={activeClass}
                    to="coaching"
                    spy={true}
                    smooth={true}
                    offset={-132}
                    duration={500}
                    className="nav-link"
                    onClick={navigationClick}
                  >
                    Coaching
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    activeClass={activeClass}
                    to="offerings"
                    spy={true}
                    smooth={true}
                    offset={-132}
                    duration={500}
                    className="nav-link"
                    onClick={navigationClick}
                  >
                    When we meet
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    activeClass={activeClass}
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-132}
                    duration={500}
                    className={`nav-link`}
                    onClick={navigationClick}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </Container>
        </nav>
        <PageContent id="page-content" className="pageContent">
          {children}
        </PageContent>
      </div>
    </ThemeProvider>
  )
}

export default TemplateWrapper

const PageContent = styled.div`
  flex: 1;
`
