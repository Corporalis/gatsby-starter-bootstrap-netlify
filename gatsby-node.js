const path = require('path')

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: {
          parent: { internal: { type: { ne: "FrontmatterMarkdownFile" } } }
          frontmatter: { hidden: { ne: true } }
        }
      ) {
        edges {
          node {
            frontmatter {
              contentType
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.contentType)}.tsx`
        ),
        context: {}, // additional data can be passed via context
      })
    })
  })
}
