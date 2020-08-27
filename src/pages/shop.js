import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout/layout';
import Checkbox from '../components/checkbox';
import ProductItem from '../components/product-item/product-item';
import productSelector from '../selectors/products';
import { minPrice as _minPrice } from '../helpers/helpers';

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
            <div className="content-container">
                <h2 className="heading-first">Shop</h2>
                <p>Filter by</p>
                <div className="filterTabs" style={{margin: `1rem 0`}}>
                    <div role="tablist" aria-label="Product Filters">
                        <button
                            role="tab"
                            aria-selected="true"
                            aria-controls="variety-tab"
                            id="variety">
                            Variety
                        </button>
                        <button
                            role="tab"
                            aria-selected="false"
                            aria-controls="size-tab"
                            id="size">
                            Size
                        </button>
                    </div>
                    <div
                        role="tabpanel"
                        id="variety-tab"
                        aria-labelledby="variety">
                        {varieties.map(variety => (
                            <Checkbox
                                key={variety}
                                isSelected={varietiesFilter.includes(variety)}
                                onChangeHandler={handleUpdateVarietiesFilters}
                                label={variety} />
                        ))}
                    </div>
                    <div
                        role="tabpanel"
                        id="size-tab"
                        aria-labelledby="size"
                        hidden="">
                        {sizes.map(size => (
                            <Checkbox
                                key={size}
                                isSelected={sizesFilter.includes(size)}
                                onChangeHandler={handleUpdateSizesFilters}
                                label={size} />
                        ))}
                    </div>
                </div>

                <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr`, gridGap: `1rem` }}>
                    {filteredProducts.map(({ node: product }) => {
                        return (
                            <ProductItem
                                key={product.id}
                                product={{
                                    slug: product.fields.slug,
                                    fluid: product.frontmatter.image.childImageSharp.fluid,
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
    sizes: allMarkdownRemark {
        group(field: frontmatter___priceBySize___size) {
            size: fieldValue
        }
    }
    varieties: allMarkdownRemark {
        group(field: frontmatter___variety) {
          variety: fieldValue
        }
    }
    products: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            description
            priceBySize {
                price
                size
              }
              image {
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