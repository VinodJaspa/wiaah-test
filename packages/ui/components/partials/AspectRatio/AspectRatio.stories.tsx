import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { AspectRatio } from "./AspectRatio";

export default {
  title: "UI / partials / AspectRatio",
  component: AspectRatio,
} as Meta<typeof AspectRatio>;

const Template: StoryFn<typeof AspectRatio> = (args) => {
  return (
    <div className="w-48">
      <AspectRatio {...args}>
        <div className="bg-blue-400 w-full h-full"></div>
      </AspectRatio>
    </div>
  );
};

export const landscape = {
  render: Template,

  args: {
    ratio: 9 / 16,
  },
};

export const protrait = {
  render: Template,

  args: {
    ratio: 16 / 9,
  },
};
