import { storybookSteppersTitle } from "utils";
import { ResturantFindTableFilterStepper } from "./ResturantFindTableFilterStepper";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: storybookSteppersTitle + "ResturantFindTableFilterStepper",
  component: ResturantFindTableFilterStepper,
} as ComponentMeta<typeof ResturantFindTableFilterStepper>;

const template: ComponentStory<typeof ResturantFindTableFilterStepper> = (
  args
) => <ResturantFindTableFilterStepper {...args} />;

export const Default = template.bind({});
Default.args = {};
