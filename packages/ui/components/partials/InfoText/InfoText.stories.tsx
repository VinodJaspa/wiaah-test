import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { InfoText } from "./InfoText";

export default {
  title: storybookPartailsTitle + "InfoText",
  component: InfoText,
} as ComponentMeta<typeof InfoText>;

const template: ComponentStory<typeof InfoText> = (args) => (
  <InfoText {...args} />
);

export const Default = template.bind({});
Default.args = {};
