import React from 'react'
import Layout from '../components/layout/layout';

const DeliveryInfo = ({ data }) => {
    return (
        <Layout>
            <div
                className="content-container"
                dangerouslySetInnerHTML={{ __html: data.pages.edges[0].node.html }} />
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