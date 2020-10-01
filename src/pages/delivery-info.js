import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

const DeliveryInfo = ({ data, location }) => {
  
  return (
    <Layout location={location}>
      <SEO title="Delivery Information" />
      <div style={{ display: `flex`, flexDirection: `column`, height: `50vh`, padding: `1rem` }}>
        <div style={{ flex: `1` }}>
          <div
            className="content-container"
            dangerouslySetInnerHTML={{ __html: data.pages.edges[0].node.html }} />
        </div>
      </div>
    </Layout>
  )
}

const query = graphql`
query {
    pages: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "page"}, page: {eq: "about"}}}) {
      edges {
        node {
          html
        }
      }
    }
  }
`

export { query, DeliveryInfo as default };