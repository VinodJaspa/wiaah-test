import React from "react";
import { shallow } from "enzyme";
import { StorySeenByPopup } from "./";

describe("StorySeenBy component render tests", () => {
  it("should render correctly", () => {
    shallow(<StorySeenByPopup />);
  });
});

describe("StorySeenBy component snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<StorySeenByPopup />)).toMatchSnapshot();
  });
});
