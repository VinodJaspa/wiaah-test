import { Stack } from "./index";
import { storybookPartailsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI / partials / Stack",
  component: Stack,
} as Meta<typeof Stack>;

const template: StoryFn<typeof Stack> = (args) => (
  <Stack {...args}>
    {[...Array(10)].map((_, i) => (
      <div className="bg-primary-100" key={i}>
        comp {i + 1}
      </div>
    ))}
  </Stack>
);

export const Default = {
  render: template,
  args: {},
};

export const col = {
  render: template,

  args: {
    col: true,
  },
};

export const WithDivider = {
  render: template,

  args: {
    col: true,
    divider: <div className="w-full border-b my-1 border-gray-400"></div>,
  },
};
