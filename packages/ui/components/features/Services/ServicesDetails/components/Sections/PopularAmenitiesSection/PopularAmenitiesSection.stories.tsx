import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { PopularAmenitiesSection } from "./PopularAmenitiesSection";

export default {
  title: storybookOtherServicesSectionsTitle + "PopularAmenitiesSection",
  component: PopularAmenitiesSection,
} as ComponentMeta<typeof PopularAmenitiesSection>;

const template: ComponentStory<typeof PopularAmenitiesSection> = (args) => (
  <PopularAmenitiesSection {...args} />
);

export const Default = template.bind({});
Default.args = {
  amenities: [
    {
      name: "Pool",
      slug: "pool",
    },
    {
      name: "Pet-friendly",
      slug: "pet-friendly",
    },
    {
      name: "Resturant",
      slug: "resturant",
    },
    {
      name: "Breakfast available",
      slug: "breakfast",
    },
    {
      name: "Parking available",
      slug: "parking",
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
      name: "Gym",
      slug: "gym",
    },
    {
      name: "Business services",
      slug: "business_services",
    },
    {
      name: "Bar",
      slug: "bar",
    },
    {
      name: "Room service",
      slug: "room_service",
    },
    {
      name: "24/7 front desk",
      slug: "24/7_front_desk",
    },
  ],
};

export const moreCols = template.bind({});
moreCols.args = {
  amenities: [
    {
      name: "Pool",
      slug: "pool",
    },
    {
      name: "Pet-friendly",
      slug: "pet-friendly",
    },
    {
      name: "Resturant",
      slug: "resturant",
    },
    {
      name: "Breakfast available",
      slug: "breakfast",
    },
    {
      name: "Parking available",
      slug: "parking",
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
      name: "Gym",
      slug: "gym",
    },
    {
      name: "Business services",
      slug: "business_services",
    },
    {
      name: "Bar",
      slug: "bar",
    },
    {
      name: "Room service",
      slug: "room_service",
    },
    {
      name: "24/7 front desk",
      slug: "24/7_front_desk",
    },
  ],
  cols: 3,
};
