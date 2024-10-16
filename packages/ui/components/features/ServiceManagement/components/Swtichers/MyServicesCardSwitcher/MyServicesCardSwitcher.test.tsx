import { shallow, ShallowWrapper } from "enzyme";
import {
  MyServicesCardSwitcher,
  MyServicesCardSwitcherProps,
} from "./MyServicesCardSwitcher";
import React from "react";

import { MyServiceData } from "api";

const services: MyServiceData[] = [
  {
    id: "1",
    title: "hotel service",
    description: "hotel service description",
    pricePerNight: 150,
    thumbnail: "/shop-2.jpeg",
    provider: "hotel service provider",
    type: "hotel",
    amenites: [{ name: "Bar", slug: "bar" }],
    cancelationPolicies: [{ cost: 15, duration: 2, id: "" }],
    extras: ["pool", "parking", "restaurant"],
    location: {
      address: "address",
      city: "city",
      lat: 456,
      lon: 45,
      country: "country",
      countryCode: "US",
      postalCode: 12345,
      state: "state",
    },
  },
  {
    id: "restaurant-456",
    title: "Gourmet Restaurant",
    thumbnail: "https://example.com/restaurant.jpg",
    provider: "Restaurant Provider",
    description: "A high-end restaurant with gourmet cuisine",
    type: "restaurant",
    averagePrice: 75,
    discount: { amount: 100, rule: "rule" },
    isGoodDeal: true,
    location: {
      address: "123 Main St",
      city: "Sample City",
      lat: 37.7749,
      lon: -122.4194,
      state: "Sample State", // optional
      country: "Sample Country",
      postalCode: 12345,
      countryCode: "SC", // for Sample Country
    },
    name: "Delicious Dishes",
    rate: 4.7,
    reviewsCount: 120,
    tags: ["Gourmet", "Fine dining"],
    thumbnails: [
      "https://example.com/restaurant1.jpg",
      "https://example.com/restaurant2.jpg",
    ],
  },
  {
    id: "health-center-789",
    title: "Health Clinic",
    thumbnail: "https://example.com/health-center.jpg",
    provider: "Health Center Provider",
    description: "Comprehensive healthcare services",
    type: "health_center",
    location: {
      address: "123 Main St",
      city: "Sample City",
      lat: 37.7749,
      lon: -122.4194,
      state: "Sample State", // optional
      country: "Sample Country",
      postalCode: 12345,
      countryCode: "SC", // for Sample Country
    },
    specialty: "General Healthcare",
    workingDates: [
      {
        date: new Date().toString(), // Example: current date as a placeholder
        workingHoursRanges: [
          {
            from: "09:00",
            to: "17:00",
          },
        ],
      },
      {
        date: new Date().toString(), // Example: current date as a placeholder
        workingHoursRanges: [
          {
            from: "09:00",
            to: "17:00",
          },
        ],
      },
    ],
  },
  {
    id: "beauty-center-101",
    title: "Beauty Salon",
    thumbnail: "https://example.com/beauty-center.jpg",
    provider: "Beauty Provider",
    description: "Top-notch beauty treatments and services",
    type: "beauty_center",
    name: "Glamour Beauty Center",
    owners: ["Owner 1", "Owner 2"],
    rate: 4.8,
    reviews: 85,
  },
  {
    id: "holiday-rental-202",
    title: "Beach House Rental",
    thumbnail: "https://example.com/holiday-rental.jpg",
    provider: "Holiday Rentals Provider",
    description: "A cozy beach house for your holiday stay",
    pricePerNight: 300,
    type: "holiday_rentals",
    extras: ["Ocean view", "Private pool"],
    location: {
      address: "123 Main St",
      city: "Sample City",
      lat: 37.7749,
      lon: -122.4194,
      state: "Sample State", // optional
      country: "Sample Country",
      postalCode: 12345,
      countryCode: "SC", // for Sample Country
    },
    cancelationPolicies: [
      {
        duration: 24,
        cost: 50,
        id: "policy123",
      },
    ],
    amenites: [
      {
        name: "Free WiFi", // Example: amenity name
        slug: "free-wifi", // Example: amenity slug
      },
      {
        name: "Swimming Pool", // Another example amenity
        slug: "swimming-pool",
      },
    ],
  },
  {
    id: "vehicle-303",
    title: "SUV Rental",
    thumbnail: "https://example.com/vehicle.jpg",
    provider: "Vehicle Rentals",
    description: "Luxury SUV for rent",
    type: "vehicle",
    pricePerDay: 100,
    vehicleProps: [
      {
        type: "a/c", // Example: a boolean property type
        value: true, // Example: a boolean value
      },
      {
        type: "gps", // Another boolean property type
        value: false, // Example: another boolean value
      },
      {
        type: "passengers", // Example: a numeric property type
        value: 4, // Example: a numeric value
      },
      {
        type: "windows", // Another numeric property type
        value: 6, // Example: another numeric value
      },
      {
        type: "bags", // Another numeric property type
        value: 2, // Example: another numeric value
      },
    ],
    location: {
      address: "123 Main St",
      city: "Sample City",
      lat: 37.7749,
      lon: -122.4194,
      state: "Sample State", // optional
      country: "Sample Country",
      postalCode: 12345,
      countryCode: "SC", // for Sample Country
    },
    cancelationPolicies: [
      {
        duration: 24,
        cost: 50,
        id: "policy123",
      },
    ],
  },
];

describe("MyServicesCardSwticher", () => {
  let wrapper: ShallowWrapper;
  let props: MyServicesCardSwitcherProps = {
    onEdit() { },
    onRemove() { },
    //@ts-ignore
    data: { ...services[0], type: "" },
  };

  beforeEach(() => {
    wrapper = shallow(<MyServicesCardSwitcher {...props} />);
  });

  it("should match snapshot with invalid service type", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with hotel service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[0]} />),
    ).toMatchSnapshot();
  });
  it("should match snapshot with restaurant service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[1]} />),
    ).toMatchSnapshot();
  });
  it("should match snapshot with health center service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[2]} />),
    ).toMatchSnapshot();
  });
  it("should match snapshot with beauty center service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[3]} />),
    ).toMatchSnapshot();
  });
  it("should match snapshot with holiday rentals service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[4]} />),
    ).toMatchSnapshot();
  });
  it("should match snapshot with vehicle service type", () => {
    expect(
      shallow(<MyServicesCardSwitcher {...props} data={services[5]} />),
    ).toMatchSnapshot();
  });
});
