import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Grid } from "../";
export default {
  title: "UI/partials/Grid",
  component: Grid,
} as Meta<typeof Grid>;

const Template: StoryFn<typeof Grid> = (args) => (
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

export const Default = {
  render: Template,

  args: {
    cols: 2,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const ExplictColWidth = {
  render: Template,

  args: {
    cols: 2,
    colWidth: { value: 15 },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const ExplictRowHeight = {
  render: Template,

  args: {
    cols: 2,
    rows: 2,
    rowHeight: { value: 5 },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const ColGap = {
  render: Template,

  args: {
    cols: 3,
    colsGap: {
      value: 1,
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const RowGap = {
  render: Template,

  args: {
    rowsGap: {
      value: 1,
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};
