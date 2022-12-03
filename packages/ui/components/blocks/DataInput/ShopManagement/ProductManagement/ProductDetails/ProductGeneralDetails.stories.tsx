import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProductGeneralDetails } from "./index";
export default {
  title:
    "UI/blocks/Data Input/ShopManagement/ProductManagement/ProductGeneralDetails",
  component: ProductGeneralDetails,
} as ComponentMeta<typeof ProductGeneralDetails>;

const Template: ComponentStory<typeof ProductGeneralDetails> = (args) => (
  <ProductGeneralDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {};
