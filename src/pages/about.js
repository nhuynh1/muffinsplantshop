import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';

const About = ({ data }) => {
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

export { query, About as default }