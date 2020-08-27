import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import numeral from 'numeral';
import Img from "gatsby-image";
import Layout from '../components/layout/layout';
import { AddToCart } from '../components/shopping-cart/shopping-cart';
import styles from './products.module.css';

const Product = ({ data }) => {
    const productData = data.product.frontmatter;
    const productBody = data.product.html;
    const [priceSize, setSize] = useState(productData.priceBySize[0]);

    return (
        <Layout>
            <div className={styles.products__container}>
                
                <Img
                    fluid={productData.image.childImageSharp.fluid}
                    alt={productData.title}
                    style={{ border: `solid 1px #EEEEEE` }}
                />
                <h2 className={styles.products__title}>{productData.title}</h2>
                {/* fix dangerouslySetInnerHTML */}
                <p className={styles.products__descriptionBrief}>{productData.description}</p>
                <div dangerouslySetInnerHTML={{ __html: productBody }} />
                <span className={styles.products__sku}>SKU: {productData.sku}</span>
                <h3 className={styles.products__sizeHeading}>Size</h3>
                {
                    productData.priceBySize.map((priceSizeObj) => {
                        const { size: _size } = priceSizeObj;
                        return (
                            <span key={_size}>
                                <input
                                    className={styles.products__sizeOption}
                                    type="radio"
                                    name="size"
                                    value={_size}
                                    id={_size}
                                    checked={_size === priceSize.size}
                                    onChange={() => setSize({ ...priceSizeObj })} />
                                <label htmlFor={_size}>{_size}</label>
                            </span>
                        )
                    })
                }
                <p className={styles.products__price}>{numeral(priceSize.price).format('$0,0.00')}</p>
                <div className={styles.products__addToCartButtonWrapper}>
                    <AddToCart
                        title={productData.title}
                        price={priceSize.price}
                        sku={productData.sku}
                        size={priceSize.size}
                        imageSrc={productData.image.childImageSharp.fluid.src} />
                </div>
                <Link
                    className={styles.products__shopLink}
                    to="/shop">
                    See more plants
                </Link>
            </div>
            {productData.plantCare && (
                <div className={styles.products__care}>
                    <h2 className={styles.products__careHeading}>Plant Care</h2>
                    <h3 className={styles.products__careTypeHeading}>Light</h3>
                    {productData.plantCare.light}
                    <h3 className={styles.products__careTypeHeading}>Water</h3>
                    {productData.plantCare.water}

                </div>
            )}
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
                        fluid(fit: COVER, maxWidth: 358, maxHeight: 488, cropFocus: CENTER) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                plantCare {
                    light
                    water
                }
            }
        }
    }    
`

export { query, Product as default };