import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSteppersHeadersTitle } from "utils";
import { ResturantFindTableFilterStepperHeader } from "./ResturantFindTableFilterStepperHeader";

export default {
  title:
    storybookSteppersHeadersTitle + "ResturantFindTableFilterStepperHeader",
  component: ResturantFindTableFilterStepperHeader,
} as ComponentMeta<typeof ResturantFindTableFilterStepperHeader>;

const template: ComponentStory<typeof ResturantFindTableFilterStepperHeader> = (
  args
) => <ResturantFindTableFilterStepperHeader {...args} />;

export const Default = template.bind({});
Default.args = {
  currentStepIdx: 0,
};
