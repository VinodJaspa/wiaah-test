import React from "react";
import { shallow } from 'enzyme';
import {ProductViewRight} from '../ProductViewRight'

it("renders correctly", () => {
    const wrapper = shallow(
    <ProductViewRight />
    );
    expect(wrapper).toMatchSnapshot();
} 
);