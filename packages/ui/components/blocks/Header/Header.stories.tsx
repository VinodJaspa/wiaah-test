import React from "react";
import { Header } from ".";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI/blocks/Header",
  component: Header,
} as Meta<typeof Header>;

export const Default = {
  args: {
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
  },
};
