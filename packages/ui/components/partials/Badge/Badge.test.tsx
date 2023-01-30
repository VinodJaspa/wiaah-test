import { shallow, ShallowWrapper } from "enzyme";
import { getTestId, setTestid } from "utils";
import { Badge, BadgeProps, BadgeCases } from "./Badge";
import React from "react";

describe("Badge", () => {
  let wrapper: ShallowWrapper;
  let props: BadgeProps = {};
  let variants: (keyof BadgeCases)[] = [
    "fail",
    "info",
    "off",
    "success",
    "warning",
  ];
  beforeEach(() => {
    wrapper = shallow(
      <Badge {...props}>
        <div {...setTestid("child")}>child</div>
      </Badge>
    );
  });

  it("should render child properly", () => {
    expect(wrapper.find(getTestId("child")).length).toBe(1);
  });

  it("should match snapshot with diffrent variants", () => {
    variants.forEach((v) => {
      expect(
        shallow(
          <Badge variant={v}>
            <div {...setTestid("child")}></div>
          </Badge>
        )
      ).toMatchSnapshot(`Variant: ${v}`);
    });
  });
});
