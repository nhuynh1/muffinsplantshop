/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Muffin's Plants`,
    description: `A demo e-commerce website built with Gatsby.js`,
    author: `nh_writes`,
  },
  mapping: {
    'MarkdownRemark.frontmatter.priceBySize.size': `SizesJson`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/products`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`300`, `400`, `500`]
          },
          {
            family: `Montserrat`,
            variants: [`400`, `500`]
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-remark-normalize-paths",
      options: {
          pathFields: ["imageAbs"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    `gatsby-plugin-react-helmet`,
  ],
}
