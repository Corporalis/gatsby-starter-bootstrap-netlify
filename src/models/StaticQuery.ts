export interface StaticQuery<TFrontmatter> {
  markdownRemark: {
    html: string
    frontmatter: TFrontmatter
  }
}

export interface StaticQueryWithFields<TFrontmatter, TFields>
  extends StaticQuery<TFrontmatter> {
  markdownRemark: {
    html: string
    frontmatter: TFrontmatter
    fields: TFields
  }
}

export interface StaticQueryAll<TFrontmatter> {
  allMarkdownRemark: {
    nodes: [
      {
        html: string
        frontmatter: TFrontmatter
      }
    ]
  }
}
