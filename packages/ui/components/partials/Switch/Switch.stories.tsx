import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Switch } from "./";

export default {
  title: "UI / partials / Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = ({ onChange, ...args }) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
      <Switch onChange={setChecked} {...args} />
    </section>
  );
};

export const Default = Template.bind({});
Default.args = {};
