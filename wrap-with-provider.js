import React, { useReducer, useEffect } from 'react';
import CartReducer from './src/reducers/cart';

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const cartFromStorage = typeof localStorage !== `undefined` ? 
                                localStorage.getItem('muffinPlantsCart') : null;
    const initialCartState = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const [cart, cartDispatch] = useReducer(CartReducer, initialCartState);

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