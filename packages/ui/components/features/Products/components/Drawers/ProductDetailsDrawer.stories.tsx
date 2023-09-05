import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { storybookProductDrawersTitle } from "utils";
import { useSocialControls } from "@blocks";
import { Button } from "@partials";
import { RecoilStorybookDecorator } from "@UI/SBDecorators/RecoilSBDecorator";

export default {
  title: storybookProductDrawersTitle + "ProductDetailsDrawer",
  component: ProductDetailsDrawer,
} as ComponentMeta<typeof ProductDetailsDrawer>;

export const Default: ComponentStoryObj<typeof ProductDetailsDrawer> = {
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
