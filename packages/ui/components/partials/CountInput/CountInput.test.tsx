import { ReactWrapper, mount } from "enzyme";
import { getMountedComponent, getTestId } from "utils/src/test";
import { CountInput } from "./CountInput";
import React from "react";

const testids = {
  incrementBtn: "IncrementCountBtn",
  decrementBtn: "DecrementCountBtn",
};

describe("CountInput tests", () => {
  let wrapper: ReactWrapper;
  let incrementBtn: ReactWrapper;
  let decrementBtn: ReactWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(<CountInput onCountChange={onChangeMock} />);
    incrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.incrementBtn)
    );
    decrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.decrementBtn)
    );
  });
  it("should render properly with count of 0 initialy", () => {
    expect(wrapper.text()).toHaveTextContent("1");
  });
});
