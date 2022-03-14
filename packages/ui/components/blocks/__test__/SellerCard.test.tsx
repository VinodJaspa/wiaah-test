import React from "react";
import { shallow } from 'enzyme';
import {SellerCard} from '../SellerCard'

it("renders correctly", () => {
    const wrapper = shallow(
    <SellerCard />
    );
    expect(wrapper).toMatchSnapshot();
} 
);