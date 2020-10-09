import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutFormFake = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("/.netlify/functions/stripe-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    items: [{ sku: "AV014-Small", quantity: 2, size: "Small" }],
                    shipping: `Standard`,
                    state: `ON`
                })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const handleCheckout = async (ev) => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    address: {
                        line1: `806-1815 Yonge Street`,
                        city: `Toronto`,
                        country: `CA`,
                        postal_code: `M4T 2A4`,
                        state: `ON`
                    }
                }
            },
            shipping: {
                name: `Nancy Huynh`,
                address: {
                    line1: `806-1815 Yonge Street`,
                    city: `Toronto`,
                    country: `CA`,
                    postal_code: `M4T 2A4`,
                    state: `ON`
                }
            },
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <form onSubmit={handleCheckout}>
            <CardElement id="card-element" onChange={handleChange} options={{ hidePostalCode: true }} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                            "Pay"
                        )}
                </span>
            </button>

            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
        <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
        </form>
    )
}

export { CheckoutFormFake as default };