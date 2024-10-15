import { SubscribersUserInfo } from "@UI/../types/src";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { SubscriberCard } from ".";

const selectors = {
  userPhoto: "[data-testid='UserPhoto']",
  userName: "[data-testid='Username']",
  userInfo: "[data-testid='UserInfo']",
  followButton: "[data-testid='FollowBtn']",
};

const SubscriberPlaceholder: SubscribersUserInfo = {
  avatar: "/shop.jpeg",
  id: "1",
  name: "wiaah",
  profileUrl: "test",
};

describe("Subscriber component render tests", () => {
  let wrapper: ShallowWrapper;
  let userPhoto: ShallowWrapper;
  let userName: ShallowWrapper;
  let followBtn: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<SubscriberCard {...SubscriberPlaceholder} />);
    userPhoto = wrapper.find(selectors.userPhoto);
    userName = wrapper.find(selectors.userName);
    followBtn = wrapper.find(selectors.followButton);
  });
  it("should contain avatar component with the right props", () => {
    expect(userPhoto.prop("photoSrc")).toBe(SubscriberPlaceholder.avatar);
    expect(userPhoto.prop("name")).toBe(SubscriberPlaceholder.name);
  });
  it("should contain element with the right user name", () => {
    expect(userName.text()).toBe(SubscriberPlaceholder.name);
  });
});

describe("Subscriber component functionality tests", () => {
  let wrapper: ShallowWrapper;
  let userPhoto: ShallowWrapper;
  let userName: ShallowWrapper;
  let followBtn: ShallowWrapper;
  let userInfo: ShallowWrapper;
  let onFollowMock: jest.Mock;
  let onProfileClickMock: jest.Mock;
  beforeEach(() => {
    onFollowMock = jest.fn();
    onProfileClickMock = jest.fn();

    wrapper = shallow(
      <SubscriberCard
        onFollow={onFollowMock}
        onProfileClick={onProfileClickMock}
        {...SubscriberPlaceholder}
      />,
    );
    userInfo = wrapper.find(selectors.userInfo);
    userPhoto = wrapper.find(selectors.userPhoto);
    userName = wrapper.find(selectors.userName);
    followBtn = wrapper.find(selectors.followButton);
  });
  it("should call onfollow callback when follow button clicked", () => {
    followBtn.simulate("click");

    expect(onFollowMock).toBeCalledTimes(1);
  });
  it("should call onProfileClick when user info Clicked", () => {
    userInfo.simulate("click");
    expect(onProfileClickMock).toBeCalledTimes(1);
  });
});

describe("SubscriberCard component snapshot tests", () => {
  let wrapper: ShallowWrapper;
  let onFollowMock: jest.Mock;
  let onProfileClickMock: jest.Mock;
  beforeEach(() => {
    onFollowMock = jest.fn();
    onProfileClickMock = jest.fn();
    wrapper = shallow(
      <SubscriberCard
        onFollow={onFollowMock}
        onProfileClick={onProfileClickMock}
        {...SubscriberPlaceholder}
      />,
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
