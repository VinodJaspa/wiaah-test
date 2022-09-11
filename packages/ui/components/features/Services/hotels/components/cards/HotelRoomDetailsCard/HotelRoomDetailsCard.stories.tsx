import { storybookHotelCardsTitle } from "utils";
import { HotelRoomDetailsCard } from "./HotelRoomDetailsCard";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookHotelCardsTitle + "HotelRoomDetailsCard",
  component: HotelRoomDetailsCard,
} as ComponentMeta<typeof HotelRoomDetailsCard>;

const template: ComponentStory<typeof HotelRoomDetailsCard> = (args) => (
  <HotelRoomDetailsCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  title: "Executive Double Room, 1 double bed",
  thumbnails: ["/place-1.jpg", "/place-2.jpg"],
  amenities: [
    {
      name: "Kitchen",
      slug: "kitchen",
    },
    {
      name: "Televistion with Netflix",
      slug: "tv",
    },
    {
      name: "Washer",
      slug: "laundry",
    },
    {
      name: "Air conditioner",
      slug: "a/c",
    },
    {
      name: "Free Wifi",
      slug: "free_wifi",
    },
    {
      name: "Balcony or Patio",
      slug: "balcony",
    },
  ],
  price: 225,
  discount: {
    amount: 15,
    units: 5,
  },
  extras: [
    "Shower",
    "Toilet paper",
    "Toilet",
    "Tovels",
    "Private entrance",
    "Hairdryer",
    "Waredrop",
    "Toilet paper",
    "Shower",
    "Toilet",
    "Hairdryer",
    "Tovels",
    "Private entrance",
    "Waredrop",
  ],
  extraServices: [
    {
      cost: 0,
      name: "No extras",
    },
    {
      cost: 10,
      name: "Book now, pay later",
    },
    {
      cost: 50,
      name: "Breakfast",
    },
    {
      cost: 60,
      name: "Breakfast + Book now pay later",
    },
  ],
  includes: ["Breakfast", "Park"],
  size: {
    inMeter: 13,
    inFeet: 15,
  },
  id: "123",
  with_fees_and_taxes: true,
  cancelationPolicies: [
    {
      id: "1",
      cost: 0,
      duration: 7,
    },
    {
      id: "2",
      cost: 10,
      duration: 9,
    },
    {
      id: "3",
      cost: 50,
      duration: 0,
    },
    {
      id: "4",
      cost: 0,
      duration: 0,
    },
  ],
};
