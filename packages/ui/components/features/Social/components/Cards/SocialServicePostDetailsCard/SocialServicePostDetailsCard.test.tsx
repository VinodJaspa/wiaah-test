import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SocialServicePostDetailsCard,
  SocialServicePostDetailsCardProps,
} from "./SocialServicePostDetailsCard";

describe("SocialServicePostDetails tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServicePostDetailsCardProps;
  beforeEach(() => {
    props = {
      id: "123",
      content: "service content",
      createdAt: new Date(2022, 8, 15).toString(),
      hashtags: ["fashion", "gaming"],
      label: "restaurant",
      name: "service name",
      attachements: [
        {
          type: "image",
          src: "/shop-2.jpeg",
        },
      ],
      postInteraction: {
        comments: 50,
        likes: 100,
      },
      type: "restaurant",
      user: {
        accountType: "seller",
        id: "1312",
        name: "username",
        public: true,
        thumbnail: "/shop.jpeg",
        verified: true,
      },
    };
    wrapper = shallow(<SocialServicePostDetailsCard {...props} />);
  });

  it("should match snapshot with required props", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    wrapper = shallow(
      <SocialServicePostDetailsCard
        {...props}
        onServiceClick={(...props) => ({ ...props })}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
