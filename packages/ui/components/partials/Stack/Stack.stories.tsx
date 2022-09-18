import { Stack } from "./index";
import { storybookPartailsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookPartailsTitle + "Stack",
  component: Stack,
} as ComponentMeta<typeof Stack>;

const template: ComponentStory<typeof Stack> = (args) => (
  <Stack {...args}>
    {[...Array(10)].map((_, i) => (
      <div className="bg-primary-100" key={i}>
        comp {i + 1}
      </div>
    ))}
  </Stack>
);

export const Default = template.bind({});
Default.args = {};

export const col = template.bind({});
col.args = {
  col: true,
};

export const WithDivider = template.bind({});
WithDivider.args = {
  col: true,
  divider: <div className="w-full border-b my-1 border-gray-400"></div>,
};
