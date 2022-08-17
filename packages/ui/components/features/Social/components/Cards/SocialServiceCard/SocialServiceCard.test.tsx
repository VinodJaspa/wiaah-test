import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SocialServicePostCard,
  SocialServicePostCardProps,
} from "./SocialServiceCard";

describe("SocialServiceCard component tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServicePostCardProps;

  beforeEach(() => {
    props = {
      id: "123",
      name: "service name",
      content: "service content",
      hashtags: ["fashion", "gaming"],
      label: "restaurant",
      thumbnail: "/shop-2.jpeg",
      createdAt: new Date(2022, 8, 15).toString(),
      postInteraction: {
        comments: 156,
        likes: 132,
      },
      type: "restaruant",
      user: {
        accountType: "seller",
        id: "135",
        name: "username",
        public: true,
        thumbnail: "/shop-3.jpeg",
        verified: true,
      },
    };
    wrapper = shallow(<SocialServicePostCard {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
