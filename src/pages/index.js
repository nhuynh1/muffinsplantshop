import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import ProductItem from '../components/product-item/product-item';
import styles from './styles/home.module.css';
import { minPrice as _minPrice } from '../helpers/helpers';

const Home = ({ data }) => {
    return (
        <Layout>
            <SEO title="Shop Demo" />
            <div className={styles.home__cta}>
                <div className={styles.home__ctaText}>
                    <h2>Plants Are Like Muffins</h2>
                    <p>But for your soul</p>
                </div>
                <Link
                    className={styles.home__ctaButton}
                    to="/shop">
                    Shop Plants
                </Link>
            </div>
            <div className="content-container">
                <h2 className="heading-first">Easy to grow</h2>
                <div className={styles.home__contentGrid}>
                    {data.products.edges.map(({ node }) => {
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
                <div className={styles.home__about}>
                    <div>
                        <h2 className="heading-first">Muffins?</h2>
                        <p>No muffins are available for purchase, but we certainly like to eat muffins here. We deliver plants in the Greater Ottawa Area</p>
                    </div>
                    <div className={styles.home__aboutAdditional}>
                        <h3>About Muffin's Plants</h3>
                        <div 
                            dangerouslySetInnerHTML={{__html: data.about.edges[0].node.html}} />
                    </div>
                </div>
            </div>

        </Layout>
    )
}

const query = graphql`
  query {
  products: allMarkdownRemark(filter: {frontmatter: {feature: {eq: "Easy to grow"}}}, sort: {order: ASC, fields: frontmatter___title}) {
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
  about: allMarkdownRemark(filter: {frontmatter: {contentType: {eq: "page"}, page: {eq: "about"}}}) {
    edges {
      node {
        html
      }
    }
  }
}
`

export { query, Home as default }
