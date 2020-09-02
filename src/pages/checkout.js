import React from 'react';
import { useStaticQuery } from 'gatsby';
import CheckoutForm from '../components/checkout-form/checkout-form';

const Checkout = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }  
    `);

    return (
        <div>
            <h1>{data.site.siteMetadata.title}</h1>
            <CheckoutForm />
        </div>
    );
}

export { Checkout as default };