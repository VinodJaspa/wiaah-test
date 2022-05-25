import { ComponentMeta } from "@storybook/react";
import { storybookPartailsTitle, StorybookImplemntationLayout } from "ui/utils";
import { Input } from "./";
import React from "react";

export default {
  title: storybookPartailsTitle + "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: React.FC = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Input } from "ui"


...
return (
    <Input />
)
            `}
    >
      <Input />
    </StorybookImplemntationLayout>
  );
};

export const Controlled: React.FC = () => {
  const [value, setValue] = React.useState<string>("controlled...");

  return (
    <StorybookImplemntationLayout
      implmentation={`
import { Input } from "ui"


...
const [value, setValue] = React.useState<string>("controlled...");

return (
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
    <p className="font-bold text-xl">{value}</p>
)
            `}
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <p className="font-bold text-xl">{value}</p>
    </StorybookImplemntationLayout>
  );
};
