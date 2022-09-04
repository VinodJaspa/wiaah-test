import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AspectRatioImage } from "./AspectRatioImage";
import { storybookPartailsTitle } from "utils";

export default {
  title: storybookPartailsTitle + "AspectRatioImage",
  component: AspectRatioImage,
} as ComponentMeta<typeof AspectRatioImage>;

const template: ComponentStory<typeof AspectRatioImage> = (args) => (
  <AspectRatioImage {...args} />
);

export const Default = template.bind({});
Default.args = {
  ratio: 3 / 4,
  src: "/shop-2.jpeg",
  alt: "aspect ratio image",
};
