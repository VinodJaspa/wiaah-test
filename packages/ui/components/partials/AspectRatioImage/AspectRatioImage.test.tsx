import { shallow, ShallowWrapper } from "enzyme";
import { AspectRatioImage } from "./AspectRatioImage";
import React from "react";
import { containsClassName, getTestId } from "utils/src/test";

describe("AspectRatioImage rendering tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AspectRatioImage src="test:src" alt="test:alt" ratio={1}>
        <div data-testid="child"></div>
      </AspectRatioImage>
    );
  });
  it("should render image with the right props", () => {
    const imgTailwindcssClasses = ["w-full", "h-full", "object-cover"];
    const img = wrapper.find("img");
    expect(img.length).toBe(1);
    imgTailwindcssClasses.forEach((classname, i) => {
      const contains = containsClassName(
        img.props().className || "",
        classname
      );
      expect(contains).toBe(true);
    });
    expect(img.props().src).toBe("test:src");
    expect(img.props().alt).toBe("test:alt");
  });
  it("should render child properly", () => {
    expect(wrapper.find(getTestId("child")).length).toBe(1);
  });
});
