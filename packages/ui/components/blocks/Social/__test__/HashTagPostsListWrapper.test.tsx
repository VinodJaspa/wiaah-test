import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { RecoilRoot, selector, useSetRecoilState } from "recoil";
import { HashTagCardInfo } from "types/market/Social";
import { SocialHashTagTopPosts } from "../../../../state";
import { getMountedComponent } from "../../../helpers";
import { HashTagPostsListWrapper } from "../HashTagPostsListWrapper";

const selectors = {
  tagsContainer: "[data-testid='HashTagCardsContainer']",
  hashTagCard: "[data-testid='HashTagCard']",
};

const hashTagCardsInfoPlaceholder: HashTagCardInfo[] = [
  {
    attachment: {
      src: "/verticalImage.jpg",
      type: "image",
    },
    title: "most liked post",
  },
  {
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
    title: "most commented post",
  },
  {
    attachment: {
      src: "/verticalVideo.mp4",
      type: "video",
    },
    title: "most viewed video",
  },
  {
    attachment: {
      src: "/video.mp4",
      type: "video",
    },
    title: "most liked video",
  },
];

const StateWrapper: React.FC<{ state: HashTagCardInfo[] }> = ({
  children,
  state,
}) => {
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
          <HashTagPostsListWrapper />
        </StateWrapper>
      </RecoilRoot>
    );
    tagsContainer = getMountedComponent(
      wrapperWithItems,
      selectors.tagsContainer,
      3
    );
    tags = wrapperWithItems.find(selectors.hashTagCard);
    wrapperWithNoItems = mount(
      <RecoilRoot>
        <StateWrapper state={[]}>
          <HashTagPostsListWrapper />
        </StateWrapper>
      </RecoilRoot>
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
          <HashTagPostsListWrapper />
        </StateWrapper>
      </RecoilRoot>
    );
    wrapperWithNoItems = mount(
      <RecoilRoot>
        <StateWrapper state={[]}>
          <HashTagPostsListWrapper />
        </StateWrapper>
      </RecoilRoot>
    );
  });
  it("should match snapshot with items", () => {
    expect(wrapperWithItems).toMatchSnapshot();
  });
  it("should match snapshot without items", () => {
    expect(wrapperWithNoItems).toMatchSnapshot();
  });
});
