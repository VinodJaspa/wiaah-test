import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { FlexStack } from "../index";

export default {
  title: "UI/partials/FlexStack",
  component: FlexStack,
  argTypes: {
    childs: { type: "number", defaultValue: 4 },
  },
} as Meta<typeof FlexStack>;

const Template: StoryFn<typeof FlexStack> = ({ childs, ...args }: any) => (
  <FlexStack {...args}>
    {[...Array(childs)].map((_, i) => (
      <div
        style={{
          width: "10rem",
          height: "10rem",
          borderColor: "black",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderWidth: "2px",
        }}
      >
        Elemment {i}
      </div>
    ))}
  </FlexStack>
);

export const Default = {
  render: Template,
  args: {},
};

export const Vertical = {
  render: Template,

  args: {
    direction: "vertical",
  },
};

export const WithVerticalSpacing = {
  render: Template,

  args: {
    verticalSpacingInRem: 1,
    direction: "vertical",
  },
};

export const WithHorizontelSpacing = {
  render: Template,

  args: {
    horizontalSpacingInRem: 1,
  },
};

export const WithWrap = {
  render: Template,

  args: {
    childs: 30,
    wrap: true,
  },
};

export const WithJustifyCenter = {
  render: Template,

  args: {
    fullWidth: true,
    justify: "around",
  },
};

export const WithJustifyBetween = {
  render: Template,

  args: {
    fullWidth: true,
    justify: "between",
  },
};

export const WithJustifyAround = {
  render: Template,
};

export const WithJustifyEnd = {
  render: Template,

  args: {
    fullWidth: true,
    justify: "end",
  },
};
