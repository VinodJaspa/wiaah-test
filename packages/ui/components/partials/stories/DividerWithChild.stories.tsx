import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DividerWidthChild } from "../index";

export default {
  title: "UI/partials/DividerWithChild",
  component: DividerWidthChild,
} as ComponentMeta<typeof DividerWidthChild>;

const Template: ComponentStory<typeof DividerWidthChild> = (args) => (
  <DividerWidthChild {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithChild = Template.bind({});
WithChild.args = {
  children: (
    <button className="mx-4 rounded bg-blue-500 py-1 px-4 text-white">
      child
    </button>
  ),
};

export const ColoredDivider = Template.bind({});
ColoredDivider.args = {
  hexDividerColor: "#0f2",
};
