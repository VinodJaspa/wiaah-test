import React from "react";
import { Header } from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/Header",
  component: Header,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof Header>;

const Templete: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Templete.bind({});
Default.args = {
  categories: [
    {
      name: {
        translationKey: "shoes",
        fallbackText: "shoes",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "jewelry",
        fallbackText: "jewelry",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "clothing",
        fallbackText: "clothing",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "accessories",
        fallbackText: "accessories",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "shoes",
        fallbackText: "shoes",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "jewelry",
        fallbackText: "jewelry",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "clothing",
        fallbackText: "clothing",
      },
      destination: "/",
    },
    {
      name: {
        translationKey: "accessories",
        fallbackText: "accessories",
      },
      destination: "/",
    },
  ],
};
