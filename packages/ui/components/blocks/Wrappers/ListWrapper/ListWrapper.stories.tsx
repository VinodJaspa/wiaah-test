import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ListWrapper } from "@UI";
import { randomNum } from "../../../helpers/randomNumber";
export default {
  title: "UI/blocks/Social/ListWrapper",
  component: ListWrapper,
} as Meta<typeof ListWrapper>;

export const Default = {
  args: {
    cols: 3,
    children: [...Array(6)].map(() => (
      <div
        style={{ paddingTop: `${randomNum(50)}px` }}
        className={`bg-purple-500 px-8`}
      ></div>
    )),
  },
};
