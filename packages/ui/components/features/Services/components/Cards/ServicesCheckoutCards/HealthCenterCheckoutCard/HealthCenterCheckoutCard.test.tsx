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
      children: <></>,
      serviceType: "health_center", // Hard-coded service type
      id: "service-001", // Unique service ID
      title: "Comprehensive Health Checkup", // Title of the service
      thumbnail: "https://example.com/images/health-checkup.jpg", // Service thumbnail URL
      rate: 4.5, // Rating (out of 5)
      reviews: 120, // Total number of reviews
      refundingRule: {
        duration: 48, // Duration in hours before the service starts for cancellation
        cost: 10.0, // Cost of cancellation (e.g., a fee charged for cancelling)
        id: "policy-001", // Unique ID for the cancellation policy
      }, // Hard-coded refund policy
      rateReason: "High quality of service and care.", // Reason for the rate
      bookedDates: {
        from: "2024-11-01", // Start date of the booking
        to: null, // End date can be null if ongoing
      },
      cashback: {
        amount: 20.0, // Fixed cashback amount
        type: "cash",
      },
      price: 50.0, // Fixed price of the service
      duration: [30, 60], // Example durations in minutes
      guests: 2, // Hard-coded number of guests
      doctor: {
        id: "doctor-001", // Unique doctor ID
        name: "Dr. Jane Smith", // Doctor's name
        specialty: "Internal Medicine", // Doctor's specialty
        photo: "https://example.com/images/dr-jane-smith.jpg", // Doctor's photo URL
        price: 40.0, // Price for the doctor's service
        rating: 4.8, // Doctor's rating (out of 5)
        description:
          "Experienced internal medicine physician with 15 years of practice.", // Doctor's description
        healthCenterId: "healthcenter-001", // ID of the health center
        availabilityStatus: "available", // Doctor's availability status
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
