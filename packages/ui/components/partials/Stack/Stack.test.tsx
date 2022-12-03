import { shallow, ShallowWrapper } from "enzyme";
import { getTestId, setTestid } from "utils";
import { HStack } from "./index";
import React from "react";

describe("HStack component tests", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <HStack>
        <div {...setTestid("child")}>child</div>
      </HStack>
    );
  });
  it("should render child properly", () => {
    expect(wrapper.find(getTestId("child")).length).toBe(1);
    expect(wrapper.text()).toBe("child");
  });
});
