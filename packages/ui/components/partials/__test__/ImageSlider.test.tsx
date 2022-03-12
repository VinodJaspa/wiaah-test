import React from "react";
import { ImageSlider } from "../../";
import { shallow } from "enzyme";

it("renders as expected without parameters", () => {
  const wrapper = shallow(<ImageSlider />);
  expect(wrapper).toMatchSnapshot();
});
