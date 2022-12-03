import { shallow, ShallowWrapper } from "enzyme";
import { getTestId } from "utils/src/test";
import { AspectRatio } from "./AspectRatio";
import React from "react";

describe("AspectRatio rendering tests", () => {
  let wrapper: ShallowWrapper;
  let child: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AspectRatio ratio={1}>
        <div data-testid="child"></div>
      </AspectRatio>
    );
    child = wrapper.find(getTestId("child"));
  });
  it("should render child correctly", () => {
    expect(child.length).toBe(1);
  });
});
