import { AccountType, TypeOfService } from "@features/API";
import { SocialAccountTypeEnum } from "@UI/../validation";
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
      attachements: [
        {
          type: "image",
          src: "https://example.com/image1.jpg",
        },
        {
          type: "video",
          src: "https://example.com/video.mp4",
        },
      ],
      id: "123",
      name: "service name",
      content: "service content",
      hashtags: ["fashion", "gaming"],
      label: "restaurant",
      createdAt: new Date(2022, 8, 15).toString(),
      postInteraction: {
        shares: 100, // Placeholder number of shares
        views: 1000, // Placeholder number of views
        comments: 50, // Placeholder number of comments
        likes: 500,
      },
      type: TypeOfService.RestaurantMenu,
      user: {
        id: "12345", // Placeholder ID
        userId: "user123", // Placeholder user ID
        verified: true, // Placeholder for verified status
        name: "John Doe", // Placeholder name
        thumbnail: "https://example.com/avatar.jpg", // Placeholder thumbnail URL
        accountType: AccountType.Seller, // Placeholder for account type (adjust based on `SocialAccountTypeEnum`)
        public: true, // Placeholder for public status
        profession: "Software Engineer", // Placeholder profession
        publications: 10, // Placeholder number of publications
        subscriptions: 20, // Placeholder number of subscriptions
        subscribers: 100, // Placeholder number of subscribers
        location: {
          address: "123 Main St", // Placeholder address
          city: "New York", // Placeholder city
          lat: 40.7128, // Placeholder latitude
          lon: -74.006, // Placeholder longitude
          state: "NY", // Optional placeholder state
          country: "USA", // Placeholder country
          postalCode: 10001, // Placeholder postal code
          countryCode: "US",
        },
        bio: "I love coding and sharing knowledge!", // Placeholder bio
        links: [
          "https://linkedin.com/in/johndoe",
          "https://github.com/johndoe",
        ], // Placeholder links array
        isFollowed: false, // Placeholder follow status
        profileCoverPhoto: "https://example.com/coverphoto.jpg",
      },
      location: {
        address: "123 Main St", // Placeholder address
        city: "New York", // Placeholder city
        state: "NY", // Placeholder state
        country: "USA", // Placeholder country
      }, // Adding the required location property
      service: {
        id: "item-12345", // Unique identifier for the item
        thumbnail: "https://example.com/image.jpg", // Thumbnail URL for the item
        price: 99.99, // Price of the item
        rating: 4.5, // Rating of the item (out of 5)
        title: "Premium Health Service",
      }, // Adding the required service property
    };
    wrapper = shallow(<SocialServicePostCard {...props} />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
