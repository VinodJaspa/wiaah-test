import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import {
  BeautyCenterCheckoutCard,
  BeautyCenterCheckoutCardProps,
} from "./BeautyCenterCheckoutCard";
import { getTestId, randomNum } from "utils";

const testids = {
  bookedTreatmentItem: "BookedTreatmentItem",
};

describe("BeautyCenterCheckoutCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: BeautyCenterCheckoutCardProps;
  beforeEach(() => {
    props = {
      children: <></>,
      serviceType: "beauty_center", // Replace with a valid ServicesType value
      id: "service-123",
      title: "Luxury Facial Treatment",
      thumbnail: "https://example.com/thumbnail.jpg", // Replace with a valid image URL
      rate: 4.5,
      reviews: 50,
      refundingRule: {
        duration: 7, // Duration in days for cancellation
        cost: 50, // Cost for cancellation
        id: "policy-456",
      },
      rateReason: "Highly rated by clients",
      bookedDates: {
        from: "2024-10-20T10:00:00Z", // ISO 8601 date format
        to: "2024-10-20T12:00:00Z", // ISO 8601 date format
      },
      cashback: {
        amount: 10, // Amount of cashback
        type: "cash", // Cashback type, could be "cash" or "percent"
      },
      price: 150, // Price of the service
      duration: [60, 90], // Duration of treatments in minutes
      guests: null, // Nullable for guests; can be set to a number if needed
      bookedTreatments: [
        {
          id: "treatment-001", // Unique identifier for the treatment
          category: "Skincare", // Category of the treatment
          title: "Hydrating Facial", // Title of the treatment
          price: 80, // Price of the treatment
          durationInMinutes: [60, 75], // Duration of the treatment in minutes (must have 1-2 entries)
          discount: 15, // Discount value, e.g., in dollars
        },
        {
          id: "treatment-001", // Unique identifier for the treatment
          category: "Skincare", // Category of the treatment
          title: "Hydrating Facial", // Title of the treatment
          price: 80, // Price of the treatment
          durationInMinutes: [60, 75], // Duration of the treatment in minutes (must have 1-2 entries)
          discount: 15, // Discount value, e.g., in dollars
        },
      ],
    };
    wrapper = shallow(<BeautyCenterCheckoutCard {...props} />);
  });

  it("should be contained in the ServiceCheckoutCommonCardWrapper component", () => {
    expect(wrapper.name()).toBe("ServiceCheckoutCommonCardWrapper");
  });
  it("should display the treatments list properly", () => {
    expect(wrapper.find(getTestId(testids.bookedTreatmentItem)).length).toBe(
      props.bookedTreatments.length,
    );
  });
  it("should display the treatment items with the right components with the right props", () => {
    const items = wrapper.find(getTestId(testids.bookedTreatmentItem));
    items.forEach((item, i) => {
      // expect title
      expect(
        item.findWhere(
          (node) => node.text() === props.bookedTreatments[i].title,
        ),
      );

      // expect TimeRangeDisplay component
      expect(item.find("TimeRangeDisplay").length).toBe(1);
      expect(item.find("TimeRangeDisplay").prop("rangeInMinutes")).toEqual(
        props.bookedTreatments[i].durationInMinutes,
      );

      // expect PriceDisplay component
      expect(item.find("PriceDisplay").length).toBe(1);
      expect(item.find("PriceDisplay").prop("price")).toBe(
        props.bookedTreatments[i].price,
      );
    });
  });
});
