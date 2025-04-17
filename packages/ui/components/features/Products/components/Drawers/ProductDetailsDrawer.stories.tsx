import { Meta, StoryObj } from "@storybook/react";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { storybookProductDrawersTitle } from "utils";
import { useSocialControls } from "@blocks";
import { Button } from "@partials";
import { RecoilStorybookDecorator } from "@UI/SBDecorators/RecoilSBDecorator";

export default {
  title: "UI / Features /product /Drawers /ProductDetailsDrawer",
  component: ProductDetailsDrawer,
} as Meta<typeof ProductDetailsDrawer>;

export const Default: StoryObj<typeof ProductDetailsDrawer> = {
  play: async () => {},
  decorators: [RecoilStorybookDecorator],
  render: () => {
    const { viewProductDetails } = useSocialControls();

    return (
      <>
        <Button onClick={() => viewProductDetails("testid")}>open</Button>
        <ProductDetailsDrawer />
      </>
    );
  },
  parameters: {},
};
