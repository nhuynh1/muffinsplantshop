const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/inventory.json');
const shippingInventory = require('./data/shipping.json');
const taxrates = require('./data/taxrates.json');

const calculateOrderAmount = (items, shipping, state) => {
    const totalAmount = items.reduce((total, item) => {
        // get price against inventory
        const product = inventory.find((inventory_item) => inventory_item.sku === item.sku.split("-")[0]);
        const amount = product.priceBySize.find((productSize) => productSize.size === item.size).price;
        return total + (100 * amount * item.quantity)
    }, 0);

    // get shipping price against inventory
    const shippingAmount = 100 * shippingInventory.find((ship_method) => ship_method.shipping_method === shipping).shipping_amount

    // get tax rate
    const taxAmount = taxrates.find((tax) => tax.state === state).total_tax_rate

    return Math.round((totalAmount + shippingAmount) * (taxAmount + 1));
}

exports.handler = async function (event) {
    const { items, shipping, state } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items, shipping, state),
        currency: "CAD"
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            clientSecret: paymentIntent.client_secret
        })
    };
}