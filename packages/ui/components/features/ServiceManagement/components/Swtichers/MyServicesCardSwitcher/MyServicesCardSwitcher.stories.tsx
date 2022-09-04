import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MyServicesCardSwitcher } from "./MyServicesCardSwitcher";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: storybookServiceManagementCardsTitle + "MyServicesCardSwitcher",
  component: MyServicesCardSwitcher,
} as ComponentMeta<typeof MyServicesCardSwitcher>;

const template: ComponentStory<typeof MyServicesCardSwitcher> = (args) => (
  <MyServicesCardSwitcher {...args} />
);

export const HotelCard = template.bind({});
HotelCard.args = {
  data: {
    description: "test",
    id: "132",
    pricePerNight: 15,
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "hotel",
  },
};
export const RestaurantCard = template.bind({});
RestaurantCard.args = {
  data: {
    description: "test",
    id: "132",
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "restaurant",
  },
};

export const HolidayRentalsCard = template.bind({});
HolidayRentalsCard.args = {
  data: {
    description: "test",
    id: "132",
    pricePerNight: 15,
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "hotel",
  },
};

export const HealthCenterCard = template.bind({});
HealthCenterCard.args = {
  data: {
    description: "test",
    id: "132",
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "health_center",
  },
};

export const BeautyCenterCard = template.bind({});
BeautyCenterCard.args = {
  data: {
    description: "test",
    id: "132",
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "beauty_center",
  },
};
export const VehicleCard = template.bind({});
VehicleCard.args = {
  data: {
    description: "test",
    id: "132",
    provider: "wiaah",
    thumbnail: "/shop-3.jpeg",
    title: "card title",
    type: "vehicle",
  },
};
