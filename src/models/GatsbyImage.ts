import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface GatsbyImageData {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}
