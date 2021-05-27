
import React from 'react'
import TextPrimaryContentSection from './sections/TextPrimaryContentSection'

interface AboutContentProps {
  title: string
  html: string
  image: any
}

const AboutContent = ({ html, title, image }: AboutContentProps) => {
  return (
    <TextPrimaryContentSection
      title={title}
      image={image}
      html={html}
      primaryColumnWidth={6}
      secondaryColumnWidth={6}
    />
  )
}

export default AboutContent
