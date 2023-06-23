import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MasterLayout from "../../components/MasterLayout";
import { ShopView } from "../../components/Shop/ShopView";
import {
  Container,
  ServiceDetailsView,
  ShopDetailsView,
  getShopDetailsQueryFetcher,
  getShopDetailsQueryKey,
  setQueryClientServerSideProps,
  useGetShopDetailsQuery,
} from "ui";
import { Collaboration } from "ui/components/blocks/Collaboration";
import { StoreType } from "@features/API";
import { useRouting } from "routing";
import { QueryClient, dehydrate } from "react-query";

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

const ServiceDetailPage: NextPage = () => {
  const { getParam } = useRouting();

  const id = getParam("id");
  const { data: shop } = useGetShopDetailsQuery(id, { enabled: !!id });

  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <MasterLayout>
        {shop?.storeType === StoreType.Service ? (
          <ServiceDetailsView id={id} />
        ) : (
          <ShopDetailsView id={id} />
        )}
        <Container>
          <Collaboration />
        </Container>
      </MasterLayout>
    </>
  );
};

export default ServiceDetailPage;
