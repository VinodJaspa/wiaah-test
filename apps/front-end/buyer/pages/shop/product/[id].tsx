import {
    SellerLayout,
    useGetShopDetailsQuery
} from "@UI";
import { StoreType } from "@features/API";
import ProductDetailPage from "@features/Search/Products/ProductDetails";
import React from "react";
import { useRouting } from "routing";

const ShopView: React.FC = () => {
  const { getParam } = useRouting();

  const id = getParam("id");

  const { data: _shop } = useGetShopDetailsQuery(id, { enabled: !!id });
  const shop = {
    storeType: StoreType.Service,
  };

  return (
    <SellerLayout>
     <ProductDetailPage/>
    </SellerLayout>
  );
};

export default ShopView;
