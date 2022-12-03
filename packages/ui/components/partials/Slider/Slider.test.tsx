import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { setTestid, getTestId } from "utils";
import { Slider } from "./Slider";

const testids = {
  nextItemBtn: "SliderNextItemBtn",
  previousBtn: "SliderPreviousItemBtn",
};

describe("Slider tests", () => {
  let wrapper: ReactWrapper;
  let childs: ReactWrapper;
  let leftArrowBtn: ReactWrapper;
  let rightArrowBtn: ReactWrapper;
  let onSlideChangeMock: jest.Mock;
  beforeEach(() => {
    onSlideChangeMock = jest.fn();
    wrapper = mount(
      <Slider
        leftArrowComponent={<div>custom left arrow</div>}
        arrowLeftProps={{ role: "test-left-arrow" }}
        arrowRightProps={{ role: "test-right-arrow" }}
        rightArrowComponent={<div>custom right arrow</div>}
        itemsCount={2}
        onSliderChange={onSlideChangeMock}
      >
        {[...Array(15)].map((_, i) => (
          <div key={i} {...setTestid("SliderChilds")}>
            {i}
          </div>
        ))}
      </Slider>
    );
    childs = wrapper.find(getTestId("SliderChilds"));
    leftArrowBtn = wrapper.find(getTestId(testids.previousBtn));
    rightArrowBtn = wrapper.find(getTestId(testids.nextItemBtn));
  });
  it("should have the right amount of childs", () => {
    expect(childs.length).toBe(15);
  });
  it("should render childs properly", () => {
    [...Array(15)].map((_, i) => {
      const child = childs.at(i);
      expect(child.text()).toBe(`${i}`);
    });
  });
  it("should render controll arrows components properly", () => {
    expect(leftArrowBtn.length).toBe(1);
    expect(rightArrowBtn.length).toBe(1);
    expect(leftArrowBtn.text()).toBe("custom left arrow");
    expect(rightArrowBtn.text()).toBe("custom right arrow");
  });
  it("should trigger onSliderChange on mount with the first item idx be 0", () => {
    expect(onSlideChangeMock).toBeCalledTimes(1);
    expect(onSlideChangeMock).toBeCalledWith(0, [0, 1]);
  });
  it("should trigger onSliderChange on right arrow click", () => {
    rightArrowBtn.simulate("click");
    expect(onSlideChangeMock).toBeCalledTimes(2);
  });
  it("should not trigger onSliderChange on first click being on the left arrow", () => {
    leftArrowBtn.simulate("click");
    expect(onSlideChangeMock).toBeCalledTimes(1);
  });
  it("should trigger onSliderChange with the right item idx", () => {
    rightArrowBtn.simulate("click");
    expect(onSlideChangeMock).toBeCalledWith(1, [1, 2]);
  });
  it("should pass the custom left and right props properly", () => {
    expect(leftArrowBtn.prop("role")).toBe("test-left-arrow");
    expect(rightArrowBtn.prop("role")).toBe("test-right-arrow");
  });
  it("should have next item boundings of childs number - the first item", () => {
    [...Array(20)].forEach(() => {
      rightArrowBtn.simulate("click");
    });
    expect(onSlideChangeMock).toBeCalledTimes(14);
  });
  it("should go to next item and back to prevuious item", () => {
    rightArrowBtn.simulate("click");
    expect(onSlideChangeMock).toBeCalledWith(1, [1, 2]);
    leftArrowBtn.simulate("click");
    expect(onSlideChangeMock).toBeCalledWith(0, [0, 1]);
  });
  it("should change its state corresponding to the currentItemIdx prop", () => {
    wrapper.setProps({ currentItemIdx: 5 });
    expect(onSlideChangeMock).toBeCalledWith(5, [5, 6]);
  });
});
