import { setTestid, getTestId } from "ui/utils/test-utils";
import { shallow, mount, ShallowWrapper } from "enzyme";
import React from "react";
import { Switch } from "ui/components/partials/Switch";

const selectors = {
  switchButton: "SwitchButton",
};

describe("Switch functional tests", () => {
  let wrapper: ShallowWrapper;
  let switchButton: ShallowWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = shallow(<Switch onChange={onChangeMock} />);
    switchButton = wrapper.find(getTestId(selectors.switchButton));
  });
  it("should render properly", () => {
    <Switch />;
  });
  it("should toggle", () => {
    console.log(wrapper.debug());
    expect(switchButton.length).toBe(1);
    switchButton.simulate("click");
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(true);
    switchButton.simulate("click");
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith(false);
  });
});

describe("Switch snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<Switch checked={false} onChange={(e) => {}} />));
  });
});
