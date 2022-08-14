import { storybookPartailsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Slider } from "./Slider";
import React from "react";

export default {
  title: storybookPartailsTitle + "Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;

const template: ComponentStory<typeof Slider> = ({ children, ...args }) => (
  <div className="w-full h-96 border border-blue-400">
    <Slider {...args}>
      {[...Array(10)].map((child, i) => (
        <div key={i} className="w-full h-full px-1">
          <div className="bg-primary-700 h-full w-full">item {i}</div>
        </div>
      ))}
    </Slider>
  </div>
);

export const Default = template.bind({});
Default.args = {
  // itemsCount: 2,
  leftArrowComponent: <div> {"<"} </div>,
  rightArrowComponent: <div> {">"} </div>,
};

export const vertical = template.bind({});
vertical.args = {
  // itemsCount: 1,
  variant: "vertical",
  upArrowComponent: <div> {"<"} </div>,
  downArrowComponent: <div> {">"} </div>,
};
export const withGap = template.bind({});
withGap.args = {
  gap: 64,
  leftArrowComponent: <div> {"<"} </div>,
  rightArrowComponent: <div> {">"} </div>,
};
