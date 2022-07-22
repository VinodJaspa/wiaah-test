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
  fees_and_taxes: true,
  price: 225,
};
