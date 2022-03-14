import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DividerWidthText } from "../index";

export default {
  title: "UI/partials/DividerWithText",
  component: DividerWidthText,
} as ComponentMeta<typeof DividerWidthText>;

const Template: ComponentStory<typeof DividerWidthText> = (args) => (
  <DividerWidthText {...args} />
);

export const Default = Template.bind({});

Default.args = {};

export const WithText = Template.bind({});
WithText.args = {
  text: "new to Wiaah ?",
};

export const ColoredDivider = Template.bind({});
ColoredDivider.args = {
  hexDividerColor: "#0f2",
};
export const ColoredText = Template.bind({});
ColoredText.args = {
  text: "new to Wiaah ?",
  hexTextColor: "#0f2",
};
