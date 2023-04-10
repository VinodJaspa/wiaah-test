import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout, storybookPartailsTitle } from "utils";
import { Checkbox } from "./";

export default {
  title: storybookPartailsTitle + "Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

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
