import { SocialHashTagTopPosts } from "@src/state";
import { HashTagCardInfo } from "@UI/../types/src";
import { PostCardPlaceHolder } from "@UI/placeholder";
import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { RecoilRoot, selector, useSetRecoilState } from "recoil";
import { getMountedComponent } from "../../../helpers";
import { HashTagPostsListWrapper } from "../HashTagPostsListWrapper";

const selectors = {
  tagsContainer: "[data-testid='HashTagCardsContainer']",
  hashTagCard: "[data-testid='HashTagCard']",
};

const hashTagCardsInfoPlaceholder: HashTagCardInfo[] = [
  {
    title: "title",
    postInfo: PostCardPlaceHolder.postInfo,
    profileInfo: PostCardPlaceHolder.profileInfo,
  },

  {
    title: "title",
    postInfo: PostCardPlaceHolder.postInfo,
    profileInfo: PostCardPlaceHolder.profileInfo,
  },
  {
    title: "title",
    postInfo: PostCardPlaceHolder.postInfo,
    profileInfo: PostCardPlaceHolder.profileInfo,
  },
];

const StateWrapper: React.FC<{
  state: HashTagCardInfo[];
  children: React.ReactNode;
}> = ({ children, state }) => {
  const setState = useSetRecoilState(SocialHashTagTopPosts);
  setState(state);
  return <>{children}</>;
};

describe("HashTagPostsListWrapper render tests", () => {
  let wrapperWithItems: ReactWrapper;
  let wrapperWithNoItems: ReactWrapper;
  let tagsContainer: ReactWrapper;
  let tags: ReactWrapper;
  beforeEach(() => {
    wrapperWithItems = mount(
      <RecoilRoot>
        <StateWrapper state={hashTagCardsInfoPlaceholder}>
          <HashTagPostsListWrapper hashtags={[]} />
        </StateWrapper>
      </RecoilRoot>,
    );
    tagsContainer = getMountedComponent(
      wrapperWithItems,
      selectors.tagsContainer,
      3,
    );
    tags = wrapperWithItems.find(selectors.hashTagCard);
    wrapperWithNoItems = mount(
      <RecoilRoot>
        <StateWrapper state={[]}>
          <HashTagPostsListWrapper hashtags={[]} />
        </StateWrapper>
      </RecoilRoot>,
    );
  });

  it("should have the right number of items as provided", () => {
    expect(tagsContainer.length).toBe(1);
    expect(tags.length).toBe(hashTagCardsInfoPlaceholder.length);
  });
  it("should give the childs the right tag props", () => {
    hashTagCardsInfoPlaceholder.forEach((cardInfo, i) => {
      const targetTag = tags.at(i);
      Object.entries(cardInfo).forEach(([prop, value], index) => {
        expect(targetTag.prop(prop)).toBe(value);
      });
    });
  });
});

describe("HashTagPostsListWrapper Snapshot Tests", () => {
  let wrapperWithItems: ReactWrapper;
  let wrapperWithNoItems: ReactWrapper;
  beforeEach(() => {
    wrapperWithItems = mount(
      <RecoilRoot>
        <StateWrapper state={hashTagCardsInfoPlaceholder}>
          <HashTagPostsListWrapper hashtags={[]} />
        </StateWrapper>
      </RecoilRoot>,
    );
    wrapperWithNoItems = mount(
      <RecoilRoot>
        <StateWrapper state={[]}>
          <HashTagPostsListWrapper hashtags={[]} />
        </StateWrapper>
      </RecoilRoot>,
    );
  });
  it("should match snapshot with items", () => {
    expect(wrapperWithItems).toMatchSnapshot();
  });
  it("should match snapshot without items", () => {
    expect(wrapperWithNoItems).toMatchSnapshot();
  });
});
