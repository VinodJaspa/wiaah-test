import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "../";
export default {
  title: "UI/partials/Image",
  component: Image,
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => (
  <div className="flex flex-col items-center">
    <div>Note: by default objectFit(fit prop) is "cover"</div>
    <div>Note: by default rotation prop is "landscape"</div>
    <div className="mb-16">Note: by default Size prop is "md"</div>
    <div className="w-fit bg-blue-400">
      <Image {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
};
Default.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args} />
    </section>
  ),
];

export const PortraitVariant = Template.bind({});
PortraitVariant.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  rotation: "portrait",
};
PortraitVariant.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];

export const PortraitVariantContain = Template.bind({});
PortraitVariantContain.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  rotation: "portrait",
  fit: "contain",
};
PortraitVariantContain.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];

export const ContainVariant = Template.bind({});
ContainVariant.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  fit: "contain",
};
ContainVariant.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];

export const SmallSize = Template.bind({});
SmallSize.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  size: "sm",
};
SmallSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const MediumSize = Template.bind({});
MediumSize.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  size: "md",
};
MediumSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const LargeSize = Template.bind({});
LargeSize.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  size: "lg",
};
LargeSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const ExtraLargeSize = Template.bind({});
ExtraLargeSize.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  size: "xl",
};
ExtraLargeSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
export const CustomSize = Template.bind({});
CustomSize.args = {
  src: "https://cdn.mena-tech.com/wp-content/uploads/2021/08/MR-Future-Products-2020-2.png",
  width: { value: 6 },
  height: { value: 6 },
};
CustomSize.decorators = [
  (Story, { args }) => (
    <section className="flex h-screen w-full items-center justify-center bg-gray-200">
      <Story args={args}></Story>
    </section>
  ),
];
