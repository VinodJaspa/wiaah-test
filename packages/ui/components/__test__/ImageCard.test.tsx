import React from "react";
import {ImageCard} from "../../components";
import { shallow } from 'enzyme';

it("renders as expected without parameters", () => {
    const wrapper = shallow(
        <ImageCard />
    );
    expect(wrapper).toMatchSnapshot();
    }
);

it("renders as expected with parameters", () => {
    const wrapper = shallow(
        <ImageCard imgUrl="/no_image.jpg" name="Card Name" />
    );
    expect(wrapper.find('img').props().src).toEqual('/no_image.jpg');
    expect(wrapper.find('p').first().text()).toEqual('Card Name');
    }
);