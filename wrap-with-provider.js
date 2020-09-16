import React, { useReducer, useEffect, useContext, useState } from 'react';
import CartReducer from './src/reducers/cart';

const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const cartFromStorage = typeof localStorage !== `undefined` ? 
                                localStorage.getItem('muffinPlantsCart') : null;
    const initialCartState = cartFromStorage ? JSON.parse(cartFromStorage) : [];
    const [cart, cartDispatch] = useReducer(CartReducer, initialCartState);
    const [isOpenCart, setIsOpenCart] = useState(false);

    useEffect(() => {
        localStorage.setItem('muffinPlantsCart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, cartDispatch, isOpenCart, setIsOpenCart }}>
            {children}
        </CartContext.Provider> 
    )
}

export const CartProviderWrapper = ({ element }) => (
    <CartProvider>
        {element}
    </CartProvider>
);

export default CartContext;