import { shallow } from "enzyme";
import React from "react";
import { SocialStoryContentData } from "types/market/Social";
import { SocialStoriesCarousel } from "./";

const selectors = {};

const storiesPlaceholder: SocialStoryContentData[] = [
  {
    id: "1",
    storyType: "text",
    storyText: "test story",
  },
  {
    id: "2",
    storyType: "image",
    storyText: "test story",
  },
  {
    id: "3",
    storyType: "video",
    storyText: "test story",
  },
];

describe("SocialStoriesCarousel render tests", () => {
  it("should render properly", () => {
    shallow(<SocialStoriesCarousel stories={storiesPlaceholder} />);
  });
});

describe("SocialStoriesCarousel snapshot tests", () => {
  it("should match snapshot", () => {
    expect(shallow(<SocialStoriesCarousel stories={storiesPlaceholder} />))
      .toMatchSnapshot;
  });
});
