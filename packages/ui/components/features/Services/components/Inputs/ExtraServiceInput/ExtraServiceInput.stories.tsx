import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesInputTitle } from "utils";
import { ExtraServiceInput } from "./ExtraServiceInput";

export default {
  title: storybookOtherServicesInputTitle + "ExtraServiceInput",
  component: ExtraServiceInput,
} as ComponentMeta<typeof ExtraServiceInput>;

const template: ComponentStory<typeof ExtraServiceInput> = (args) => (
  <ExtraServiceInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
