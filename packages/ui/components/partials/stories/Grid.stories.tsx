import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "../";
export default {
  title: "UI/partials/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => (
  <Grid {...args}>
    <div className="flex flex-col bg-cyan-500">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
    <div className="flex flex-col bg-green-400">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
    <div className="flex flex-col bg-cyan-500">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
    <div className="flex flex-col bg-green-400">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
    <div className="flex flex-col bg-cyan-500">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
    <div className="flex flex-col bg-green-400">
      <span>Lorem ipsum dolor sit amet.</span>
      <span>Lorem, ipsum.</span>
    </div>
  </Grid>
);

export const Default = Template.bind({});
Default.args = {
  cols: 2,
};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const ExplictColWidth = Template.bind({});
ExplictColWidth.args = {
  cols: 2,
  colWidth: { value: 15 },
};
ExplictColWidth.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const ExplictRowHeight = Template.bind({});
ExplictRowHeight.args = {
  cols: 2,
  rows: 2,
  rowHeight: { value: 5 },
};
ExplictRowHeight.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const ColGap = Template.bind({});
ColGap.args = {
  cols: 3,
  colsGap: {
    value: 1,
  },
};
ColGap.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];

export const RowGap = Template.bind({});
RowGap.args = {
  rowsGap: {
    value: 1,
  },
};
RowGap.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
