import { mount, shallow } from "enzyme";
import { FlexStack } from "../FlexStack";
import React, { CSSProperties } from "react";
describe("FlexStack rendering functionality", () => {
  it("should render properly", () => {
    shallow(<FlexStack />);
  });
  it("should render childs Properly", () => {
    const component = shallow(
      <FlexStack setId="stack">
        <div role="testDiv"></div>
        <div role="testDiv"></div>
        <div role="testDiv"></div>
        <div role="testDiv"></div>
        <div role="testDiv"></div>
      </FlexStack>
    );
    expect(component.find("[role='testDiv']").length).toBe(5);
  });
});

describe("FlexStack Passed Style", () => {
  const StyleProps = [
    {
      name: "direction",
      value: "vertical",
    },
    {
      name: "direction",
      value: "horizontal",
    },
    {
      name: "reverse",
      value: true,
    },
    {
      name: "reverse",
      value: false,
    },
    {
      name: "wrap",
      value: true,
    },
    {
      name: "wrap",
      value: false,
    },
    {
      name: "justify",
      value: "center",
    },
    {
      name: "justify",
      value: "between",
    },
    {
      name: "justify",
      value: "around",
    },
    {
      name: "justify",
      value: "evenly",
    },
    {
      name: "justify",
      value: "start",
    },
    {
      name: "justify",
      value: "end",
    },
    {
      name: "fullWidth",
      value: true,
    },
    {
      name: "fullWidth",
      value: false,
    },
    {
      name: "horizontalSpacingInRem",
      value: 0.25,
    },
    {
      name: "horizontalSpacingInRem",
      value: 1,
    },
    {
      name: "horizontalSpacingInRem",
      value: 2.25,
    },
    {
      name: "horizontalSpacingInRem",
      value: 5.25,
    },
    {
      name: "verticalSpacingInRem",
      value: 0.25,
    },
    {
      name: "veticalSpacingInRem",
      value: 1,
    },
    {
      name: "verticalSpacingInRem",
      value: 2.25,
    },
    {
      name: "verticalSpacingInRem",
      value: 5.25,
    },
  ];
  it("should give all childs the right style props ", () => {
    StyleProps.forEach(({ name, value }, i) => {
      const component = mount(<FlexStack {...{ [name]: value }} />);
      const props = component.props();
      expect(props[name]).toEqual(value);
    });
  });
});
