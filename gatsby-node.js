const path = require('path')
const remark = require('remark')
const remarkHTML = require('remark-html')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
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
              person
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your data`, result.errors)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.contentType === 'testimonial') {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`src/templates/testimonial.tsx`),
        context: {},
      })

      return
    }
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.contentType)}.tsx`
      ),
      context: {},
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
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

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
