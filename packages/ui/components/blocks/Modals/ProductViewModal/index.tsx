import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useProductViewModal, ProductView, ServiceView } from "ui";
import React from "react";

export interface ProductViewModalProps {}

export const ProductViewModal: React.FC<ProductViewModalProps> = () => {
  const { product, closeProduct } = useProductViewModal();

  return (
    <Modal autoFocus={false} isCentered isOpen={!!product} onClose={closeProduct}>
      <ModalOverlay />
      <ModalContent maxH={"80%"} maxW={"80%"}>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody h="100%" overflowY="scroll" className="thinScroll">
          {product && product.productType === "product" && (
            <ProductView productId={product.productId} />
          )}
          {product && product.productType === "service" && (
            <ServiceView serviceId={product.productId} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
