import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout/layout';
import ProductItem from '../components/product-item/product-item';
import styles from './styles/home.module.css';
import { minPrice as _minPrice } from '../helpers/helpers';

const Home = ({ data }) => {
    return (
        <Layout>
            <div className={styles.home__cta}>
                <Link
                    className={styles.home__ctaButton}
                    to="/shop">
                    Shop Plants
                </Link>
            </div>
            <div className="content-container">
                <h2 className="heading-first">Easy to grow</h2>
                <div className={styles.home__contentGrid}>
                    {data.allMarkdownRemark.edges.map(({ node }) => {
                        return (
                            <ProductItem 
                                key={node.id}
                                product={{
                                    slug: node.fields.slug,
                                    fluid: node.frontmatter.imageAbs.childImageSharp.fluid,
                                    title: node.frontmatter.title,
                                    minPrice: _minPrice(node.frontmatter.priceBySize)
                            }} />
                        )
                    })}
                </div>
            </div>
            <div className="content-container">
                <h2 className="heading-first">Muffins?</h2>
                <p>No muffins are available for purchase, but we certainly like to eat muffins here. We deliver plants in the Greater Ottawa Area</p>
            </div>

        </Layout>
    )
}

const query = graphql`
  query {
  allMarkdownRemark(filter: {frontmatter: {feature: {eq: "Easy to grow"}}}, sort: {order: ASC, fields: frontmatter___title}) {
    edges {
      node {
        frontmatter {
            title
            sku
            feature
            imageAbs {
                childImageSharp {
                    fluid(fit: COVER, maxWidth: 358, maxHeight: 488, cropFocus: CENTER) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            priceBySize {
                price
            }
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

export { query, Home as default }
