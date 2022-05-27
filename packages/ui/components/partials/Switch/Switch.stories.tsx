import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { StorybookImplemntationLayout } from "ui/utils";
import { Switch, SwitchProps } from "./";

export default {
  title: "UI / partials / Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const Default: React.FC<SwitchProps> = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <StorybookImplemntationLayout
      implmentation={`
import {Switch} from "ui"

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
