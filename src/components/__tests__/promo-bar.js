import React from "react";
import { shallow } from 'enzyme';

import PromoBar from '../promo-bar/promo-bar';

test('Should render PromoBar correctly', () => {
  const wrapper = shallow(<PromoBar />);
  expect(wrapper).toMatchSnapshot();
});