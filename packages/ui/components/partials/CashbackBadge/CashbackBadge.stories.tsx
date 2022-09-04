import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CashbackBadge } from "./CashbackBadge";
import { storybookPartailsTitle } from "utils";

export default {
  title: storybookPartailsTitle + "CashbackBadge",
  component: CashbackBadge,
} as ComponentMeta<typeof CashbackBadge>;

const template: ComponentStory<typeof CashbackBadge> = (args) => (
  <CashbackBadge {...args} />
);

export const Default = template.bind({});
Default.args = {};
