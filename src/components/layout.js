import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Cart, CartButton } from '../components/shopping-cart';
import PromoBar from '../components/promo-bar';

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
            <header>
                <Link to="/"><h1>{data.site.siteMetadata.title}</h1></Link>
                <CartButton />
            </header>
            {children}
            <div style={{ position: `fixed`, top: 0, right: 0 }}>
                <Cart />
            </div>
            <footer>
                <span>{data.site.siteMetadata.title} {(new Date()).getFullYear()}</span>
            </footer>
        </div>
    );
}

export { Layout as default };