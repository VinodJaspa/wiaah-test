import { Meta, StoryFn } from "@storybook/react";
import { HotelMarketDescriptionSection } from "./HotelMarketDescriptionSection";
import { storybookHotelSectionTitle } from "utils";

export default {
  title: "UI / Features /Hotel /Sections /HotelMarketDescriptionSection",
  component: HotelMarketDescriptionSection,
} as Meta<typeof HotelMarketDescriptionSection>;

export const Default = {
  args: {
    name: "hotel service ",
    description: "hotel descrption",
    proprtyType: "hotel",
  },
};
