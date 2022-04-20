import { mount, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { PostHead } from "../PostHead";

const selectors = {
  creatorName: "[data-testid='PostCreatorName']",
  creatorThumbnail: "[data-testid='PostCreatorThumbnail']",
  createdSince: "[data-testid='PostCreatedSince']",
};

const threeDaysInTimestamp = 3 * 24 * 60 * 60 * 1000;

const postHeadPlaceholder = {
  creatorName: "wiaah",
  creatorPhoto: "/shop.jpeg",
  createdAt: new Date(Date.now() - threeDaysInTimestamp).toString(),
};

describe("PostHead render test", () => {
  let wrapper: ShallowWrapper;
  let creatorName: ShallowWrapper;
  let creatorThumbnail: ShallowWrapper;
  let createdSince: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<PostHead {...postHeadPlaceholder} />);
    creatorName = wrapper.find(selectors.creatorName);
    creatorThumbnail = wrapper.find(selectors.creatorThumbnail);
    createdSince = wrapper.find(selectors.createdSince);
  });

  it("should render properly", () => {
    shallow(<PostHead {...postHeadPlaceholder} />);
  });
  it("should have the right creator name", () => {
    expect(creatorName.text()).toBe(postHeadPlaceholder.creatorName);
  });
  it("should have the right creator thumbnail", () => {
    expect(creatorThumbnail.prop("src")).toBe(postHeadPlaceholder.creatorPhoto);
  });
  it("should have the right", () => {
    expect(createdSince.text()).toContain("3");
  });
});

describe("PostHead Snapshot tests", () => {
  it("should match snapshot in shallow render", () => {
    expect(shallow(<PostHead {...postHeadPlaceholder} />)).toMatchSnapshot();
  });
  it("should match snapshot in full render", () => {
    expect(mount(<PostHead {...postHeadPlaceholder} />)).toMatchSnapshot();
  });
});
