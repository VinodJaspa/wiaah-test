import { ChakraProvider } from "@chakra-ui/react";
import { SocialStoryContentData } from "@UI/../types/src";
import { mount, ReactWrapper, shallow } from "enzyme";
import React from "react";
import { RecoilRoot } from "recoil";
import { SocialStoriesCarousel } from "./";

const selectors = {
  story: "[data-testid='StoryContent']",
};

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
  let wrapper: ReactWrapper;
  let stories: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <RecoilRoot>
        <ChakraProvider>
          <SocialStoriesCarousel stories={storiesPlaceholder} />
        </ChakraProvider>
      </RecoilRoot>
    );
    stories = wrapper.find(selectors.story);
  });

  it("should have the right amount of stories", () => {
    // console.log(wrapper.debug());
    wrapper.update();
    console.log(wrapper.debug());
    expect(stories.length).toBe(storiesPlaceholder.length);
  });
});

// describe("SocialStoriesCarousel snapshot tests", () => {
//   it("should match snapshot", () => {
//     expect(shallow(<SocialStoriesCarousel stories={storiesPlaceholder} />))
//       .toMatchSnapshot;
//   });
// });
