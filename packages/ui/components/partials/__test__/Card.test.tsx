import React from "react";
import { shallow } from "enzyme";
import { Card } from "@chakra-ui/react";

it("renders as expected without parameters", () => {
  const wrapper = shallow(<Card />);
  expect(wrapper).toMatchSnapshot();
});

it("renders as expected with parameters", () => {
  const wrapper = shallow(<Card />);
  expect(wrapper.find("img").props().src).toEqual("/no_image.jpg");
  expect(wrapper.find("p").first().text()).toEqual("Card Name");
});
