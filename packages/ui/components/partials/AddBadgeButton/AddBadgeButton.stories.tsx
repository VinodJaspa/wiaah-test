import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { AddBadgeButton } from "./AddBadgeButton";

export default {
  title: storybookPartailsTitle + "AddBadgeButton",
  component: AddBadgeButton,
} as ComponentMeta<typeof AddBadgeButton>;

const template: ComponentStory<typeof AddBadgeButton> = (args) => (
  <AddBadgeButton {...args}>Add Badge Button</AddBadgeButton>
);

export const Default = template.bind({});
Default.args = {};
