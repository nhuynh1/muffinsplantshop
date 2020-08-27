import React from 'react';
import { Cart } from '../components/shopping-cart/shopping-cart';

const CartPage = () => {
    return (
        <div className="content-container" id="cart">
            <Cart />
        </div>

    )
}

export { CartPage as default };