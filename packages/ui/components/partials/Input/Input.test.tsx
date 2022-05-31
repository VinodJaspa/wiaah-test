import React from "react";
import { getTestId } from "utils";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "ui/components/partials/Input";

const selectors = {
  leftElement: "InputLeftElement",
  rightElement: "InputRightElement",
};

describe("Input group functionaly tests", () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;
  let leftElement: ReactWrapper;
  let rightElement: ReactWrapper;

  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(
      <InputGroup>
        <InputLeftElement>
          <div data-testid={selectors.leftElement}>left</div>
        </InputLeftElement>
        <Input onChange={onChangeMock} />
        <InputRightElement>
          <div data-testid={selectors.rightElement}>right</div>
        </InputRightElement>
      </InputGroup>
    );
    input = wrapper.find("input");
    leftElement = wrapper.find(getTestId(selectors.leftElement));
    rightElement = wrapper.find(getTestId(selectors.rightElement));
  });

  it("should render the left element correctly", () => {
    expect(leftElement.length).toBe(1);
  });
  it("should render the right element correctly", () => {
    expect(rightElement.length).toBe(1);
  });
});

describe("InputGroup components snapshot tests", () => {
  let onChangeMock: jest.Mock;
  it("should match snapshot", () => {
    onChangeMock = jest.fn();

    expect(
      shallow(
        <InputGroup>
          <InputLeftElement>
            <div data-testid={selectors.leftElement}>left</div>
          </InputLeftElement>
          <Input onChange={onChangeMock} />
          <InputRightElement>
            <div data-testid={selectors.rightElement}>right</div>
          </InputRightElement>
        </InputGroup>
      )
    );
  });
});
