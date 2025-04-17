import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { FilterInput } from "../";

export default {
  title: "UI/partials/FilterInput",
  component: FilterInput,
} as Meta<typeof FilterInput>;

export const Default = {
  args: {
    label: "Christmas",
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <div className="w-fit">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};

export const Radio = {
  args: {
    label: "Men",
    variant: "radio",
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <div className="w-fit">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};

export const Range = {
  args: {
    label: "Price Range (USD)",
    variant: "range",
    max: 500,
    min: 10,
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <div className="w-96">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};

export const WithCurrencyRange = {
  args: {
    label: "Price Range (GBP)",
    variant: "range",
    currency: "GBP",
    currencySymbol: "£",
    max: 500,
    min: 10,
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <div className="w-96">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};

export const WithBiggerRange = {
  args: {
    label: "price Range (USD)",
    variant: "range",
    max: 5000000,
    min: 5000,
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-gray-200">
          <div className="w-96">
            <Story {...args} />
          </div>
        </section>
      );
    },
  ],
};
