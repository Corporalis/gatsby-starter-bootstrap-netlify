import React from 'react'
import Layout from '../components/Layout'
import CoachingContent from '../components/sections/CoachingContent'

const CoachingPageTemplate = () => {
  return (
    <Layout>
      <header className="masthead"></header>
      <CoachingContent />
    </Layout>
  )
}

export default CoachingPageTemplate
