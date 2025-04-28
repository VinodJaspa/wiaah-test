import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { PostInteractions } from "@UI";

const selectors = {
  likes: "[data-testid='PostInteractionLikes']",
  comments: "[data-testid='PostInteractionComments']",
  shares: "[data-testid='PostInteractionShares']",
};

const PostInteractionsPlaceholder = {
  likes: 5,
  comments: 8,
};

describe("PostIntercation component render tests", () => {
  let wrapper: ShallowWrapper;
  let likes: ShallowWrapper;
  let comments: ShallowWrapper;
  let shares: ShallowWrapper;
  let onInteractionMock: jest.Mock;
  beforeEach(() => {
    onInteractionMock = jest.fn();
    wrapper = shallow(
      <PostInteractions
      shares={0}
        onInteraction={onInteractionMock}
        {...PostInteractionsPlaceholder}
      />
    );
    likes = wrapper.find(selectors.likes);
    comments = wrapper.find(selectors.comments);
    shares = wrapper.find(selectors.shares);
  });

  it("should have the right likes number", () => {
    expect(likes.length).toBe(1);
    expect(likes.text()).toContain(`${PostInteractionsPlaceholder.likes}`);
  });
  it("should have the right comments number", () => {
    expect(comments.length).toBe(1);
    expect(comments.text()).toContain(
      `${PostInteractionsPlaceholder.comments}`
    );
  });
});
describe("PostIntercation component functionality tests", () => {
  let wrapper: ShallowWrapper;
  let likes: ShallowWrapper;
  let comments: ShallowWrapper;
  let shares: ShallowWrapper;
  let onInteractionMock: jest.Mock;
  beforeEach(() => {
    onInteractionMock = jest.fn();
    wrapper = shallow(
      <PostInteractions
      shares={1}
        onInteraction={onInteractionMock}
        {...PostInteractionsPlaceholder}
      />
    );
    likes = wrapper.find(selectors.likes);
    comments = wrapper.find(selectors.comments);
    shares = wrapper.find(selectors.shares);
  });

  it("should call onInteraction callback with the right interaction name", () => {
    likes.simulate("click");
    expect(onInteractionMock).toBeCalledTimes(1);
    expect(onInteractionMock).toBeCalledWith({ type: "like" });
    comments.simulate("click");
    expect(onInteractionMock).toBeCalledTimes(2);
    expect(onInteractionMock).toBeCalledWith({ type: "comment" });
    shares.simulate("click");
    expect(onInteractionMock).toBeCalledTimes(3);
    expect(onInteractionMock).toBeCalledWith({ type: "share" });
  });
});

describe("PostInteractions Snapshot tests", () => {
  it("should match snapshot", () => {
    expect(
      shallow(<PostInteractions shares={0}{...PostInteractionsPlaceholder} />)
    ).toMatchSnapshot();
  });
});
