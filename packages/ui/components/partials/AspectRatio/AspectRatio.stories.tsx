import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { AspectRatio } from "./AspectRatio";

export default {
  title: storybookPartailsTitle + "AspectRatio",
  component: AspectRatio,
} as ComponentMeta<typeof AspectRatio>;

const Template: ComponentStory<typeof AspectRatio> = (args) => {
  return (
    <div className="w-48">
      <AspectRatio {...args}>
        <div className="bg-blue-400 w-full h-full"></div>
      </AspectRatio>
    </div>
  );
};

export const landscape = Template.bind({});
landscape.args = {
  ratio: 9 / 16,
};

export const protrait = Template.bind({});
protrait.args = {
  ratio: 16 / 9,
};
