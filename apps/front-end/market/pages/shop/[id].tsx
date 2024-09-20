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
import nookies from "nookies";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extract the ID from the URL params
  const id = context?.params?.["id"] as string | undefined;

  // Extract cookies using nookies
  const cookies = nookies.get(context);
  const token = cookies.auth_token || null; // Assuming 'auth_token' is your cookie name

  // If the ID exists, fetch the shop details
  if (id) {
    const client = new QueryClient();

    // Fetch the shop details data and prefetch it into react-query cache
    await client.prefetchQuery(getShopDetailsQueryKey(id), () =>
      getShopDetailsQueryFetcher(id)
    );

    return {
      props: {
        token,
        // Use the dehydrated state to pass pre-fetched data
        ...setQueryClientServerSideProps(dehydrate(client)),
      },
    };
  }

  // Handle the case where ID is missing or invalid
  return {
    props: {
      token,
    },
    notFound: true, // Optional: Show a 404 page if the ID is missing
    redirect: id ? undefined : "/", // Optional: Redirect to homepage if no ID
  };
};

interface ServiceDetailedPageProps {
  token: string | null;
}

const ServiceDetailPage: NextPage<ServiceDetailedPageProps> = ({ token }) => {
  const { getParam } = useRouting();

  const id = getParam("id");
  const { data: shop } = useGetShopDetailsQuery(id, { enabled: !!id });

  // get product details from api
  return (
    <>
      <Head>
        <title>Wiaah | Shop</title>
      </Head>
      <MasterLayout token={token}>
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
