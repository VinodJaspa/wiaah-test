import React from "react";
import { shallow } from "enzyme";
import { InputSearch } from "@partials";
it("renders correctly", () => {
  const wrapper = shallow(
    <InputSearch options={[]} onOptionSelect={() => { }} />,
  );
  expect(wrapper).toMatchSnapshot();
});
