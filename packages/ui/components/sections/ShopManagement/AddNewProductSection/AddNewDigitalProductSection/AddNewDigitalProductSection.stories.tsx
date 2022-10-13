import { storybookSectionsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddNewDigitalProductSection } from "./AddNewDigitalProductSection";

export default {
  title: storybookSectionsTitle + "AddNewDigitialProductSection",
  component: AddNewDigitalProductSection,
} as ComponentMeta<typeof AddNewDigitalProductSection>;

const template: ComponentStory<typeof AddNewDigitalProductSection> = (
  props
) => <AddNewDigitalProductSection {...props} />;

export const Default = template.bind({});
Default.args = {};
