import { Meta, StoryFn } from "@storybook/react";
import { CancelationPoliciesListInput } from "./CancelationPoliciesList";
import { storybookOtherServicesInputTitle } from "utils";
import React from "react";

export default {
  title: "UI / Features /Services /Inputs /CancelationPoliciesListInput",
  component: CancelationPoliciesListInput,
} as Meta<typeof CancelationPoliciesListInput>;

const template: StoryFn<typeof CancelationPoliciesListInput> = (args) => {
  const [state, setState] = React.useState<any[]>([]);
  return (
    <CancelationPoliciesListInput
      {...args}
      onChange={(e) => setState(e)}
      value={state || []}
    />
  );
};

export const Default = {
  render: template,
};
