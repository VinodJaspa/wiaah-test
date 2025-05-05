import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout, storybookPartailsTitle } from "utils";
import { Switch, SwitchProps } from "@UI";

export default {
  title: "UI / partials / Switch",
  component: Switch,
} as Meta<typeof Switch>;

export const Default: React.FC<SwitchProps> = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <StorybookImplemntationLayout
      implmentation={`
import {Switch} from "@UI"

const Example = ()=>{
  const [checked,setChecked] = React.useState(false)


  return (
    <Switch checked={checked} onChange={(isChecked)=> setChecked(isChecked)} />
  )
}
    `}
    >
      <Switch
        checked={checked}
        onChange={(isChecked) => setChecked(isChecked)}
      />
    </StorybookImplemntationLayout>
  );
};
