import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Image } from "../";
export default {
  title: "UI/partials/Image",
  component: Image,
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => (
  <div className="flex flex-col items-center">
    <div>Note: by default objectFit(fit prop) is "cover"</div>
    <div>Note: by default rotation prop is "landscape"</div>
    <div className="mb-16">Note: by default Size prop is "md"</div>
    <div className="w-fit bg-blue-400">
      <Image {...args} />
    </div>
  </div>
);

export const Default = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args} />
      </section>
    ),
  ],
};

export const PortraitVariant = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    rotation: "portrait",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const PortraitVariantContain = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    rotation: "portrait",
    fit: "contain",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const ContainVariant = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    fit: "contain",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const SmallSize = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    size: "sm",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const MediumSize = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    size: "md",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const LargeSize = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    size: "lg",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const ExtraLargeSize = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    size: "xl",
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};

export const CustomSize = {
  render: Template,

  args: {
    src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
    width: { value: 6 },
    height: { value: 6 },
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full items-center justify-center bg-gray-200">
        <Story args={args}></Story>
      </section>
    ),
  ],
};
