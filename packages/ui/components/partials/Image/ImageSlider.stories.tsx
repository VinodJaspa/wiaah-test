import { storybookPartailsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ImageSlider } from "./ImageSlider";

export default {
  title: storybookPartailsTitle + "ImageSlider",
  component: ImageSlider,
} as ComponentMeta<typeof ImageSlider>;

const template: ComponentStory<typeof ImageSlider> = (args) => {
  return <ImageSlider {...args} />;
};

export const Default = template.bind({});
Default.args = {
  images: ["/shop.jpeg", "/shop-2.jpeg", "/shop-3.jpeg"],
};
