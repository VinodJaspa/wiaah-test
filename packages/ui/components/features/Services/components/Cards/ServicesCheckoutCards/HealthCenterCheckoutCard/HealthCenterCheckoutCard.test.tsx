import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import {
  HealthCenterCheckoutCard,
  HealthCenterCheckoutCardProps,
} from "./HealthCenterCheckoutCard";
import { randomNum } from "utils";
import { HealthCenterDoctorAvailablityStatus } from "@features/API/gql/generated";

describe("HealthCenterCheckoutCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: HealthCenterCheckoutCardProps;
  beforeEach(() => {
    props = {
      serviceType: "health_center",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 60,
        duration: 0,
        id: "12",
      },

      reviews: randomNum(153),
      thumbnail:
        "https://www.astate.edu/a/student-health-center/images/student-health-750px.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",

      duration: [30, 60],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
      doctor: {
        id: "123",
        rating: 3,
        name: "Doctor 1",
        specialty: "spine",
        description: "doctor description",
        healthCenterId: "3",
        price: randomNum(50),
        availabilityStatus: HealthCenterDoctorAvailablityStatus.Available,
        photo:
          "https://img.freepik.com/premium-photo/mature-doctor-hospital_256588-179.jpg?w=2000",
      },
    };
    wrapper = shallow(<HealthCenterCheckoutCard {...props} />);
  });
  it("should be contained in the ServiceCheckoutCommonCardWrapper", () => {
    expect(wrapper.name()).toBe("ServiceCheckoutCommonCardWrapper");
  });
  it("should have the HealthCenterDoctorCard component with the right props", () => {
    const doctorCard = wrapper.find("HealthCenterDoctorCard");
    expect(doctorCard.length).toBe(1);
    expect(doctorCard.props()).toEqual(expect.objectContaining(props.doctor));
  });
  it("should display the number of guests", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `Guests:${props.guests}`)
        .length,
    ).toBe(1);
  });
});
