import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { PostAttachment } from "types/market/Social";
import { HashTagCard } from "@UI";
import { getMountedComponent } from "@UI/components/helpers/test/getMountedComponent";
import { hashtagCardInfoPlaceholder } from "@UI/placeholder";
const selectors = {
  postAttachment: "[data-testid='PostAttachment']",
  viewPostBtn: "[data-testid='ViewPostBtn']",
  cardTitle: "[data-testid='CardTitle']",
};

const cardPlaceholder = hashtagCardInfoPlaceholder;

describe("HashTagCard render tests", () => {
  let wrapper: ReactWrapper;
  let postAttachment: ReactWrapper;
  let viewPostBtn: ReactWrapper;
  let cardTitle: ReactWrapper;
  let onViewPostMock: jest.Mock;
  beforeEach(() => {
    onViewPostMock = jest.fn();
    wrapper = mount(
      <HashTagCard
        onViewPost={onViewPostMock}
        {...cardPlaceholder}
        title={"test title"}
      />
    );
    postAttachment = getMountedComponent(wrapper, selectors.postAttachment, 3);
    viewPostBtn = getMountedComponent(wrapper, selectors.viewPostBtn, 3);
    cardTitle = getMountedComponent(wrapper, selectors.cardTitle, 3);
  });
  it("should have the right elements", () => {
    expect(postAttachment.length).toBe(1);
    expect(viewPostBtn.length).toBe(1);
    expect(cardTitle.length).toBe(1);
  });
  it("should have the right title", () => {
    expect(cardTitle.text()).toBe("test title");
  });
  it("should have img tag with the right src if the provided type is 'image'", () => {
    let attachment: PostAttachment = { src: "/shop.jpeg", type: "image" };
    wrapper = mount(
      <HashTagCard
        onViewPost={onViewPostMock}
        {...cardPlaceholder}
        attachment={attachment}
      />
    );
    const img = wrapper.find("img");
    expect(img.length).toBe(1);
    expect(img.props().src).toBe(attachment.src);
  });
  it("should have video tag with the right src if the provided type is 'video'", () => {
    let attachment: PostAttachment = { src: "/video.mp4", type: "video" };
    wrapper = mount(
      <HashTagCard
        onViewPost={onViewPostMock}
        {...cardPlaceholder}
        attachment={attachment}
      />
    );
    const video = wrapper.find("video");
    expect(video.length).toBe(1);
    expect(video.props().src).toBe(attachment.src);
  });
});

describe("HashTagCard functionality tests", () => {
  let wrapper: ShallowWrapper;
  let postAttachment: ShallowWrapper;
  let viewPostBtn: ShallowWrapper;
  let cardTitle: ShallowWrapper;
  let onViewPostMock: jest.Mock;
  beforeEach(() => {
    onViewPostMock = jest.fn();
    wrapper = shallow(
      <HashTagCard onViewPost={onViewPostMock} {...cardPlaceholder} />
    );
    postAttachment = wrapper.find(selectors.postAttachment);
    viewPostBtn = wrapper.find(selectors.viewPostBtn);
    cardTitle = wrapper.find(selectors.cardTitle);
  });
  it("should call the onViewPost callback on view post button click", () => {
    viewPostBtn.simulate("click");
    expect(onViewPostMock).toBeCalledTimes(1);
  });
});

describe("HashTagCard snapshot tests", () => {
  let wrapper: ShallowWrapper;
  let onViewPostMock: jest.Mock;
  beforeEach(() => {
    onViewPostMock = jest.fn();
    wrapper = shallow(
      <HashTagCard onViewPost={onViewPostMock} {...cardPlaceholder} />
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with video post", () => {
    wrapper = shallow(
      <HashTagCard
        onViewPost={onViewPostMock}
        {...cardPlaceholder}
        attachment={{ src: "/video.mp4", type: "video" }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
