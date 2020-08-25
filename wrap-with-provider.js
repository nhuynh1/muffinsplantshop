import React, { useReducer, useEffect } from 'react';
import CartReducer from './src/reducers/cart';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cart, cartDispatch] = useReducer(CartReducer, []);

    useEffect(() => {
        const cart = localStorage.getItem('muffinPlantsCart');
        if (cart) {
            cartDispatch({
                type: 'SET_CART',
                cart: JSON.parse(cart)
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('muffinPlantsCart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, cartDispatch }}>
            {children}
        </CartContext.Provider> 
    )
}

export default ({ element }) => (
    <CartProvider>
        {element}
    </CartProvider>
);