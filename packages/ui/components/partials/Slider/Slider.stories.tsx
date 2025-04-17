import { storybookPartailsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { Slider } from "./Slider";
import React from "react";

export default {
  title: "UI / partials / Slider",
  component: Slider,
} as Meta<typeof Slider>;

const template: StoryFn<typeof Slider> = ({ children, ...args }) => (
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

export const Default = {
  render: template,

  args: {
    // itemsCount: 2,
    leftArrowComponent: <div> {"<"} </div>,
    rightArrowComponent: <div> {">"} </div>,
  },
};

export const vertical = {
  render: template,

  args: {
    // itemsCount: 1,
    variant: "vertical",
    upArrowComponent: <div> {"<"} </div>,
    downArrowComponent: <div> {">"} </div>,
  },
};

export const withGap = {
  render: template,

  args: {
    gap: 64,
    leftArrowComponent: <div> {"<"} </div>,
    rightArrowComponent: <div> {">"} </div>,
  },
};

export const multiplyItems = {
  render: template,

  args: {
    itemsCount: 3,
    leftArrowComponent: <div> {"<"} </div>,
    rightArrowComponent: <div> {">"} </div>,
  },
};
