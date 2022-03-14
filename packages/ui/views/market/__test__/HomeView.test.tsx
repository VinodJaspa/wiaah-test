import React from "react";
import { shallow } from 'enzyme';
import {HomeView} from '../HomeView'

it("renders correctly", () => {
    const wrapper = shallow(
    <HomeView />
    );
    expect(wrapper).toMatchSnapshot();
} 
);