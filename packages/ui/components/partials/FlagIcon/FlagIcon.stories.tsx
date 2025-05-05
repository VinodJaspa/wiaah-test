import { FlagIcon } from "./FlagIcon";
import { Meta, StoryFn } from "@storybook/react";
import { storybookPartailsTitle } from "utils";
import React from "react";

export default {
  title: "UI / partials / FlagIcon",
  component: FlagIcon,
} as Meta<typeof FlagIcon>;

const template: StoryFn<typeof FlagIcon> = (args) => {
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

export const Default = {
  render: template,
  args: {},
};
