import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HighlightText } from "./HightlightText";
import { storybookPartailsTitle } from "utils";

export default {
  title: storybookPartailsTitle + "HighlightText",
  component: HighlightText,
} as ComponentMeta<typeof HighlightText>;

const template: ComponentStory<typeof HighlightText> = (args) => (
  <HighlightText {...args} />
);

export const Default = template.bind({});
Default.args = {
  text: "this is some random text",
  toHighlight: "and",
};
