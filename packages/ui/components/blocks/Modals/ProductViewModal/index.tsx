import {
  useProductViewModal,
  ServiceView,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from "@UI";
import { ProductView } from "@UI/views/market/ProductView";
import React from "react";

export interface ProductViewModalProps { }

export const ProductViewModal: React.FC<ProductViewModalProps> = () => {
  const { product, closeProduct } = useProductViewModal();

  return (
    <Modal onOpen={() => { }} isOpen={!!product} onClose={closeProduct}>
      <ModalOverlay />
      <ModalContent className="max-h-full max-w-[80%]">
        <ModalHeader title="">
          <ModalCloseButton />
        </ModalHeader>
        <div className="thinScroll h-full overflow-y-scroll">
          {product && product.productType === "product" && (
            <ProductView productId={product.productId} />
          )}
          {product && product.productType === "service" && (
            <ServiceView serviceId={product.productId} />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};
