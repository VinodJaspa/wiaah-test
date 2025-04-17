import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ProgressBars } from "@UI";
export default {
  title: "UI/partials/ProgressBars",
  component: ProgressBars,
} as Meta<typeof ProgressBars>;

const Template: StoryFn<typeof ProgressBars> = (args) => (
  <div className="w-full bg-black bg-opacity-20 p-4">
    <ProgressBars {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    progressBarsData: [
      {
        progress: 30,
      },
    ],
  },
};

export const WithManyBars = {
  render: Template,

  args: {
    progressBarsData: [
      {
        progress: 100,
      },
      {
        progress: 100,
      },
      {
        progress: 60,
      },
      {
        progress: 0,
      },
    ],
  },
};
