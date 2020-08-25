const productSelector = (products, { sizesFilter }) => {
    if (sizesFilter.length === 0) return products;

    return products.filter(({ node: product }) => {
        if (product.frontmatter.sizes) {
            return product.frontmatter.sizes.some(size => {
                return sizesFilter.includes(size);
            })
        } else {
            return false;
        }
    })
}

export { productSelector as default };