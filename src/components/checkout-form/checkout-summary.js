import React, { useState } from 'react';
import numeral from 'numeral';
import { useCartContext } from '../../../wrap-with-provider';
import { cartQuantityTotal, cartAmountTotal } from '../../selectors/cartQuantity';

import styles from './checkout-summary.module.css';

const CheckoutSummary = ({ shippingValues }) => {
    const tempShippingDict = {
        "Standard": 10.00,
        "Express": 17.00
    }

    const { cart } = useCartContext();
    const [showItems, setShowItems] = useState(false);

    const cartSummary = {
        quantity: cartQuantityTotal(cart),
        subtotal: cartAmountTotal(cart),
        shipping: shippingValues ? tempShippingDict[shippingValues.shipping] : 0,
        tax: shippingValues ? (cartAmountTotal(cart) + tempShippingDict[shippingValues.shipping]) * 0.13 : 0,
        total: shippingValues ? (cartAmountTotal(cart) + tempShippingDict[shippingValues.shipping]) * 1.13 : cartAmountTotal(cart)
    }

    const cartQuantityFormatted = `${cartSummary.quantity} item${cartSummary.quantity > 1 ? 's' : ''}`;
    const cartTotalFormatted = numeral(cartSummary.total).format('$0,0.00');

    const summaryText = `${cartQuantityFormatted} ${!showItems ? (`${cartTotalFormatted} ${!shippingValues ? '+ tax and shipping' : ''}`) : ''}`

    return (
        <div style={{ padding: `0 1rem`, width: `100%` }}>
            <h2 className="heading-first">Checkout</h2>
            <div className={styles.cart__summary}>
                <button
                    className={showItems ? styles.open : ''}
                    onClick={() => setShowItems(!showItems)}
                    type="button">
                        &#9654;
                </button>
                <p>{summaryText}</p>
            </div>

            {showItems && (
                <div className={styles.products}>
                    {cart.map(product => (
                        <div key={product.sku} className={styles.product}>
                            <img
                                alt=""
                                className={styles.product__image}
                                src={product.imageSrc} />
                            <div className={styles.product__details}>
                                <p>{product.title} - {product.size}</p>
                                <p className={styles.product__quantity}>Qty: {product.quantity}</p>
                                <p className={styles.product__price}>{numeral(product.price).format('$0,0.00')}</p>
                            </div>
                        </div>
                    ))}
                    <div className={styles.order__summary__top}>
                        <p className={styles.order__summary}>
                            <span>Subtotal</span>
                            <span>{numeral(cartSummary.subtotal).format('$0,0.00')}</span>
                        </p>
                        <p className={styles.order__summary}>
                            <span>Shipping</span>
                            <span>{shippingValues ? numeral(cartSummary.shipping).format('$0,0.00') : '--'}</span></p>
                        <p className={styles.order__summary}>
                            <span>Taxes</span>
                            <span>{shippingValues ? numeral(cartSummary.tax).format('$0,0.00') : '--'}</span>
                        </p>
                    </div>

                    <p className={styles.order__summary}>{shippingValues ?
                        (<>
                            <span>Total</span>
                            <span>{cartTotalFormatted}</span>
                        </>) :
                        (<span className={styles.order__message}>Complete and submit shipping information for tax and shipping amounts</span>)}
                    </p>
                </div>)}
        </div>
    )
}

export { CheckoutSummary as default };