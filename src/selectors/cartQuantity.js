const cartQuantityTotal = (cart) => {
    return cart.reduce((totalQuantity, product) => {
        return totalQuantity + parseInt(product.quantity, 10);
    }, 0)
}

export { cartQuantityTotal as default };