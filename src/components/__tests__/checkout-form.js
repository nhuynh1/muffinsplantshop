import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import CheckoutForm, { ShippingForm, BillingForm } from '../checkout-form/checkout-form';
import * as CartContext from "../../../wrap-with-provider";

const shippingValues = {
    firstName: "Jonny",
    lastName: "Apples",
    addressOne: "123 Main Street",
    municipality: "Ottawa",
    provinceTerritory: "ON",
    postalCode: "K0A 2X0",
    phone: "613-451-5555",
    email: "jonny@apple.com",
    shipping: "standard"
}

const billingValues = {
    firstName: "Patty",
    lastName: "Pears",
    addressOne: "2 First Street",
    municipality: "Montreal",
    provinceTerritory: "QC",
    postalCode: "H1A 0A1"
}

afterEach(cleanup);

test('CheckoutForm renders with cart details', () => {
    const contextValues = {
        cart: [
            {
                imageSrc: "/static/4a071d17483769601ea975428d95ed64/5372b/hedgehog-cactus.jpg",
                price: 12.95,
                quantity: 1,
                size: "Medium",
                sku: "HC059-Medium",
                title: "Hedgehog Cactus"
            }
        ]
    };
    jest.spyOn(CartContext, 'useCartContext')
        .mockImplementation(() => contextValues);
    const { container } = render(<CheckoutForm />);
    expect(container.firstChild).toMatchSnapshot();
    expect(screen.getByText("1 item $12.95 + tax and shipping")).toBeInTheDocument();
});

test('ShippingForm renders properly', () => {
    const { container } = render(<ShippingForm />);
    expect(container.firstChild).toMatchSnapshot();
})

test('BillingForm renders properly', () => {
    const { container } = render(<BillingForm />);
    expect(container.firstChild).toMatchSnapshot();
})

test('Updates current section and values when submitting valid data with ShippingForm', async () => {
    const setValues = jest.fn();
    const setSection = jest.fn();
    render(<ShippingForm
        setValues={setValues}
        setSection={setSection}
        shippingValues={shippingValues} />);

    fireEvent.click(screen.getByTestId("submit-shipping-button"));

    await waitFor(() => {
        expect(setSection).toHaveBeenCalledWith('billing');
        expect(setValues).toHaveBeenCalledWith(shippingValues);
    });
})

describe('Shows shipping and billing details with valid form submission', () => {
    test('where shipping and billing details are the same', async () => {
        render(<CheckoutForm />);

        fireEvent.change(screen.getByLabelText(/first/i), { target: { value: shippingValues.firstName } });
        fireEvent.change(screen.getByLabelText(/last/i), { target: { value: shippingValues.lastName } });
        fireEvent.change(screen.getByLabelText(/address.+(1|one)/i), { target: { value: shippingValues.addressOne } });
        fireEvent.change(screen.getByLabelText(/municipality/i), { target: { value: shippingValues.municipality } });
        fireEvent.change(screen.getByLabelText(/province/i), { target: { value: shippingValues.provinceTerritory } });
        fireEvent.change(screen.getByLabelText(/code/i), { target: { value: shippingValues.postalCode } });
        fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: shippingValues.phone } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: shippingValues.email } });

        await waitFor(() => {
            const submit = screen.getByTestId("submit-shipping-button");
            fireEvent.click(submit);
        })

        Object.entries(shippingValues).forEach(([key, value]) => {
            const regex = new RegExp(value);
            if(['email', 'shipping', 'phone'].includes(key)) {
                expect(screen.queryByText(regex)).toBeInTheDocument();
            } else {
                expect(screen.getAllByText(regex).length).toEqual(2);
            }
        });

        await waitFor(() => {
            const submit = screen.getByTestId("submit-billing-button");
            fireEvent.click(submit);
        })

        expect(screen.queryByText("Payment is not available in this demo")).toBeInTheDocument();
    })

    test('where shipping and billing details are different', async () => {
        render(<CheckoutForm />);

        fireEvent.change(screen.getByLabelText(/first/i), { target: { value: shippingValues.firstName } });
        fireEvent.change(screen.getByLabelText(/last/i), { target: { value: shippingValues.lastName } });
        fireEvent.change(screen.getByLabelText(/address.+(1|one)/i), { target: { value: shippingValues.addressOne } });
        fireEvent.change(screen.getByLabelText(/municipality/i), { target: { value: shippingValues.municipality } });
        fireEvent.change(screen.getByLabelText(/province/i), { target: { value: shippingValues.provinceTerritory } });
        fireEvent.change(screen.getByLabelText(/code/i), { target: { value: shippingValues.postalCode } });
        fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: shippingValues.phone } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: shippingValues.email } });

        await waitFor(() => {
            const submit = screen.getByTestId("submit-shipping-button");
            fireEvent.click(submit);
        })

        const toggleSameAddress = await screen.findByLabelText(/My billing address is the same/i);
        fireEvent.click(toggleSameAddress);

        fireEvent.change(screen.getByLabelText(/first/i), { target: { value: billingValues.firstName } });
        fireEvent.change(screen.getByLabelText(/last/i), { target: { value: billingValues.lastName } });
        fireEvent.change(screen.getByLabelText(/address.+(1|one)/i), { target: { value: billingValues.addressOne } });
        fireEvent.change(screen.getByLabelText(/municipality/i), { target: { value: billingValues.municipality } });
        fireEvent.change(screen.getByLabelText(/province/i), { target: { value: billingValues.provinceTerritory } });
        fireEvent.change(screen.getByLabelText(/code/i), { target: { value: billingValues.postalCode } });

        await waitFor(() => {
            const submit = screen.getByTestId("submit-billing-button");
            fireEvent.click(submit);
        })

        Object.entries(shippingValues).forEach(([, value]) => {
            const regex = new RegExp(value);
            expect(screen.getByText(regex)).toBeInTheDocument();
        });

        Object.entries(billingValues).forEach(([, value]) => {
            const regex = new RegExp(value);
            expect(screen.getByText(regex)).toBeInTheDocument();
        })
    })
})

