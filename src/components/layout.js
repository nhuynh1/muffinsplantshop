import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Cart, CartButton } from '../components/shopping-cart';
import PromoBar from './promo-bar/promo-bar';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }  
    `)

    return (
        <div style={{ margin: `0 auto`, width: `100%`, maxWidth: `600px` }}>
            <PromoBar />
            <header style={{display: `flex`, alignItems: `center`}}>
                <Link to="/"><h1>{data.site.siteMetadata.title}</h1></Link>
                <CartButton />
            </header>
            {children}
            <div style={{ position: `fixed`, top: 0, right: 0 }}>
                <Cart />
            </div>
            <footer style={{textAlign: `center`}}>
                <div style={{margin: `1rem`, border: `solid 1px #E4E4E4`, borderRight: 0, borderLeft: 0}}>
                    <Link to="/delivery-info">Delivery Info</Link>
                    <Link to="/about">About</Link>
                </div>
                <p>{data.site.siteMetadata.title} {(new Date()).getFullYear()}</p>
            </footer>
        </div>
    );
}

export { Layout as default };