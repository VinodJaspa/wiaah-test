import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ItemsTable } from "../";

export default {
  title: "UI/blocks/ItemsTable",
  component: ItemsTable,
} as ComponentMeta<typeof ItemsTable>;

const Template: ComponentStory<typeof ItemsTable> = (args) => (
  <ItemsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { name: "Dress" },
    { name: "Home" },
    { name: "Jewelry" },
    { name: "Clothing" },
  ],
  title: "Types of Shop",
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-white">
        <Story {...args} />
      </section>
    );
  },
];
