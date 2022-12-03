import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import { RateTextPresentation } from "./RateTextPresentation";

export default {
  title: storybookPartailsTitle + "RateTextPresentation",
  component: RateTextPresentation,
} as ComponentMeta<typeof RateTextPresentation>;

const template: ComponentStory<typeof RateTextPresentation> = (args) => (
  <RateTextPresentation {...args} />
);

export const Default = template.bind({});
Default.args = {
  rate: 4.5,
};
