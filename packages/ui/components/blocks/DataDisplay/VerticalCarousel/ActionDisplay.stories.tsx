import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { VerticalCarousel } from "@UI";
export default {
  title: "UI/blocks/Data Display/ActionsDisplay",
  component: VerticalCarousel,
} as ComponentMeta<typeof VerticalCarousel>;

const Template: ComponentStory<typeof VerticalCarousel> = ({ h, ...args }) => (
  <div className="h-[30rem] w-[20rem]">
    <VerticalCarousel h={"24rem"} {...args}>
      {[...Array(10)].map((_, i) => (
        <div className="h-96  bg-green-400">test {i}</div>
      ))}
    </VerticalCarousel>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
export const WithGap = Template.bind({});
WithGap.args = {
  gap: 16,
};
