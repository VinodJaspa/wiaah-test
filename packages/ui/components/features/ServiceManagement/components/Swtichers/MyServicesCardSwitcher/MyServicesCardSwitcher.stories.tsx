import { Meta, StoryFn } from "@storybook/react";
import { MyServicesCardSwitcher } from "./MyServicesCardSwitcher";
import { storybookServiceManagementCardsTitle } from "utils";

export default {
  title: "UI / Features /Service Management /Cards /MyServicesCardSwitcher",
  component: MyServicesCardSwitcher,
} as Meta<typeof MyServicesCardSwitcher>;

export const HotelCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      pricePerNight: 15,
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "hotel",
    },
  },
};

export const RestaurantCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "restaurant",
    },
  },
};

export const HolidayRentalsCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      pricePerNight: 15,
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "hotel",
    },
  },
};

export const HealthCenterCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "health_center",
    },
  },
};

export const BeautyCenterCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "beauty_center",
    },
  },
};

export const VehicleCard = {
  args: {
    data: {
      description: "test",
      id: "132",
      provider: "wiaah",
      thumbnail: "/shop-3.jpeg",
      title: "card title",
      type: "vehicle",
    },
  },
};
