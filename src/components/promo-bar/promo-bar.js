import React from 'react';
import styles from './promo-bar.module.css';

const PromoBar = () => {
    return (
        <div className={styles.promobar}>
            <p className={styles.promobar__text}>Free delivery in Downtown Ottawa</p>
        </div>
    )
}

export { PromoBar as default };