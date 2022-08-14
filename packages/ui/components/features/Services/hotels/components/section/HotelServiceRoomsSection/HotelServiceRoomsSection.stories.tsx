import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomNum, storybookHotelSectionTitle } from "utils";
import { HotelServiceRoomsSection } from "./HotelServiceRoomsSection";

export default {
  title: storybookHotelSectionTitle + "HotelServiceRoomsSection",
  component: HotelServiceRoomsSection,
} as ComponentMeta<typeof HotelServiceRoomsSection>;

const template: ComponentStory<typeof HotelServiceRoomsSection> = (args) => (
  <HotelServiceRoomsSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  rooms: [...Array(9)].map((_, i) => ({
    includes: ["breakfast", "park"],
    discount: {
      amount: randomNum(50),
      units: randomNum(10),
    },
    size: {
      inFeet: 30,
      inMeter: 13,
    },
    id: `${i}`,
    title: "Executive Double Room, 1 double bed",
    thumbnails: ["/place-2.jpg", "/place-1.jpg"],
    extras: [
      "Free toiletries",
      "Shower",
      "Toilet",
      "Towels",
      "Private entrance",
      "Hairdryer",
      "Wardrobe or closet",
      "Upper floors accessible by elevator",
      "Toilet paper",
      "Free toiletries",
      "Shower",
      "Toilet",
      "Towels",
      "Private entrance",
      "Hairdryer",
      "Wardrobe or closet",
      "Upper floors accessible by elevator",
      "Toilet paper",
    ],

    cancelationPolicies: [
      {
        duration: 6,
        cost: 0,
        id: "1",
      },
      {
        duration: 10,
        cost: 10,
        id: "2",
      },
      {
        cost: 50,
        duration: 0,
        id: "3",
      },
      {
        id: "4",
        cost: 0,
        duration: 0,
      },
    ],
    amenities: [
      {
        name: "Laundry",
        slug: "laundry",
      },
      {
        name: "Housekeeping",
        slug: "housekeeping",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Air conditioning",
        slug: "a/c",
      },
      {
        name: "Laundry",
        slug: "laundry",
      },
      {
        name: "Housekeeping",
        slug: "housekeeping",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Air conditioning",
        slug: "a/c",
      },
      {
        name: "Laundry",
        slug: "laundry",
      },
      {
        name: "Housekeeping",
        slug: "housekeeping",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Air conditioning",
        slug: "a/c",
      },
    ],
    with_fees_and_taxes: true,
    price: 225,
  })),
};
