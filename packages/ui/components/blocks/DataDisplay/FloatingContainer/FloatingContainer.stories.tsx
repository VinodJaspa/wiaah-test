import React from "react";
import { FloatingContainer, storybookDataDisplayBlocksTitle } from "@UI";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI / blocks / Data Display /FloatingContainer",
  component: FloatingContainer,
} as Meta<typeof FloatingContainer>;

const Templete: StoryFn<typeof FloatingContainer> = (args) => (
  <FloatingContainer {...args}>
    <div className="align-center flex h-96 w-96 justify-center bg-purple-600 text-white">
      Children
    </div>
  </FloatingContainer>
);

export const Default = {
  render: Templete,
  args: {},
};

export const WithFloatingItems = {
  render: Templete,

  args: {
    items: [
      {
        label: <div className="bg-orange-400">top left</div>,
        top: true,
        left: true,
      },
      {
        label: <div className="bg-orange-400">bottom right</div>,
        bottom: true,
        right: true,
      },
      {
        label: <div className="bg-orange-400">center</div>,
        top: "center",
        left: "center",
      },
      {
        label: <div className="bg-orange-400">absolute value</div>,
        top: "5rem",
        left: "15rem",
      },
    ],
  },
};
