import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FlexStack } from "../index";

export default {
  title: "UI/partials/FlexStack",
  component: FlexStack,
  argTypes: {
    childs: { type: "number", defaultValue: 4 },
  },
} as ComponentMeta<typeof FlexStack>;

const Template: ComponentStory<typeof FlexStack> = ({
  childs,
  ...args
}: any) => (
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

export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: "vertical",
};

export const WithVerticalSpacing = Template.bind({});
WithVerticalSpacing.args = {
  verticalSpacingInRem: 1,
  direction: "vertical",
};

export const WithHorizontelSpacing = Template.bind({});
WithHorizontelSpacing.args = {
  horizontalSpacingInRem: 1,
};

export const WithWrap = Template.bind({});
WithWrap.args = {
  childs: 30,
  wrap: true,
};

export const WithJustifyCenter = Template.bind({});
WithJustifyCenter.args = {
  fullWidth: true,
  justify: "center",
};

export const WithJustifyBetween = Template.bind({});
WithJustifyBetween.args = {
  fullWidth: true,
  justify: "between",
};

export const WithJustifyAround = Template.bind({});
WithJustifyCenter.args = {
  fullWidth: true,
  justify: "around",
};

export const WithJustifyEnd = Template.bind({});
WithJustifyEnd.args = {
  fullWidth: true,
  justify: "end",
};
