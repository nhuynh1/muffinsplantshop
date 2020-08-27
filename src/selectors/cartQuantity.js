const cartQuantityTotal = (cart) => {
    return cart.reduce((totalQuantity, product) => {
        return totalQuantity + parseInt(product.quantity, 10);
    }, 0)
}

const cartAmountTotal = (cart) => {
    return cart.reduce((totalAmount, product) => {
        return totalAmount + (parseFloat(product.price) * parseInt(product.quantity, 10));
    }, 0.00)
}

export { cartQuantityTotal, cartAmountTotal };