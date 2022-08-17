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
      id: "132",
      label: "restaruant",
      name: "service name",
      thumbnail: "/shop-2.jpeg",
      type: "restaurant",
    };
    wrapper = shallow(
      <SocialServicePostMetaDataCard {...props} onClick={mockOnClick} />
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
