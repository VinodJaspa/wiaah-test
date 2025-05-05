import { storybookFootersTitle } from "utils";
import { Meta } from "@storybook/react";
import { Footer } from "./index";

export default {
  title: "UI / Blocks / Footers /Footer",
  component: Footer,
} as Meta<typeof Footer>;

export const Default = () => {
  return <Footer />;
};
