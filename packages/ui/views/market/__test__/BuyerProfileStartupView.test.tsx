import React from "react";
import { shallow } from "enzyme";
import { BuyerProfileStartUpView } from "../BuyerProfileStartupView";

it("renders correctly", () => {
  const wrapper = shallow(<BuyerProfileStartUpView />);
  expect(wrapper).toMatchSnapshot();
});
