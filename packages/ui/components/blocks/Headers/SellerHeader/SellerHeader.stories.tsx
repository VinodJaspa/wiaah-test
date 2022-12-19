import React from "react";
import { storybookHeadersTitle } from "utils";
import { SellerHeader } from "@UI";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookHeadersTitle + "SellerHeader",
  component: SellerHeader,
} as ComponentMeta<typeof SellerHeader>;

const Templete: ComponentStory<typeof SellerHeader> = (args) => (
  <SellerHeader {...args} />
);

export const Default = Templete.bind({});
