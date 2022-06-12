import { ShopPostViewModal, Button, useShopPostPopup } from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "ShopPostViewModal",
  component: ShopPostViewModal,
} as ComponentMeta<typeof ShopPostViewModal>;

export const Default = () => {
  const { setCurrentPostId } = useShopPostPopup();
  return (
    <>
      <Button onClick={() => setCurrentPostId("12")}>open</Button>
      <ShopPostViewModal />
    </>
  );
};
