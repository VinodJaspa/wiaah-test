import { storybookPartailsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";

import { InputSearch } from "./InputSearch";
import React from "react";

export default {
  title: "UI / partials / InputSearch",
  component: InputSearch,
} as Meta<typeof InputSearch>;

const template: StoryFn<typeof InputSearch> = ({
  onOptionSelect,
  options,
  value,
  onChange,
  ...props
}) => {
  const [state, setState] = React.useState<string>("");

  return (
    <InputSearch
      value={state}
      onChange={(e) => setState(e.target.value)}
      options={[...Array(10)].map(() => state)}
      onOptionSelect={(opt) =>
        setState(() => {
          //@ts-ignore
          return typeof opt === "string" ? opt : opt.text;
        })
      }
      {...props}
    />
  );
};

export const Default = {
  render: template,
};
