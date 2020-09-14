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
    expect(screen.getByText("1 item $12.95")).toBeInTheDocument();
});

test('ShippingForm renders properly', () => {
    const { container } = render(<ShippingForm />);
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

test('Shows shipping details with valid form submission', async () => {
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
        switch (key) {
            case 'email':
                expect(screen.queryByText(regex)).not.toBeInTheDocument();
                break;
            case 'shipping':
                expect(screen.queryByText(regex)).toBeInTheDocument();
                break;
            default:
                expect(screen.getAllByText(regex).length).toEqual(2);
                break;
        }
    });
    const toggleSameAddress = screen.getByLabelText(/My billing address is the same/i);
    fireEvent.click(toggleSameAddress);
    expect(screen.getByTestId("billing-form")).toBeInTheDocument();

})