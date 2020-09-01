import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Checkbox from '../components/checkbox/checkbox';
import ProductItem from '../components/product-item/product-item';
import productSelector from '../selectors/products';
import { minPrice as _minPrice } from '../helpers/helpers';
import styles from './styles/shop.module.css';
import '../styles/react-tabs-custom.css';

const Shop = ({ data }) => {
    const [sizesFilter, setSizesFilter] = useState([]);
    const [varietiesFilter, setVarietiesFilter] = useState([]);
    const filteredProducts = productSelector(data.products.edges, { sizesFilter, varietiesFilter });
    const sizes = data.sizes.group.map(({ size }) => size);
    const varieties = data.varieties.group.map(({ variety }) => variety);

    const handleUpdateSizesFilters = (e) => {
        if (e.target.checked) {
            setSizesFilter([...sizesFilter, e.target.id])
        } else {
            setSizesFilter(sizesFilter.filter(size => e.target.id !== size))
        }
    }

    const handleUpdateVarietiesFilters = (e) => {
        if (e.target.checked) {
            setVarietiesFilter([...varietiesFilter, e.target.id])
        } else {
            setVarietiesFilter(varietiesFilter.filter(variety => e.target.id !== variety))
        }
    }

    return (
        <Layout>
            <SEO title="Shop" />
            <div className="content-container">
                <h2 className="heading-first">Shop</h2>
            </div>
            <div style={{ marginBottom: `2rem`, backgroundColor: `#F8F8F7`, padding: `1rem` }}>
                <h3 className="heading-third">Filter by</h3>
                <Tabs>
                    <TabList>
                        <Tab>Variety</Tab>
                        <Tab>Size</Tab>
                    </TabList>
                    <TabPanel>
                        {varieties.map(variety => (
                            <Checkbox
                                key={variety}
                                isSelected={varietiesFilter.includes(variety)}
                                onChangeHandler={handleUpdateVarietiesFilters}
                                label={variety} />
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {sizes.map(size => (
                            <Checkbox
                                key={size}
                                isSelected={sizesFilter.includes(size)}
                                onChangeHandler={handleUpdateSizesFilters}
                                label={size} />
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
            <div className="content-container">
                <div className={styles.shop__productGrid}>
                    {filteredProducts.map(({ node: product }) => {
                        return (
                            <ProductItem
                                key={product.id}
                                product={{
                                    slug: product.fields.slug,
                                    fluid: product.frontmatter.imageAbs.childImageSharp.fluid,
                                    title: product.frontmatter.title,
                                    minPrice: _minPrice(product.frontmatter.priceBySize)
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

const query = graphql`
  query {
    sizes: allMarkdownRemark (filter: {frontmatter: {contentType: {eq: "product"}}}) {
        group(field: frontmatter___priceBySize___size___label) {
          size: fieldValue
        }
    }
    varieties: allMarkdownRemark (filter: {frontmatter: {contentType: {eq: "product"}}}) {
        group(field: frontmatter___variety) {
          variety: fieldValue
        }
    }
    products: allMarkdownRemark (filter: {frontmatter: {contentType: {eq: "product"}}}, sort: {order: ASC, fields: frontmatter___title}) {
      edges {
        node {
          frontmatter {
            title
            description
            priceBySize {
                price
                size {
                    label
                }
              }
              imageAbs {
                childImageSharp {
                    fluid(fit: COVER, maxWidth: 358, maxHeight: 488, cropFocus: CENTER) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            variety
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