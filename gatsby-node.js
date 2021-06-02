const path = require('path')
const remark = require('remark')
const remarkHTML = require('remark-html')

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
              personalBody
              groupBody
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

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  let bodyProperties = []
  for (const property in node.frontmatter) {
    if (property.endsWith('Body')) {
      bodyProperties.push(property)
    }
  }

  for (const property of bodyProperties) {
    const markdown = node.frontmatter[property]
    const value = remark().use(remarkHTML).processSync(markdown).toString()

    createNodeField({
      name: `${property}Html`,
      node,
      value,
    })
  }
}
