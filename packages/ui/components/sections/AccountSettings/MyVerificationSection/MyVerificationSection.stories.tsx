import { MyVerificationSection } from "./MyVerificationSection";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "MyVerificationSection",
  component: MyVerificationSection,
} as ComponentMeta<typeof MyVerificationSection>;

const template: ComponentStory<typeof MyVerificationSection> = (args) => (
  <MyVerificationSection {...args} />
);

export const Default = template.bind({});
Default.args = {};
