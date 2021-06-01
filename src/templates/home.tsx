import React from 'react'
import { Element } from 'react-scroll'
import Layout from '../components/Layout'
import HomeContent from '../components/HomeContent'
import CoachingContent from '../components/sections/CoachingContent'
import AboutContent from '../components/AboutContent'
import OfferingsContent from '../components/OfferingsContent'

export default function HomePageTemplate() {
  return (
    <Layout>
      <header className="masthead"></header>
      <HomeContent />
      <Element name="coaching">
        <CoachingContent />
      </Element>
      <Element name="offerings">
        <OfferingsContent />
      </Element>
      <Element name="about">
        <AboutContent />
      </Element>
    </Layout>
  )
}
