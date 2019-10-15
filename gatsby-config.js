module.exports = {
  siteMetadata: {
    title: "Addy Sheppard",
    author: "konsumer",
    authorLink: "https://github.com/konsumer",
    disqus: "gatsby-starter-blog" // put your disqus ID here
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/examples`,
        name: "examples"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-prismjs", "gatsby-remark-copy-linked-files"]
      }
    },
    {
      resolve: 'gatsby-transformer-remark-frontmatter',
      // default: { blacklist: [] }
      options: {
        // frontmatter fields to exclude, including all others
        blacklist: ['templateKey']
        // frontmatter fields to include, excluding all others
        // whitelist: ['markdownField']
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        includePaths: [`${__dirname}/node_modules`, `${__dirname}/src/`],
        precision: 8
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp"
  ]
};
