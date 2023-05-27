import { ProductSearchView } from "@UI";
import { SellerLayout } from "@blocks";
import React from "react";
import { useRouting } from "routing";

const productSearch = () => {
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

export default productSearch;
