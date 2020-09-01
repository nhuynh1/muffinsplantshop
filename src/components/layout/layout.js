import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { CartButton, Cart } from '../shopping-cart/shopping-cart';
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
    const [isOpenCart, setIsOpenCart] = useState(false);
    
    useEffect(() => {
        if(isOpenCart){
            document.body.setAttribute('style', 'overflow-y:hidden; position: fixed; left: 0; right: 0');
        } else {
            document.body.setAttribute('style', '');
        }
    }, [isOpenCart])

    return (
        <div id="root" className={`${isOpenCart && styles.layout__cartOpen}`}>
            <PromoBar />
            <div className={styles.layout}>
                <header className={styles.layout__header}>
                    <div style={{ display: `flex` }}>
                        <button
                            aria-label="Toggle navigation menu"
                            className={styles.layout__menuButton}
                            onClick={() => setIsOpenMenu(!isOpenMenu)}>
                        </button>
                        <Link to="/">
                            <h1 className={styles.layout__headerText}>
                                {data.site.siteMetadata.title}
                            </h1>
                        </Link>
                    </div>

                    <CartButton toggleCart={() => setIsOpenCart(!isOpenCart)} />
                </header>
                <div 
                    className={`${styles.layout__navigationMenuWrapper} 
                    ${isOpenMenu && styles.layout__navigationOpen}`}>
                    <ul className={styles.layout__navigationMenu}>
                        <li><Link
                            activeClassName={styles.layout__activeLink}
                            className={styles.layout__navigationMenuItem}
                            to="/shop">Shop</Link></li>
                        <li><Link
                            activeClassName={styles.layout__activeLink}
                            className={styles.layout__navigationMenuItem}
                            to="/about">About</Link></li>
                    </ul>
                </div>
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
            {isOpenCart && (<div style={{ backgroundColor: `white`, position: `absolute`, top: 0, right: 0, width: `100%`, maxWidth: 400, height: `100vh`, boxShadow: `-4px 0px 2px 0px rgba(0,0,0, 0.12)` }}>
                <Cart toggleCart={() => setIsOpenCart(!isOpenCart)} />
            </div>)}
        </div>
    );
}

export { Layout as default };