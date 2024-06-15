import React from "react";
import { ProductView } from "ui/components/features/Products/views/ProductView";
import { SellerLayout } from "@blocks";
import { useRouting } from "routing";

const SellerProductView = () => {
  const { getParam } = useRouting();
  const id = getParam("id");
  return (
    <SellerLayout>
      <ProductView productId={id} />
    </SellerLayout>
  );
};

export default SellerProductView;
