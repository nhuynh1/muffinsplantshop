import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { CartContext } from '../../../wrap-with-provider';
import cartQuantityTotal from '../../selectors/cartQuantity';
import styles from './shopping-cart.module.css';

const AddToCart = ({ title, price, sku, size, notificationNode }) => {
    const { cartDispatch } = useContext(CartContext);

    const add = () => {
        cartDispatch({
            type: 'ADD_TO_CART',
            product: { title, price, sku, size, quantity: 1 }
        });
        notificationNode.textContent = `${title} - ${size} added to cart`;
        setTimeout(() => {
            notificationNode.textContent = '';
        }, 5000);
    }
    return (
        <button
            className={styles.shoppingCart__addToCartButton}
            onClick={add}>
            Add to cart
        </button>
    )
}

const Cart = () => {
    const { cart, cartDispatch } = useContext(CartContext);
    const handleUpdateQuantity = (sku) => (e) => {
        cartDispatch({
            type: 'UPDATE_QUANTITY',
            sku,
            quantity: e.target.value
        })
    }
    const handleDeleteProduct = (sku) => () => {
        cartDispatch({
            type: 'REMOVE_FROM_CART',
            sku
        })
    }
    return (
        <div>
            {cart.map((plant, index) => {
                return (
                    <div key={index}>
                        <p>
                            <span>{plant.title}</span>-<span>{plant.size}</span> <span>{plant.price}</span>
                        </p>
                        <input
                            type="number"
                            value={plant.quantity}
                            onChange={handleUpdateQuantity(plant.sku)} />
                        <button
                            type="button"
                            onClick={handleDeleteProduct(plant.sku)}>
                            X
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

const CartButton = () => {
    const { cart } = useContext(CartContext);
    return (
        <Link
            className={styles.shoppingCart__cartButton}
            to="/cart">
            Cart ({cartQuantityTotal(cart)})
        </Link>
    )
}

export { AddToCart, Cart, CartButton };