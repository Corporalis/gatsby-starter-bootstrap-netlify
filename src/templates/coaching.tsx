import React from 'react'
import Layout from '../components/Layout'
import CoachingContent from '../components/sections/CoachingContent'

export default function CoachingPageTemplate() {
  return (
    <Layout>
      <header className="masthead"></header>
      <CoachingContent />
    </Layout>
  )
}
