import { shallow, ShallowWrapper } from "enzyme";
import { getTestId, setTestid } from "utils";
import { Badge, BadgeProps, BadgeCases } from "./Badge";
import React from "react";

// Assume BadgeProps and BadgeCases require a type argument, e.g., a variant type
type BadgeVariant = "fail" | "info" | "off" | "success" | "warning";

describe("Badge", () => {
  let wrapper: ShallowWrapper;
  let props: BadgeProps<BadgeVariant> = {}; // Provide a type argument for BadgeProps
  let variants: BadgeVariant[] = ["fail", "info", "off", "success", "warning"];

  beforeEach(() => {
    wrapper = shallow(
      <Badge {...props}>
        <div {...setTestid("child")}>child</div>
      </Badge>,
    );
  });

  it("should render child properly", () => {
    expect(wrapper.find(getTestId("child")).length).toBe(1);
  });

  it("should match snapshot with different variants", () => {
    variants.forEach((v) => {
      expect(
        shallow(
          <Badge variant={v}>
            <div {...setTestid("child")}></div>
          </Badge>,
        ),
      ).toMatchSnapshot(`Variant: ${String(v)}`); // Ensure conversion to string
    });
  });
});
