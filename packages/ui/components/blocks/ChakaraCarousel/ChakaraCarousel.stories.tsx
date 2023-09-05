import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChakraCarousel } from "./index";
export default {
  title: "UI/blocks/ChakaraCarousel",
  component: ChakraCarousel,
} as ComponentMeta<typeof ChakraCarousel>;

const Template: ComponentStory<typeof ChakraCarousel> = (args) => (
  <div className="h-96 w-[20rem]">
    <ChakraCarousel {...args}>
      {[...Array(10)].map((_, i) => (
        <div className="h-48  bg-green-400">test {i}</div>
      ))}
    </ChakraCarousel>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
export const WithGap = Template.bind({});
WithGap.args = {
  gap: 16,
};

export const WithArrows = Template.bind({});
WithArrows.args = {
  arrows: true,
  h: "100%",
};
