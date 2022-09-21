import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HotelMarketDescriptionSection } from "./HotelMarketDescriptionSection";
import { storybookHotelSectionTitle } from "utils";

export default {
  title: storybookHotelSectionTitle + "HotelMarketDescriptionSection",
  component: HotelMarketDescriptionSection,
} as ComponentMeta<typeof HotelMarketDescriptionSection>;

const template: ComponentStory<typeof HotelMarketDescriptionSection> = (
  args
) => <HotelMarketDescriptionSection {...args} />;

export const Default = template.bind({});
Default.args = {
  name: "hotel service ",
  description: "hotel descrption",
  proprtyType: "hotel",
};
