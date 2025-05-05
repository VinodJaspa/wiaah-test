import { ProductViewModal, Button, useProductViewModal } from "@UI";
import { storybookModalsTitle } from "utils";
import { Meta } from "@storybook/react";

export default {
  title: "UI / Blocks / Modals /ProductViewModal",
  component: ProductViewModal,
} as Meta<typeof ProductViewModal>;

export const product = () => {
  const { showProduct } = useProductViewModal();
  return (
    <>
      <Button
        onClick={() =>
          showProduct({ productId: "312", productType: "product" })
        }
      >
        open
      </Button>
      <ProductViewModal />
    </>
  );
};

export const service = () => {
  const { showProduct } = useProductViewModal();
  return (
    <>
      <Button
        onClick={() =>
          showProduct({ productId: "312", productType: "service" })
        }
      >
        open
      </Button>
      <ProductViewModal />
    </>
  );
};
