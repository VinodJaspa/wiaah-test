import { StoryFn, Meta } from "@storybook/react";
import { DividerWidthChild } from "../index";

export default {
  title: "UI/partials/DividerWithChild",
  component: DividerWidthChild,
} as Meta<typeof DividerWidthChild>;

export const Default = {
  args: {},
};

export const WithChild = {
  args: {
    children: (
      <button className="mx-4 rounded bg-blue-500 py-1 px-4 text-white">
        child
      </button>
    ),
  },
};

export const ColoredDivider = {
  args: {
    hexDividerColor: "#0f2",
  },
};
