import React from "react";
import Search from "../pages/search";
import { shallow } from "enzyme";
it("renders correctly", () => {
  const wrapper = shallow(<Search />);
  expect(wrapper).toMatchSnapshot();
});
