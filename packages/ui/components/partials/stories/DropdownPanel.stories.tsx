import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { DropdownPanel } from "../";

export default {
  title: "UI/partials/DropdownPanel",
  component: DropdownPanel,
} as Meta<typeof DropdownPanel>;

export const Default = {
  args: {
    name: "Material",
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};

export const WithChildrens = {
  args: {
    name: "Material",
    children: (
      <>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
      </>
    ),
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};

export const With2ColGrid = {
  args: {
    name: "Material",
    columns: 2,
    children: (
      <>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
      </>
    ),
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};

export const With3ColGrid = {
  args: {
    name: "Material",
    columns: 2,
    children: (
      <>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>{" "}
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          item
        </div>
      </>
    ),
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};
