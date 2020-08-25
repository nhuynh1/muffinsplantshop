import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
// import ShopFilters from '../components/shop-filters';
import productSelector from '../selectors/products';

const Shop = ({ data }) => {
    const [sizesFilter, setSizesFilter] = useState([]);

    const handleUpdateSizesFilters = (e) => {
        if(e.target.checked) {
            setSizesFilter([...sizesFilter, e.target.id])
        } else {
            setSizesFilter(sizesFilter.filter(size => e.target.id !== size))
        }
    }

    const filteredProducts = productSelector(
        data.allMarkdownRemark.edges,
        { sizesFilter }
    );

    return (
        <Layout>
            <h2>Plants for sale</h2>
            {/* <ShopFilters updateFilters={handleUpdateFilters} /> */}
            <div>
                <input 
                    type="checkbox" 
                    id="Small"
                    checked={sizesFilter.includes("Small")}
                    onChange={handleUpdateSizesFilters} />
                <label htmlFor="Small">Small</label>
                <input 
                    type="checkbox" 
                    id="Mini" 
                    checked={sizesFilter.includes("Mini")}
                    onChange={handleUpdateSizesFilters} />
                <label htmlFor="Mini">Mini</label>
            </div>
            {filteredProducts.map(({ node }) => {
                return (
                    <div key={node.id}>
                        <Link to={node.fields.slug}>
                            <p>{node.frontmatter.title}</p>
                        </Link>
                        <p>{node.frontmatter.price}</p>
                    </div>
                )
            })}
        </Layout>
    )
}

const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            price
            description
            sizes
          }
          id
          fields {
            slug
          }
        }
      }
    }
  }
`

export { query, Shop as default }