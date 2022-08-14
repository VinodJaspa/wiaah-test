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
      serviceType: "beauty_center",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 0,
        duration: 4,
        id: "12",
      },
      duration: [30, 60],
      reviews: randomNum(153),
      thumbnail:
        "https://www.ariostea-high-tech.com/img/progetti/hotel-spa-wellness/U714/big/Tacha+Beauty+Center-01.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
      bookedTreatments: [
        {
          id: "123",
          category: "Facial",
          title: "Hydro facial with chemical peel",
          durationInMinutes: [30, 60],
          price: randomNum(50),
          discount: randomNum(60),
        },
        {
          id: "123",
          category: "Facial",
          title: "Hydro facial with chemical peel",
          durationInMinutes: [30, 60],
          price: randomNum(50),
          discount: randomNum(60),
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
      props.bookedTreatments.length
    );
  });
  it("should display the treatment items with the right components with the right props", () => {
    const items = wrapper.find(getTestId(testids.bookedTreatmentItem));
    items.forEach((item, i) => {
      // expect title
      expect(
        item.findWhere(
          (node) => node.text() === props.bookedTreatments[i].title
        )
      );

      // expect TimeRangeDisplay component
      expect(item.find("TimeRangeDisplay").length).toBe(1);
      expect(item.find("TimeRangeDisplay").prop("rangeInMinutes")).toEqual(
        props.bookedTreatments[i].durationInMinutes
      );

      // expect PriceDisplay component
      expect(item.find("PriceDisplay").length).toBe(1);
      expect(item.find("PriceDisplay").prop("price")).toBe(
        props.bookedTreatments[i].price
      );
    });
  });
});
