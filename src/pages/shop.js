import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import Img from "gatsby-image";
import numeral from 'numeral';
import Layout from '../components/layout';
import Checkbox from '../components/checkbox';
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
            <h2>Plants for sale</h2>
            <div>
                {sizes.map(size => (
                    <Checkbox
                        key={size}
                        isSelected={sizesFilter.includes(size)}
                        onChangeHandler={handleUpdateSizesFilters}
                        label={size} />
                ))}
            </div>
            <div>
                {varieties.map(variety => (
                    <Checkbox
                        key={variety}
                        isSelected={varietiesFilter.includes(variety)}
                        onChangeHandler={handleUpdateVarietiesFilters}
                        label={variety} />
                ))}
            </div>
            {filteredProducts.map(({ node: product }) => {
                const minPrice = _minPrice(product.frontmatter.priceBySize);
                return (
                    <div key={product.id}>
                        <Link to={product.fields.slug}>
                            <Img
                                fixed={product.frontmatter.image.childImageSharp.fixed}
                                alt="" />
                            <p>{product.frontmatter.title}</p>
                        </Link>
                        <p>From {numeral(minPrice).format('$0,0.00')}</p>
                    </div>
                )
            })}
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
                    fixed {
                        ...GatsbyImageSharpFixed
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