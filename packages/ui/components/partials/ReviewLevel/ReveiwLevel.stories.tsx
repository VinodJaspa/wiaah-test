import { ReviewLevel } from "./ReviewLevel";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";

export default {
  title: storybookOtherServicesDataDisplayTitle + "ReviewLevel",
  component: ReviewLevel,
} as ComponentMeta<typeof ReviewLevel>;

const template: ComponentStory<typeof ReviewLevel> = (args) => (
  <ReviewLevel {...args} />
);

export const Default = template.bind({});
Default.args = {
  name: "Amenites",
  rate: 5,
};

export const decimel = template.bind({});
decimel.args = {
  name: "Amenites",
  rate: 3.8,
};
