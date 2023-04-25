import {
  SellerLayout,
  ServiceDetailsView,
  getShopDetailsQueryFetcher,
  getShopDetailsQueryKey,
  useGetShopDetailsQuery,
} from "@UI";
import { ShopDetailsView } from "@components";
import { StoreType } from "@features/API";
import { GetServerSideProps } from "next";
import React from "react";
import { QueryClient, dehydrate } from "react-query";
import { useRouting } from "routing";
import { setQueryClientServerSideProps } from "../../helpers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params["id"] as string;
  if (id) {
    const client = new QueryClient();

    await client.prefetchQuery(getShopDetailsQueryKey(id), () =>
      getShopDetailsQueryFetcher(id)
    );
    return {
      props: {
        ...setQueryClientServerSideProps(dehydrate(client)),
      },
    };
  } else {
    return {
      props: {},
      notFound: true,
      redirect: "/",
    };
  }
};

const ShopView: React.FC = () => {
  const { getParam } = useRouting();

  const id = getParam("id");

  const { data: shop } = useGetShopDetailsQuery(id, { enabled: !!id });

  return (
    <SellerLayout>
      {shop.storeType === StoreType.Service ? (
        <ServiceDetailsView userId={id} />
      ) : (
        <ShopDetailsView accountId={id} />
      )}
    </SellerLayout>
  );
};

export default ShopView;
