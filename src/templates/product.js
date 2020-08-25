import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from '../components/layout';
import { AddToCart } from '../components/shopping-cart';

const Product = ({ data }) => {
    const productData = data.markdownRemark.frontmatter;
    const productBody = data.markdownRemark.html;
    const [size, setSize] = useState(productData.sizes[0]);
    return (
        <Layout>
            <div>
                <p>{productData.title}</p>
                <p>{productData.sku}</p>
                <Img fluid={data.file.childImageSharp.fluid}
                    alt="Jade plant"
                />
                {/* fix dangerouslySetInnerHTML */}
                <p>{productData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: productBody }} />
                {
                    productData.sizes.map((_size) => (
                        <span key={_size}>
                            <input 
                                type="radio" 
                                name="size" 
                                value={_size} 
                                id={_size}
                                checked={_size === size}
                                onChange={(e) => setSize(e.target.value)} />
                            <label htmlFor={_size}>{_size}</label>
                        </span>
                    ))
                }
                <p>{productData.price}</p>
            </div>
            <AddToCart
                title={productData.title}
                price={productData.price}
                sku={productData.sku} 
                size={size}/>
        </Layout>
    )
}

// the $slug is the variable passed into the template via the context property from createPage function
const query = graphql`
    query($slug: String!, $image: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                price
                description
                sizes
                sku
            }
        }
        file(relativePath: {eq: $image}) {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
        }
    }    
`

export { query, Product as default };