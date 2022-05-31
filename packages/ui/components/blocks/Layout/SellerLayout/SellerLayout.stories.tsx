import React from "react";
import { SellerLayout } from "ui";
import { storybookLayoutTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookLayoutTitle + "SellerLayout",
  component: SellerLayout,
} as ComponentMeta<typeof SellerLayout>;

const Templete: ComponentStory<typeof SellerLayout> = (args) => (
  <SellerLayout {...args} />
);

export const Default = Templete.bind({});
