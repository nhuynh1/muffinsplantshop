import React from "react";
import { shallow } from 'enzyme';
import { waitFor } from '@testing-library/react';

import CheckoutForm, { ShippingForm } from '../checkout-form/checkout-form';
import * as CartContext from "../../../wrap-with-provider";

test('CheckoutForm renders properly', () => {
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
    const wrapper = shallow(<CheckoutForm />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('p').at(0).text()).toBe('1 item $12.95');
});

test('ShippingForm renders properly', () => {
    const wrapper = shallow(<ShippingForm />);
    expect(wrapper).toMatchSnapshot();
})

test('ShippingForm saves validated data to state', async () => {
    const setValues = jest.fn();
    const setSection = jest.fn();
    const shippingValues = {
        firstName: "Jonny",
        lastName: "Apples",
        addressOne: "123 Main Street",
        addressTwo: "",
        municipality: "Ottawa",
        provinceTerritory: "ON",
        postalCode: "K0A 2X0",
        phone: "613-451-5555",
        email: "jonny@apple.com",
        shipping: "standard"
    }
    const wrapper = shallow(<ShippingForm 
                                setValues={setValues} 
                                setSection={setSection} 
                                shippingValues={shippingValues} />);
    wrapper.find('form').simulate('submit');                                
    
    await waitFor(() => {
        expect(setSection).toHaveBeenCalledWith('billing');
        expect(setValues).toHaveBeenCalledWith(shippingValues);
    })
    
})