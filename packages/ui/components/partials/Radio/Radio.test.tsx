import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Radio } from "@UI";
import { getTestId, setTestid } from "utils";

describe("Radio render test", () => {
  let wrapper: ShallowWrapper;
  let child: ShallowWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(
      <Radio id="test" onChange={onChangeMock}>
        <div {...setTestid("child")}>child</div>
      </Radio>
    );
    child = wrapper.find(getTestId("child"));
  });
  it("should render correctly", () => {
    expect(child.length).toBe(1);
  });

  it("should trigger onChange on child click", () => {
    wrapper.find("input").simulate("change", { target: { checked: true } });
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith({ target: { checked: true } });
  });
});

describe("Radio snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(shallow(<Radio />)).toMatchSnapshot();
  });
});
