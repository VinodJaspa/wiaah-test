import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DropdownPanel } from "../";

export default {
  title: "UI/partials/DropdownPanel",
  component: DropdownPanel,
} as ComponentMeta<typeof DropdownPanel>;

const Template: ComponentStory<typeof DropdownPanel> = (args) => (
  <DropdownPanel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "Material",
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];

export const WithChildrens = Template.bind({});
WithChildrens.args = {
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
};
WithChildrens.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];

export const With2ColGrid = Template.bind({});
With2ColGrid.args = {
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
};
With2ColGrid.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];

export const With3ColGrid = Template.bind({});
With3ColGrid.args = {
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
};
With3ColGrid.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story {...args} />
      </section>
    );
  },
];
