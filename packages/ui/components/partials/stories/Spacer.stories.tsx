import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Spacer } from "../index";
import { Button } from "../index";

export default {
  title: "UI/partials/Spacer",
  component: Spacer,
} as ComponentMeta<typeof Spacer>;

const Template: ComponentStory<typeof Spacer> = (args) => <Spacer {...args} />;

export const Default = Template.bind({});
Default.args = {
  spaceInRem: 5,
};
Default.decorators = [
  (Story, { args }) => (
    <div>
      <Button text="Element" />
      <Story args={args} />
      <Button text="Element">test</Button>
    </div>
  ),
];
