import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SocialServiceCardDetails,
  SocialServiceCardDetailsProps,
} from "./SocialServiceCardDetails";

describe("SocialServiceCardDetails tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServiceCardDetailsProps;

  beforeEach(() => {
    props = {
      price: 90,
      rating: 4.2,
      title: "ServicePostTitle",
      views: 150,
      user: {
        accountType: "buyer",
        id: "135",
        name: "ServiceName",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verifed: true,
      },
    };
    wrapper = shallow(<SocialServiceCardDetails {...props} />);
  });
  it("should match snapshot with required props", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    wrapper = shallow(
      <SocialServiceCardDetails {...props} onFollow={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should have follow button with handleFollowClick prop, and it should trigger mockOnFollow with the right id", () => {
    const mockOnFollow = jest.fn();
    wrapper = shallow(
      <SocialServiceCardDetails {...props} onFollow={mockOnFollow} />
    );
    const followButton = wrapper.findWhere(
      (node) => node.name() === "Button" && node.prop("children") === "Follow"
    );
    expect(followButton.length).toBe(1);
    followButton.simulate("click");
    expect(mockOnFollow).toBeCalledTimes(1);
  });
});
