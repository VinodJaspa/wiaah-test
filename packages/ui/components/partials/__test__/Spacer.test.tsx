import { shallow } from "enzyme";
import { Spacer } from "../Spacer";
import toJSON from "enzyme-to-json";
import React from "react";

describe("spacer component", () => {
  it("should render properly", () => {
    shallow(<Spacer />);
  });
});

describe("snapshot", () => {
  it("should match snapshot in its default state", () => {
    const component = shallow(<Spacer />);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
