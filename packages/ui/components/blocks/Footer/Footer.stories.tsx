import { storybookFootersTitle } from "utils";
import { ComponentMeta } from "@storybook/react";
import { Footer } from "ui";

export default {
  title: storybookFootersTitle + "Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const Default = () => {
  return <Footer />;
};
