import { shallow } from "enzyme";
import { Button } from "../Button";
import toJSON from "enzyme-to-json";
import React from "react";

describe("button component", () => {
  it("should render correctly", () => {
    shallow(<Button children="test text" />);
  });

  it("should render passed text correctly", () => {
    const component = shallow(<Button children="test text" />);

    expect(component.text()).toBe("test text");
  });

  it("should match snapshot", () => {
    const component = shallow(<Button children="test text" />);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
