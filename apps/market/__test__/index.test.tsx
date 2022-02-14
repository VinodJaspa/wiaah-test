import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Market from "../pages/index";
import { shallow } from 'enzyme';
it("renders correctly", () => {
        const wrapper = shallow(
        <Market />
        );
        expect(wrapper).toMatchSnapshot();
    } 
);