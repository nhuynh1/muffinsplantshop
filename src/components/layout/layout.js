import React, { useState } from 'react';
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

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    return (
        <div className={styles.layout}>
            <PromoBar />
            <header className={styles.layout__header}>
                <div style={{ display: `flex` }}>
                    <button
                        aria-label="Toggle navigation menu"
                        className={styles.layout__menuButton}
                        onClick={() => setIsOpenMenu(!isOpenMenu)}>
                    </button>
                    <Link to="/"><h1 className={styles.layout__headerText}>{data.site.siteMetadata.title}</h1></Link>
                </div>

                <CartButton />
            </header>
            {isOpenMenu &&
                <div>
                    <ul className={styles.layout__navigationMenu}>
                        <li><Link className={styles.layout__navigationMenuItem} to="/shop">Shop</Link></li>
                        <li><Link className={styles.layout__navigationMenuItem} to="/about">About</Link></li>
                    </ul>
                </div>}
            {children}
            <footer className={styles.layout__footer}>
                <div className={styles.layout__footerLinks}>
                    <Link className={styles.layout__footerLink} to="/delivery-info">Delivery Info</Link>
                    <Link className={styles.layout__footerLink} to="/about">About</Link>
                    <a
                        className={styles.layout__footerSocialIcons}
                        href="https://instagram.com">
                        <span className="screen-reader-only">Instagram</span>
                    </a>
                </div>
                <p>{data.site.siteMetadata.title} {(new Date()).getFullYear()}</p>
            </footer>
        </div>
    );
}

export { Layout as default };