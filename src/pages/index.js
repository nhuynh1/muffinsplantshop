import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

const Home = ({ data }) => {
  return (
    <Layout>
      <Link 
        className="Home__shop-button"
        to="/shop">
        Shop Plants
      </Link>
      <h2>Easy to grow</h2>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <p>{node.frontmatter.title}</p>
            </Link>
          </div>
        )
      })}
      <h2>Muffins?</h2>
      <p>No muffins are available for purchase, but we certainly like to eat muffins here. We deliver plants in the Greater Ottawa Area</p>
    </Layout>
  )
}

const query = graphql`
  query {
  allMarkdownRemark(filter: {frontmatter: {feature: {eq: "Easy to grow"}}}) {
    edges {
      node {
        frontmatter {
          title
          sku
          feature
        }
        id
        fields {
          slug
        }
        html
      }
    }
  }
}
`

export { query, Home as default }
