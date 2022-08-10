import React from "react";
import { HotelCheckoutCard, HotelCheckoutCardProps } from "./HotelCheckoutCard";
import { shallow, ShallowWrapper } from "enzyme";
import { getTestId, randomNum } from "utils";

const testids = {
  extrasContainer: "extrasContainer",
  extrasItem: "extraItem",
};

describe("HotelCheckoutCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: HotelCheckoutCardProps;
  beforeEach(() => {
    props = {
      serviceType: "hotel",
      bookedDates: {
        from: new Date(Date.now()).toString(),
        to: new Date(Date.now()).toString(),
      },
      rate: randomNum(5),
      refundingRule: {
        cost: 12,
        duration: 3,
        id: "12",
      },

      reviews: randomNum(153),
      thumbnail: "/place-1.jpg",
      id: "123",
      rateReason: "cleanliness",
      title: "Citadines Montmartre Paris",
      duration: [30, 60],
      extras: [
        {
          name: "Breakfast + book now, pay later",
          price: randomNum(100),
        },
      ],
      guests: randomNum(5),
      cashback: {
        amount: randomNum(20),
        type: "percent",
      },
      price: randomNum(500),
    };
    wrapper = shallow(<HotelCheckoutCard {...props} />);
  });

  it("should be contained in the ServiceCheckoutCommonCardWrapper", () => {
    expect(wrapper.name()).toBe("ServiceCheckoutCommonCardWrapper");
  });
  it("should display the guests properly", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `Guests:${props.guests}`)
        .length
    ).toBe(1);
  });
  it("should display extras properly", () => {
    const extrasContainer = wrapper.find(getTestId(testids.extrasContainer));
    const extraItems = extrasContainer.find(getTestId(testids.extrasItem));
    expect(extraItems.length).toBe(props.extras.length);
    expect(extrasContainer.text()).toContain("Extras:");
    extraItems.forEach((item, i) => {
      const priceDisplay = item.find("PriceDisplay");
      expect(item.text()).toContain(props.extras[i].name);
      expect(priceDisplay.length).toBe(1);
      expect(priceDisplay.prop("price")).toBe(props.extras[i].price);
    });
  });
});
