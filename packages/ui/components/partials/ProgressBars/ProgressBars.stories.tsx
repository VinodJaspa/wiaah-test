import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ProgressBars } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/partials/ProgressBars",
  component: ProgressBars,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ProgressBars>;

const Template: ComponentStory<typeof ProgressBars> = (args) => (
  <div className="w-full bg-black bg-opacity-20 p-4">
    <ProgressBars {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  progressBarsData: [
    {
      progress: 30,
    },
  ],
};
export const WithManyBars = Template.bind({});
WithManyBars.args = {
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
};
