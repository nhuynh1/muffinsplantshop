import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from '../components/layout';
import { AddToCart } from '../components/shopping-cart';

const Product = ({ data }) => {
    const productData = data.product.frontmatter;
    const productBody = data.product.html;
    const [priceSize, setSize] = useState(productData.priceBySize[0]);
    return (
        <Layout>
            <div>
                <p>{productData.title}</p>
                <p>{productData.sku}</p>
                <Img fluid={productData.image.childImageSharp.fluid}
                    alt={productData.title}
                />
                {/* fix dangerouslySetInnerHTML */}
                <p>{productData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: productBody }} />
                {
                    productData.priceBySize.map((priceSizeObj) => {
                        const { size: _size } = priceSizeObj;
                        return (
                            <span key={_size}>
                                <input
                                    type="radio"
                                    name="size"
                                    value={_size}
                                    id={_size}
                                    checked={_size === priceSize.size}
                                    onChange={() => setSize({...priceSizeObj})} />
                                <label htmlFor={_size}>{_size}</label>
                            </span>
                        )
                    })
                }
                <p>{priceSize.price}</p>
            </div>
            <AddToCart
                title={productData.title}
                price={priceSize.price}
                sku={productData.sku}
                size={priceSize.size} />
        </Layout>
    )
}

// the $slug is the variable passed into the template via the context property from createPage function
const query = graphql`
    query($slug: String!) {
        product: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                description
                sku
                priceBySize {
                    price
                    size
                }
                image {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }    
`

export { query, Product as default };