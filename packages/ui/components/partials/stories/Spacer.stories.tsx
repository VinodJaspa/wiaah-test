import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Spacer } from "../index";
import { Button } from "../index";

export default {
  title: "UI/partials/Spacer",
  component: Spacer,
} as Meta<typeof Spacer>;

export const Default = {
  args: {
    spaceInRem: 5,
  },

  decorators: [
    (Story, { args }) => (
      <div>
        <Button children="Element" />
        <Story args={args} />
        <Button>test</Button>
      </div>
    ),
  ],
};
