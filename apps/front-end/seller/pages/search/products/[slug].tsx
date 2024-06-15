import { ProductSearchView } from "@UI";
import { SellerLayout } from "@blocks";
import React from "react";
import { useRouting } from "routing";

const ProductSearch = () => {
  const { getParam } = useRouting();

  const slug = getParam("slug");

  return (
    <>
      <SellerLayout>
        <ProductSearchView searchSlug={slug} />
      </SellerLayout>
    </>
  );
};

export default ProductSearch;
