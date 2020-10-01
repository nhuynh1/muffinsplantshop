import React from 'react';
import Layout from '../components/layout/layout';
import CheckoutForm from '../components/checkout-form/checkout-form';

const Checkout = ({ location }) => {
    return (
        <Layout location={location}>
            <CheckoutForm />
        </Layout>
    );
}

export { Checkout as default };