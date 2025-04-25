
import { SocialStoryContentData } from "@UI/../types/src";
import { GetUserSocialStoryPlaceHolder } from "@UI/placeholder";
import { mount, ReactWrapper, shallow } from "enzyme";
import React from "react";
import { RecoilRoot } from "recoil";
import { SocialStoriesCarousel } from "./";

const selectors = {
  story: "[data-testid='StoryContent']",
};

const storiesPlaceholder = {};
describe("SocialStoriesCarousel render tests", () => {
  let wrapper: ReactWrapper;
  let stories: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <RecoilRoot>
       
          <SocialStoriesCarousel story={GetUserSocialStoryPlaceHolder} />
       
      </RecoilRoot>,
    );
    stories = wrapper.find(selectors.story);
  });

  it("should have the right amount of stories", () => {
    // console.log(wrapper.debug());
    wrapper.update();
    console.log(wrapper.debug());
    expect(stories.length).toBe(storiesPlaceholder);
  });
});

// describe("SocialStoriesCarousel snapshot tests", () => {
//   it("should match snapshot", () => {
//     expect(shallow(<SocialStoriesCarousel stories={storiesPlaceholder} />))
//       .toMatchSnapshot;
//   });
// });
