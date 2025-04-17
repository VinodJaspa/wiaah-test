import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { AddBadgeButton } from "./AddBadgeButton";

export default {
  title: "UI / partials / AddBadgeButton",
  component: AddBadgeButton,
} as Meta<typeof AddBadgeButton>;

const template: StoryFn<typeof AddBadgeButton> = (args) => (
  <AddBadgeButton {...args}>Add Badge Button</AddBadgeButton>
);

export const Default = {
  render: template,
  args: {},
};
