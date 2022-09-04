import { FlagIcon } from "./FlagIcon";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import React from "react";

export default {
  title: storybookPartailsTitle + "FlagIcon",
  component: FlagIcon,
} as ComponentMeta<typeof FlagIcon>;

const template: ComponentStory<typeof FlagIcon> = (args) => {
  const [code, setCode] = React.useState<string>("CH");
  return (
    <div className="flex flex-col items-center gap-4">
      <FlagIcon code={code} />
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={() => setCode("CH")}>CH</button>
        <button onClick={() => setCode("US")}>US</button>
        <button onClick={() => setCode("EG")}>EG</button>
        <button onClick={() => setCode("GE")}>GE</button>
      </div>
    </div>
  );
};

export const Default = template.bind({});
Default.args = {};
