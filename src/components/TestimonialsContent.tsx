import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import media from 'styled-media-query'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { StaticQueryAll } from '../models/StaticQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

interface AboutContentFrontmatter {
  business: string
  person: string
}

interface TestimonialContentStaticQuery
  extends StaticQueryAll<AboutContentFrontmatter> {}

const TestimonialsContent = () => {
  const formatMetadata = (metaData: AboutContentFrontmatter): string => {
    const items = [metaData.person, metaData.business]
    const filteredItems = items.filter((item) => !!item)
    return filteredItems.join(', ')
  }

  const { allMarkdownRemark } = useStaticQuery<TestimonialContentStaticQuery>(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { path: { eq: "/testimonials" } } }
        ) {
          nodes {
            html
            fields {
              slug
            }
            frontmatter {
              business
              person
            }
          }
        }
      }
    `
  )

  const { nodes: testimonials } = allMarkdownRemark

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2 className="text-center mt-0">Testimonials</h2>
          <hr className="divider my-4"></hr>
        </Col>
        <Col lg="12">
          <SwiperContainer>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {testimonials.map((testimonial, index) => {
                return (
                  <SwiperSlide key={`slide-${index}`}>
                    <Quote>
                      <QuoteText
                        dangerouslySetInnerHTML={{ __html: testimonial.html }}
                      ></QuoteText>
                      <QuoteMetadataContainer>
                        <Empty />
                        <QuoteMetadata>
                          {formatMetadata(testimonial.frontmatter)}
                        </QuoteMetadata>
                      </QuoteMetadataContainer>
                    </Quote>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </SwiperContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default TestimonialsContent

const Quote = styled(Card)`
  font-size: 0.9rem;
  width: 75%;
  margin: 0 auto 2em auto;
  min-height: 20rem;
  padding: 0 8rem 8rem 8rem;
  border-radius: 10rem;
  ::before {
    content: '\\275D';
    font-size: 8rem;
    ${media.lessThan('medium')`
      font-size: 4rem;
    `}
  }
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.highlight.text};
  ${media.lessThan('medium')`
    padding: 2rem 4rem 4rem 4rem;
    width: 100%;
    border-radius: 5rem;
  `}
`

const QuoteText = styled.div`
  font-weight: 300;
  position: relative;
  top: -3rem;
  ${media.lessThan('medium')`
    top: -2rem;
  `}
`
const Empty = styled.div``

const QuoteMetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const QuoteMetadata = styled.span`
  font-weight: 700;
`

const SwiperContainer = styled.div`
  & .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.primary.main};

    ${media.lessThan('medium')`
      color: ${({ theme }) => theme.colors.highlight.text};
    `}
  }

  & .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.primary.main};
  }

  & .swiper-slide {
    display: flex;
    height: auto;
  }
`
