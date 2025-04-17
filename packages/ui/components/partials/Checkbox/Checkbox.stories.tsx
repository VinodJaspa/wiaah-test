import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout, storybookPartailsTitle } from "utils";
import { Checkbox } from "./";

export default {
  title: "UI / partials / Checkbox",
  component: Checkbox,
} as Meta<typeof Checkbox>;

export const Default = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Checkbox } from "@UI"


...
return (
    <Checkbox checked={checked} onChange={(event)=> setChecked(event.target.checked)} />
)
            `}
    >
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
    </StorybookImplemntationLayout>
  );
};
