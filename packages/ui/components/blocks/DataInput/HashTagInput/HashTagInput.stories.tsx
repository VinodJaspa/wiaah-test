import { storybookDataInputBlocksTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { HashTagInput } from "@UI";
import React from "react";

export default {
  title: storybookDataInputBlocksTitle + "HashTagInput",
  component: HashTagInput,
} as ComponentMeta<typeof HashTagInput>;

export const Default = () => {
  const [tags, setTags] = React.useState<string[]>([]);
  return (
    <div className="flex flex-col gap-16">
      <pre>{JSON.stringify(tags)}</pre>
      <HashTagInput onChange={(tags) => setTags(tags)} />;
    </div>
  );
};
