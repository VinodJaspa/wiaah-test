import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SocialServiceDetailsCard,
  SocialServiceDetailsCardProps,
} from "./SocialServiceDetailsCard";
let mockReactPubsubEmit: jest.Mock = jest.fn();
jest.mock("react-pubsub", () => ({
  useReactPubsub: () => ({
    emit: mockReactPubsubEmit,
  }),
}));
describe("SocialServiceDetailsCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServiceDetailsCardProps;
  beforeEach(() => {
    props = {
      name: "service name",
      content: "service content",
      cashback: {
        amount: 13,
        type: "cash",
      },
      discount: 10,
      attachments: [
        {
          src: "/shop.jpeg",
          type: "image",
        },
        {
          src: "/video.np4",
          type: "video",
        },
      ],
      hashtags: ["fashion", "gaming"],
      id: "132",
      label: "restaurant",
      postInteraction: {
        comments: 50,
        likes: 99,
      },
      price: 90,
      rate: 4,
      type: "restaurant",
      views: 300,
      profileInfo: {
        accountType: "seller",
        id: "121",
        name: "username",
        public: true,
        thumbnail: "/shop-2.jpeg",
        verified: true,
      },
    };
    wrapper = shallow(<SocialServiceDetailsCard {...props} />);
  });
  it("should match snapshot with required props only", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    const newProps: SocialServiceDetailsCardProps = {
      ...props,
      showComments: true,
      showInteraction: true,
      showCommentInput: true,
      onCardClick(id) {},
      interactionsProps: {
        onInteraction(intraction) {},
        onShare(shareMothed) {},
      },
    };
    expect(
      shallow(<SocialServiceDetailsCard {...newProps} />)
    ).toMatchSnapshot();
  });
  it("should emit openSharePostWithModal react pubsub event onShare with the right props", () => {
    wrapper = shallow(<SocialServiceDetailsCard {...props} showInteraction />);
    const onShareProp = wrapper.find("PostInteractions").prop("onShare");
    if (typeof onShareProp === "function") {
      onShareProp("facebook");
    }
    expect(mockReactPubsubEmit).toBeCalledWith({
      method: "facebook",
      id: props.id,
    });
  });
});
