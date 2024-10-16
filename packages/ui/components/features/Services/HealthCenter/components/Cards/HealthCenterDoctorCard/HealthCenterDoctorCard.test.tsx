import React from "react";
import {
  HealthCenterDoctorCard,
  HealthCenterDoctorCardProps,
} from "./HealthCenterDoctorCard";
import { shallow, ShallowWrapper } from "enzyme";
import { randomNum } from "utils";
import { HealthCenterDoctorAvailablityStatus } from "@features/API";

describe("HealthCenterDoctorCard", () => {
  let wrapper: ShallowWrapper;
  let props: HealthCenterDoctorCardProps;
  beforeEach(() => {
    props = {
      doctor: {
        __typename: "Doctor",
        availablityStatus: HealthCenterDoctorAvailablityStatus.Available,
        description: "Experienced physician specializing in cardiology.",
        healthCenterId: "hc-1",
        id: "doc-1",
        name: "Dr. John Doe",
        price: 150.0,
        rating: 4.5,
        specialityId: "specialty-1",
        thumbnail: "https://example.com/path/to/thumbnail.jpg",
        speciality: {
          __typename: "HealthCenterSpecialty",
          id: "specialty-1",
          name: "Cardiology",
          description: "Specializes in heart-related conditions.",
        },
      },
    };
    wrapper = shallow(<HealthCenterDoctorCard {...props} />);
  });
  it("should have an Avatar component with the right props", () => {
    const avatar = wrapper.find("Avatar");
    expect(avatar.length).toBe(1);
    expect(avatar.prop("src")).toBe(props.doctor.thumbnail);
    expect(avatar.prop("alt")).toBe(props.doctor.name);
  });
  it("should have PriceDisplay component with the right props", () => {
    const price = wrapper.find("PriceDisplay");
    expect(price.length).toBe(1);
    expect(price.prop("price")).toBe(props.doctor.price);
  });
});
