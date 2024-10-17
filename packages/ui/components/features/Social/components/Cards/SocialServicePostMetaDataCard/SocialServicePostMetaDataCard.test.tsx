import { TypeOfService } from "@features/API";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {
  SocialServicePostMetaDataCard,
  SocialServicePostMetaDataCardProps,
} from "./SocialServicePostMetaDataCard";

describe("SocialServicePostMetaDataCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServicePostMetaDataCardProps;
  let mockOnClick: jest.Mock;
  beforeEach(() => {
    mockOnClick = jest.fn();
    props = {
      post: {
        id: "post-id",
        userId: "user-id",
        comments: 10,
        reactionNum: 200,
        shares: 5,
        createdAt: new Date().toISOString(),
        views: 1000,
        location: {
          address: "123 Main St",
          city: "Sample City",
          state: "Sample State",
          country: "Sample Country",
        },
        serviceId: "service-id",
        serviceType: TypeOfService.Vehicle,
        service: {
          id: "service-id",
          thumbnail: "https://example.com/sample-thumbnail.jpg",
          price: 49.99,
          rating: 4.5,
          title: "Sample Service Title",
        },
        user: {
          id: "user-id",
          profile: {
            id: "profile-id",
            username: "sampleUser",
            verified: true,
            profession: "Software Engineer",
            photo: "https://example.com/sample-photo.jpg",
            followers: 1000,
          },
        },
      },
    };
    wrapper = shallow(
      <SocialServicePostMetaDataCard {...props} onClick={mockOnClick} />,
    );
  });
  it("should trigger mockOnClick on card click", () => {
    wrapper.simulate("click");
    expect(mockOnClick).toBeCalledTimes(1);
  });
  it("should match snapshot with required props", () => {
    wrapper = shallow(<SocialServicePostMetaDataCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
