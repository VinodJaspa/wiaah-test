import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShopProductFilter } from "../";

export default {
  title: "UI/blocks/products/ShopProductFilter",
  component: ShopProductFilter,
} as ComponentMeta<typeof ShopProductFilter>;

const Template: ComponentStory<typeof ShopProductFilter> = (args) => (
  <ShopProductFilter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  colors: ["#920", "#059", "#229"],
  locations: ["USA", "FR", "UK"],
  rating: true,
  shipping: ["Click and Collect", "Free", "International"],
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-slate-200">
        <Story {...args} />
      </section>
    );
  },
];
