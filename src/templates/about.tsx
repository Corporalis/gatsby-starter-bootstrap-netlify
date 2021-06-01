import React from 'react'
import AboutContent from '../components/AboutContent'
import Layout from '../components/Layout'

export default function AboutPageTemplate() {
  return (
    <Layout>
      <header className="masthead"></header>
      <AboutContent />
    </Layout>
  )
}
