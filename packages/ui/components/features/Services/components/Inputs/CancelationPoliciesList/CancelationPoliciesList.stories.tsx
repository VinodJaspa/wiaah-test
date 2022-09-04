import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CancelationPoliciesListInput } from "./CancelationPoliciesList";
import { storybookOtherServicesInputTitle } from "utils";
import React from "react";

export default {
  title: storybookOtherServicesInputTitle + "CancelationPoliciesListInput",
  component: CancelationPoliciesListInput,
} as ComponentMeta<typeof CancelationPoliciesListInput>;

const template: ComponentStory<typeof CancelationPoliciesListInput> = (
  args
) => {
  const [state, setState] = React.useState<any[]>([]);
  return (
    <CancelationPoliciesListInput
      {...args}
      onChange={(e) => setState(e)}
      value={state || []}
    />
  );
};

export const Default = template.bind({});
