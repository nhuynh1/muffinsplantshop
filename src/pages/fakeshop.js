import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFormFake from '../components/checkout-form-fake';

const Fakeshop = () => {

    const promise = loadStripe('pk_test_51HZH64Ftxr5x8qZUweU2PctrS7eRgFIRYYMjnZsiRTDLwQqd8yJ2bZxbFnxv3lD2AvwPx6vvpZkXKxTbJhWsKJhv00MpHObXp8')

    return (
        <div>
            <h1>Fakeshop</h1>
            <Elements stripe={promise}>
                <CheckoutFormFake />
            </Elements>
        </div>
    )
}

export { Fakeshop as default } 