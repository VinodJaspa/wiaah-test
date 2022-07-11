import { storybookPartailsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InputSearch } from "./InputSearch";
import React from "react";

export default {
  title: storybookPartailsTitle + "InputSearch",
  component: InputSearch,
} as ComponentMeta<typeof InputSearch>;

const template: ComponentStory<typeof InputSearch> = ({
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

export const Default = template.bind({});
