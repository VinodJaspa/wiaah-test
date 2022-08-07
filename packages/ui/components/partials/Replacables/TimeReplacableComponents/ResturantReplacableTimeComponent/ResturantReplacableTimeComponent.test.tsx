import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ResturantReplacableTimeComponent } from "./ResturantReplacableTimeComponent";
describe("RestaurantReplaceableTimeComponent tests", () => {
  let wrapper: ReactWrapper;
  let onClickMock: jest.Mock;

  beforeEach(() => {
    onClickMock = jest.fn();
    wrapper = mount(
      <ResturantReplacableTimeComponent
        onClick={onClickMock}
        selected={false}
        time={{ hour: 12, minutes: 8, id: "1322" }}
      />
    );
  });

  it("should render properly", () => {
    expect(wrapper.text()).toBe("12:08");
  });

  it("should trigger onClick once on component click", () => {
    wrapper.children().simulate("click");
    expect(onClickMock).toBeCalledTimes(1);
  });
  it("should trigger onClick on component click with the time id", () => {
    wrapper.children().simulate("click");
    expect(onClickMock).toBeCalledWith("1322");
  });
});
