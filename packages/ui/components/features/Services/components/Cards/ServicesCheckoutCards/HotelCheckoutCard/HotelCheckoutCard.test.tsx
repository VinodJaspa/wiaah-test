import React from "react";
import {
  ServiceCheckoutCard,
  ServiceCheckoutCardProps,
} from "./HotelCheckoutCard";
import { shallow, ShallowWrapper } from "enzyme";
import { getTestId, randomNum } from "utils";
import { ServiceType } from "@features/API";

const testids = {
  extrasContainer: "extrasContainer",
  extrasItem: "extraItem",
};

describe("HotelCheckoutCard tests", () => {
  let wrapper: ShallowWrapper;
  let props: ServiceCheckoutCardProps;
  beforeEach(() => {
    props = {
      thumbnail: "https://example.com/images/service-thumbnail.jpg", // Service thumbnail URL
      name: "Luxury Health Retreat", // Name of the service
      shopName: "Wellness Center", // Shop/Service provider name
      fullAddress: "123 Wellness Ave, Health City, HC 12345", // Full address of the service
      amenities: [
        { slug: "spa", label: "Spa Services" },
        { slug: "pool", label: "Swimming Pool" },
        { slug: "gym", label: "Fitness Center" },
      ], // List of amenities available
      cancelationPolicy: {
        duration: 24, // Duration in hours for cancellation
        cost: 15.0, // Cost for cancelling the service
      },
      extras: [
        { name: "Late Check-out", cost: 30.0 },
        { name: "Breakfast Included", cost: 15.0 },
      ], // List of extra services
      guests: {
        adults: 2, // Number of adults
        childrens: 1, // Number of children
      },
      checkin: new Date("2024-11-01"), // Check-in date
      checkout: new Date("2024-11-05"), // Check-out date
      total: 500.0, // Total cost for the service
      serviceType: ServiceType.Hotel, // Hard-coded service type, ensure it matches the ServiceType definition
      doctors: [
        {
          thumbnail: "https://example.com/images/dr-jane-doe.jpg", // Doctor's thumbnail URL
          name: "Dr. Jane Doe", // Doctor's name
          speciality: "General Practitioner", // Doctor's specialty
          price: 100.0, // Price for the doctor's consultation
        },
      ], // Optional array of doctors
      treatments: [
        {
          name: "Relaxing Massage", // Name of the treatment
          price: 80.0, // Price of the treatment
          thumbnail: "https://example.com/images/massage.jpg", // Treatment thumbnail URL
          qty: 1, // Quantity of the treatment
        },
      ], // Optional array of treatments
      menus: [
        {
          name: "Healthy Breakfast Menu", // Name of the menu
          dishs: [
            {
              name: "Avocado Toast", // Name of the dish
              price: 10.0, // Price of the dish
              qty: 1, // Quantity of the dish
              ingredints: ["Avocado", "Bread", "Salt", "Pepper"], // Ingredients of the dish
              thumbnail: "https://example.com/images/avocado-toast.jpg", // Dish thumbnail URL
            },
            {
              name: "Fruit Smoothie", // Name of another dish
              price: 7.0, // Price of the dish
              qty: 1, // Quantity of the dish
              ingredints: ["Banana", "Strawberries", "Yogurt"], // Ingredients of the dish
              thumbnail: "https://example.com/images/fruit-smoothie.jpg", // Dish thumbnail URL
            },
          ],
        },
      ], // Optional array of menus
    };
    wrapper = shallow(<ServiceCheckoutCard {...props} />);
  });

  it("should be contained in the ServiceCheckoutCommonCardWrapper", () => {
    expect(wrapper.name()).toBe("ServiceCheckoutCommonCardWrapper");
  });
  it("should display the guests properly", () => {
    expect(
      wrapper.findWhere((node) => node.text() === `Guests:${props.guests}`)
        .length,
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
      expect(priceDisplay.prop("price")).toBe(props.extras[i].name);
    });
  });
});
