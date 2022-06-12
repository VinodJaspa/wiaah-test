import { ProductViewModal, Button, useProductViewModal } from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "ProductViewModal",
  component: ProductViewModal,
} as ComponentMeta<typeof ProductViewModal>;

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
