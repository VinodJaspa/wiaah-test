import { ShopPostViewModal, Button, useShopPostPopup } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /ShopPostViewModal",
  component: ShopPostViewModal,
} as Meta<typeof ShopPostViewModal>;

export const Default = () => {
  const { setCurrentPostId } = useShopPostPopup();
  return (
    <>
      <Button onClick={() => setCurrentPostId("12")}>open</Button>
      <ShopPostViewModal />
    </>
  );
};
