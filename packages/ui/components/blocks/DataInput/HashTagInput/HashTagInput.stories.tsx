import { storybookDataInputBlocksTitle } from "utils";
import { Meta } from "@storybook/react";
import { HashTagInput } from "@UI";
import React from "react";

export default {
  title: "UI / blocks / Data Input /HashTagInput",
  component: HashTagInput,
} as Meta<typeof HashTagInput>;

export const Default = () => {
  const [tags, setTags] = React.useState<string[]>([]);
  return (
    <div className="flex flex-col gap-16">
      <pre>{JSON.stringify(tags)}</pre>
      <HashTagInput onChange={(tags) => setTags(tags)} />;
    </div>
  );
};
