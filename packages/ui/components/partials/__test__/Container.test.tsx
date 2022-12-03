import { shallow } from "enzyme";
import { Container } from "../Container";
import toJSON from "enzyme-to-json";
import React from "react";

describe("container wrapper", () => {
  it("should render properly", () => {
    shallow(<Container />);
  });
  it("should render child components correctly", () => {
    const childComponent = <div>child compoenent</div>;
    const component = shallow(<Container>{childComponent}</Container>);

    expect(component.containsMatchingElement(childComponent)).toBe(true);
  });
});

describe("snapshot", () => {
  it("should match snapshot in its default state", () => {
    const component = shallow(<Container />);
    expect(toJSON(component)).toMatchSnapshot();
  });
  it("should match snapshot with child elements", () => {
    const childComponent = <div>child compoenent</div>;
    const component = shallow(<Container>{childComponent}</Container>);
    expect(toJSON(component)).toMatchSnapshot();
  });
});
