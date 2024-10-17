import { ServicePresentationType } from "@features/Services";
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
    (props = {
      post: {
        id: "123",
        comments: 4,
        reactionNum: 0,
        service: {
          presentation: [
            {
              type: ServicePresentationType.Img,
              src: "",
            },
          ], // Assuming this is a type like "image", "video", etc.
          title: "Sample Service Title",
          hashtags: ["#example", "#service", "#placeholder"],
        },
      },
    }),
      (wrapper = shallow(<SocialServicePostDetailsCard {...props} />));
  });

  it("should match snapshot with required props", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    wrapper = shallow(
      <SocialServicePostDetailsCard
        {...props}
        onServiceClick={(...props) => ({ ...props })}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
