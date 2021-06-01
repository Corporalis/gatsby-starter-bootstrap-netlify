export interface StaticQuery<TFrontmatter> {
  markdownRemark: {
    html: string
    frontmatter: TFrontmatter
  }
}
