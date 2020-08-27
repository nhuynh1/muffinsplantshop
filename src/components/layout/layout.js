import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { CartButton } from '../shopping-cart/shopping-cart';
import PromoBar from '../promo-bar/promo-bar';
import styles from './layout.module.css';

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
        <div className={styles.layout}>
            <PromoBar />
            <header className={styles.layout__header}>
                <Link to="/"><h1 className={styles.layout__headerText}>{data.site.siteMetadata.title}</h1></Link>
                <CartButton />
            </header>
            {children}
            <footer className={styles.layout__footer}>
                <div className={styles.layout__footerLinks}>
                    <Link className={styles.layout__footerLink} to="/delivery-info">Delivery Info</Link>
                    <Link className={styles.layout__footerLink} to="/about">About</Link>
                </div>
                <p>{data.site.siteMetadata.title} {(new Date()).getFullYear()}</p>
            </footer>
        </div>
    );
}

export { Layout as default };