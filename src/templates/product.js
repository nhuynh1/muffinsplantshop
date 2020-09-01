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
                    fluid={productData.imageAbs.childImageSharp.fluid}
                    alt={productData.title}
                    style={{ border: `solid 1px #EEEEEE` }}
                />
                <div>
                    <h2 className={styles.products__title}>{productData.title}</h2>
                    <p className={styles.products__descriptionBrief}>{productData.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: productBody }} />
                    <span className={styles.products__sku}>SKU: {productData.sku}</span>
                    <h3 className={styles.products__sizeHeading}>Size</h3>
                    {
                        productData.priceBySize.map((priceSizeObj) => {
                            const { size: _size } = priceSizeObj;
                            return (
                                <span key={_size.label}>
                                    <input
                                        className={styles.products__sizeOption}
                                        type="radio"
                                        name="size"
                                        value={_size.label}
                                        id={_size.label}
                                        checked={_size.label === priceSize.size.label}
                                        onChange={() => setSize({ ...priceSizeObj })} />
                                    <label htmlFor={_size.label}>
                                        <span className={styles.products__sizeLabel}>{_size.label}</span>
                                        <span className={styles.products__sizeDescription}>{_size.longDescription}</span>
                                    </label>
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
                            size={priceSize.size.label}
                            imageSrc={productData.imageAbs.childImageSharp.fluid.src} />
                    </div>
                    <Link
                        className="link-with-arrow"
                        to="/shop">
                        See more plants
                </Link>
                </div>
            </div>
            {productData.plantCare && (
                <div className={styles.products__care}>
                    <h2 className={styles.products__careHeading}>Plant Care</h2>
                    <div className={styles.products__careItem}>
                        <span className={styles.products__careIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="72" viewBox="0 0 24 24" width="72"><path d="M0 0h24v24H0z" fill="none" /><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" /></svg>
                        </span>
                        <div>
                            <h3 className={styles.products__careTypeHeading}>Light</h3>
                            <p>{productData.plantCare.light}</p>
                        </div>
                    </div>
                    <div className={styles.products__careItem}>
                        <span className={styles.products__careIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="72" viewBox="0 0 24 24" width="72"><path d="M0 0h24v24H0z" fill="none" /><path d="M10 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                        </span>
                        <div>
                            <h3 className={styles.products__careTypeHeading}>Water</h3>
                            <p>{productData.plantCare.water}</p>
                        </div>
                    </div>
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
                    size {
                        label
                        longDescription
                    }
                }
                imageAbs {
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