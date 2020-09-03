import React from "react";
import { shallow } from 'enzyme';

import CheckoutForm from '../checkout-form/checkout-form';

test('CheckoutForm renders properly', () => {
    const wrapper = shallow(<CheckoutForm />);
    expect(wrapper).toMatchSnapshot();
});