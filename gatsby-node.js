const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark' && node.frontmatter.contentType === 'product') {
        const slug = createFilePath({ node, getNode, basePath: `products` });
        createNodeField({
            node,
            name: `slug`,
            value: `/plants${slug}`,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
    query {
        allMarkdownRemark (filter: {frontmatter: {contentType: {eq: "product"}}}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/product.js`),
            context: {
                slug: node.fields.slug
            }
        })
    })
}