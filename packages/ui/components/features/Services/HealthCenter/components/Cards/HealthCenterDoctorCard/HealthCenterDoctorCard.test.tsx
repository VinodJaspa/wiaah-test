import React from "react";
import {
  HealthCenterDoctorCard,
  HealthCenterDoctorCardProps,
} from "./HealthCenterDoctorCard";
import { shallow, ShallowWrapper } from "enzyme";
import { randomNum } from "utils";

describe("HealthCenterDoctorCard", () => {
  let wrapper: ShallowWrapper;
  let props: HealthCenterDoctorCardProps;
  beforeEach(() => {
    props = {
      id: "123",
      name: "doctor name",
      photo: "test photo src",
      price: randomNum(15),
      specialty: "test speciality",
    };
    wrapper = shallow(<HealthCenterDoctorCard {...props} />);
  });
  it("should have an Avatar component with the right props", () => {
    const avatar = wrapper.find("Avatar");
    expect(avatar.length).toBe(1);
    expect(avatar.prop("src")).toBe(props.photo);
    expect(avatar.prop("alt")).toBe(props.name);
  });
  it("should have PriceDisplay component with the right props", () => {
    const price = wrapper.find("PriceDisplay");
    expect(price.length).toBe(1);
    expect(price.prop("price")).toBe(props.price);
  });
});
