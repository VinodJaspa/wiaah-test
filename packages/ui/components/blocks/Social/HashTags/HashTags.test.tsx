import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { HashTags } from "@UI";

const selectors = {
  tagsContainer: "[data-testid='TagsContainer']",
  tag: "[data-testid='Tag']",
};

const TagsPlaceholder: string[] = ["mood", "gaming", "sports"];

describe("HashTags component render tests", () => {
  let wrapperWithItems: ShallowWrapper;
  let wrapperWithNoItems: ShallowWrapper;
  let tagsContainer: ShallowWrapper;
  let tags: ShallowWrapper;
  beforeEach(() => {
    wrapperWithItems = shallow(<HashTags tags={TagsPlaceholder} />);
    wrapperWithNoItems = shallow(<HashTags tags={[]} />);
    tagsContainer = wrapperWithItems.find(selectors.tagsContainer);
    tags = wrapperWithItems.find(selectors.tag);
  });
  it("should have the right number of tags as provided", () => {
    expect(tags.length).toBe(TagsPlaceholder.length);
  });
  it("should have the right tags name as provided", () => {
    TagsPlaceholder.forEach((tag, i) => {
      expect(tags.at(i).text()).toBe(`#${tag}`);
    });
  });
});

describe("HashTags functionality tests", () => {
  let wrapperWithItems: ShallowWrapper;
  let wrapperWithNoItems: ShallowWrapper;
  let tagsContainer: ShallowWrapper;
  let tags: ShallowWrapper;
  let onTagClickMock: jest.Mock;
  beforeEach(() => {
    onTagClickMock = jest.fn();
    wrapperWithItems = shallow(
      <HashTags onTagClick={onTagClickMock} tags={TagsPlaceholder} />
    );
    wrapperWithNoItems = shallow(<HashTags tags={[]} />);

    tagsContainer = wrapperWithItems.find(selectors.tagsContainer);
    tags = wrapperWithItems.find(selectors.tag);
  });
  it("should call onTagClick callback with the right tag name", () => {
    TagsPlaceholder.forEach((tag, i) => {
      const targetedTag = tags.at(i);
      targetedTag.simulate("click");
      expect(onTagClickMock).toBeCalledTimes(i + 1);
      expect(onTagClickMock).toBeCalledWith(tag);
    });
  });
});

describe("HashTags snapshot tests", () => {
  let wrapperWithItems: ShallowWrapper;
  let wrapperWithNoItems: ShallowWrapper;
  beforeEach(() => {
    wrapperWithItems = shallow(<HashTags tags={TagsPlaceholder} />);
    wrapperWithNoItems = shallow(<HashTags tags={[]} />);
  });
  it("should match snapshot without items", () => {
    expect(wrapperWithNoItems).toMatchSnapshot();
  });
  it("should match snapshot with items", () => {
    expect(wrapperWithItems).toMatchSnapshot();
  });
});
