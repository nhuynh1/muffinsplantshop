import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../components/checkout-form/checkout-form';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

const Checkout = ({ location }) => {
    const promise = loadStripe('pk_test_51HZH64Ftxr5x8qZUweU2PctrS7eRgFIRYYMjnZsiRTDLwQqd8yJ2bZxbFnxv3lD2AvwPx6vvpZkXKxTbJhWsKJhv00MpHObXp8');

    return (
        <Layout location={location}>
            <SEO title="Checkout" />
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </Layout>
    );
}

export { Checkout as default };