describe('BillingForm billing same as shipping toggle', () => {
    test('is on', () => {
        const billingSameValues = { ...shippingValues };
        delete billingSameValues.shipping;
        delete billingSameValues.email;
        delete billingSameValues.phone;

        render(<BillingForm
            shippingValues={shippingValues}
            sameAsShipping={true} />);

        expect(screen.queryByTestId("billing-form")).not.toBeInTheDocument();

        Object.entries(billingSameValues).forEach(([, value]) => {
            const regex = new RegExp(value);
            expect(screen.queryByText(regex)).toBeInTheDocument();
        })
    });

    test('is switched to off', () => {
        const setSameAsShipping = jest.fn();
        render(<BillingForm
            shippingValues={shippingValues}
            sameAsShipping={true}
            setSameAsShipping={setSameAsShipping} />);

        const toggleSameAddress = screen.getByLabelText(/My billing address is the same/i);
        fireEvent.click(toggleSameAddress);
        expect(setSameAsShipping).toBeCalledWith(false);
    })

    test('is off', () => {
        render(<BillingForm
            billingValues={billingValues}
            shippingValues={shippingValues}
            sameAsShipping={false} />);
        expect(screen.getByTestId("billing-form")).toBeInTheDocument();
        Object.entries(billingValues).forEach(([, value]) => {
            const regex = new RegExp(value);
            expect(screen.queryByText(regex)).not.toBeInTheDocument();
            expect(screen.getByDisplayValue(value)).toBeInTheDocument();
        })
    })
})

test('ShippingForm cannot be submitted empty', async () => {
    render(<ShippingForm />);

    const submit = screen.getByTestId("submit-shipping-button");
    fireEvent.click(submit);

    const shippingForm = await screen.findByTestId("shipping-form");
    expect(shippingForm).toBeInTheDocument();

    const requiredTexts = await screen.findAllByText(/required/i);
    expect(requiredTexts.length).toBeGreaterThan(0);
})

test('BillingForm cannot be submmitted empty', async () => {
    render(<BillingForm sameAsShipping={false} />);

    const submit = screen.getByTestId("submit-billing-button");
    fireEvent.click(submit);

    const billingForm = await screen.findByTestId("billing-form");
    expect(billingForm).toBeInTheDocument();

    const requiredTexts = await screen.findAllByText(/required/i);
    expect(requiredTexts.length).toBeGreaterThan(0);
})