import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterInput } from "../";

export default {
  title: "UI/partials/FilterCheckBox",
  component: FilterInput,
} as ComponentMeta<typeof FilterInput>;

const Templete: ComponentStory<typeof FilterInput> = (args) => (
  <FilterInput {...args} />
);

export const Default = Templete.bind({});
Default.args = {
  label: "Christmas",
};
Default.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-fit">
          <Story {...args} />
        </div>
      </section>
    );
  },
];

export const Radio = Templete.bind({});
Radio.args = {
  label: "Men",
  variant: "radio",
};
Radio.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-fit">
          <Story {...args} />
        </div>
      </section>
    );
  },
];

export const Range = Templete.bind({});
Range.args = {
  label: "Price Range (USD)",
  variant: "range",
  max: 500,
  min: 10,
};
Range.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-96">
          <Story {...args} />
        </div>
      </section>
    );
  },
];

export const WithCurrencyRange = Templete.bind({});
WithCurrencyRange.args = {
  label: "Price Range (GBP)",
  variant: "range",
  currency: "GBP",
  currencySymbol: "£",
  max: 500,
  min: 10,
};
WithCurrencyRange.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-96">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
export const WithBiggerRange = Templete.bind({});
WithBiggerRange.args = {
  label: "price Range (USD)",
  variant: "range",
  max: 5000000,
  min: 5000,
};
WithBiggerRange.decorators = [
  (Story, { args }) => {
    return (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <div className="w-96">
          <Story {...args} />
        </div>
      </section>
    );
  },
];
