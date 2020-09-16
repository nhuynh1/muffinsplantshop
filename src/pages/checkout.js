import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
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
            <Link to="/">
                <h1 style={{
                    fontSize: `1.88rem`,
                    fontWeight: `300`,
                    margin: `0 0 0 1rem`,
                    padding: 0
                }}>
                    {data.site.siteMetadata.title}
                </h1>
            </Link>
            <CheckoutForm />
        </div>
    );
}

export { Checkout as default };