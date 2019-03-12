import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

// code syntax-highlighting theme
// feel free to change it to another one
import 'prismjs/themes/prism-twilight.css'

// main site style
import './index.scss'

const TemplateWrapper = ({ children, data }) => {
  let user
  if (typeof window !== 'undefined') {
    user = window.netlifyIdentity && window.netlifyIdentity.currentUser()
  }
  return (
    <StaticQuery query={pageQuery} render={data => (
      <div className='App'>
        <Helmet title={data.site.siteMetadata.title} />
        <nav className='navbar navbar-expand-lg navbar-light fixed-top py-3' id='mainNav'>
          <Container>
            <Link to='/' className='navbar-brand  js-scroll-trigger'>{data.site.siteMetadata.title}</Link>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <ul className='navbar-nav ml-auto my-2 my-lg-0'>

              {user && (
                <li className='nav-item'>
                  <a href='/admin' className='nav-link js-scroll-trigger'>Admin</a>
                </li>
              )}

              <li className='nav-item'>
                <Link to='/about' className='nav-link js-scroll-trigger'>About</Link>
              </li>
            </ul>
          </Container>
        </nav>
        <div className='pageContent'>{children}</div>
      </div>
    )} />
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default TemplateWrapper
