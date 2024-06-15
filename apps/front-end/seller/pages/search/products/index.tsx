import { NextPage } from "next";
import React from "react";
import { MetaTitle } from "react-seo";
import { ProductSearchView, SellerLayout } from "ui";

const ProductSearchPage: NextPage = () => {
  return (
    <>
      <MetaTitle content={`Product search`} />
      <SellerLayout>
        <ProductSearchView searchSlug="" />
      </SellerLayout>
    </>
  );
};

export default ProductSearchPage;
