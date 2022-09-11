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
};

export const moreCols = template.bind({});
moreCols.args = {
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
  cols: 3,
};
