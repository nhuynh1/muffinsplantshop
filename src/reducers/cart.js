const sku = ({ sku, size }) => `${sku}-${size}`

const updateQuantity = (state, sku, quantity) => {
    return state.map(product => {
        if (product.sku === sku) {
            return { ...product, quantity: quantity };
        } else {
            return product;
        }
    });
}
const addProduct = (state, product) => {
    const foundProduct = state.find(_product => _product.sku === sku(product));

    if (foundProduct) {
        const quantity = parseInt(foundProduct.quantity, 10) + 1;
        return updateQuantity(state, sku(product), quantity)
    } else {
        const productData = { ...product, sku: sku(product) }
        return [...state, productData];
    }
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return addProduct(state, action.product);
        case 'UPDATE_QUANTITY':
            const { sku, quantity } = action;
            return updateQuantity(state, sku, quantity);
        case 'REMOVE_FROM_CART':
            return state.filter(product => product.sku !== action.sku);
        case 'CLEAR_CART':
            return [];
        case 'SET_CART':
            return action.cart;
        default:
            return state;
    }
}

export { cartReducer as default };