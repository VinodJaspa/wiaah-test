import { EditServicePresentationSection } from "./EditServicePresentationSection";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSectionsTitle } from "utils";

export default {
  title: storybookSectionsTitle + "EditServicePresentationSection",
  component: EditServicePresentationSection,
} as ComponentMeta<typeof EditServicePresentationSection>;

const template: ComponentStory<typeof EditServicePresentationSection> = (
  args
) => <EditServicePresentationSection {...args} />;

export const Default = template.bind({});
Default.args = {};
