import {
  AccountType,
  AttachmentType,
  ServicePresentationType,
} from "@features/API";
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
      createdAt: "",
      attachements: [
        {
          type: "image", // or "video"
          src: "https://example.com/placeholder.jpg",
        },
      ],
      cashback: {
        amount: 13,
        type: "cash",
      },
      discount: 10,
      attachments: [
        {
          src: "/shop.jpeg",
          type: ServicePresentationType.Img,
        },
        {
          src: "/video.np4",
          type: ServicePresentationType.Vid,
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
        id: "profile-12345", // Unique profile ID
        userId: "user-67890", // User ID associated with the profile
        verified: true, // Profile verification status
        name: "John Doe", // Profile name
        thumbnail: "https://example.com/profile.jpg", // Thumbnail URL for the profile picture
        accountType: AccountType.Seller, // Account type (e.g., admin, buyer, mod, etc.)
        public: true, // Profile visibility (public or private)
        profession: "Software Engineer", // User's profession
        publications: 25, // Number of publications/posts
        subscriptions: 10, // Number of subscriptions
        subscribers: 100, // Number of subscribers/followers
        location: {
          address: "123 Main St", // Address of the location
          city: "Springfield", // City where the location is
          lat: 37.12345, // Latitude of the location
          lon: -93.12345, // Longitude of the location
          state: "MO", // State (optional)
          country: "United States", // Country of the location
          postalCode: 12345, // Postal code
          countryCode: "US",
        }, // Location object
        bio: "Experienced software developer with a passion for technology.", // Bio text
        links: ["https://example.com", "https://github.com/johndoe"], // Array of profile links
        isFollowed: false, // Follow status
        profileCoverPhoto: "https://example.com/cover-photo.jpg", // Cover photo URL
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
      onCardClick(id) { },
      interactionsProps: {
        onInteraction(intraction) { },
        onShare(shareMothed) { },
      },
    };
    expect(
      shallow(<SocialServiceDetailsCard {...newProps} />),
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
