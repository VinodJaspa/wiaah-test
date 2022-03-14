import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BuyerComment } from "../BuyerComment";
export default {
  title: "UI/blocks/BuyerComment",
  component: BuyerComment,
} as ComponentMeta<typeof BuyerComment>;

const Template: ComponentStory<typeof BuyerComment> = (args) => (
  <BuyerComment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "John",
  date: "08-Oct-2020",
  rating: 4,
  comment: "Really great product highly recommand it",
};
